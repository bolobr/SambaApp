/**
 * Video_operationController
 *
 * @description :: Server-side logic for managing video_operations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
//Only for testing with mocha and grunt
//var wolfpack = require('wolfpack');
//var Video = wolfpack('/api/models/Video');
var s3 = require('s3');
var encoded_path = "s3.amazonaws.com/bolobuckettest/video/encoded/"
var original_path = "s3.amazonaws.com/bolobuckettest/video/original/"

var client = s3.createClient({
  maxAsyncS3: 20,     // this is the default
  s3RetryCount: 3,    // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 209715200, // (~200 MB)
  multipartUploadSize: 157286400, // (~150 MB)
  s3Options: {
    accessKeyId: process.env.AWSKey,
    secretAccessKey: process.env.AWSSecret,
    // any other options are passed to new AWS.S3()
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
  },
});

module.exports = {

	 	index: function (req, res) {
       Video.find({}, function(err, videos){
         if(err) return res.view({error: "Vídeos não encontrados"});
         return res.view({
           videos: videos
         });
       })

    },

		new_video: function(req, res){
			return res.view();
		},
		create: function(req, res){
      res.setTimeout(0);
      file = req.file('file');
      file.upload({
        maxBytes: 2000000000,
        onProgress: function(teste, log){
            //console.log(teste.percent);
        },
        }, function(err, files){
          if(err){
            return res.redirect('/new_video')
          }
          name = req.param('name')
          new_file_name = files[0]['filename'].split('.')[0] + '.mp4'
          Video.create({
            name: name,
            original_video_path: original_path + name + '/' + files[0]['filename'],
            encoded_video_path: encoded_path + name + '/' + new_file_name,
            file_name: files[0]['filename'],
          }, function(err, video){
            if(err){
              return res.redirect('/new_video')
            }
            Video.upload_s3(files, video.name);
            res.redirect('/video/' + video.id)
          });

      });
    },
		show: function(req, res){
			parameter = req.param('id') || req.params
			Video.findOne(parameter, function(err, vid){
				if(err){
					console.log(err);
					return res.notFound();
				}
				res.view({
					video: vid
				})
			});
		},

    _config: {}

};

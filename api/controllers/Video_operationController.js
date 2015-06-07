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
var fs = require('fs');
var request = require('request'); // include request module

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
    //List every video coded up to now
	 	index: function (req, res) {
       Video.find({}, function(err, videos){
         if(err || videos.length == 0) return res.view({
           videos: false,
           error: "Vídeos não encontrados",
           });
         return res.view({
           videos: videos,
           error: false,
         });
       })

    },

    //New Video View
		new_video: function(req, res){
			return res.view();
		},

    //Create Video Action
		create: function(req, res){
      res.setTimeout(0);
      file = req.file('file');
      file.upload({
        maxBytes: 2000000000, //MaxBytes for big files
        onProgress: function(teste, log){
            // console.log(teste);
        },
        }, function(err, files){
          if(err){
            return res.redirect('/new_video');
          }
          //File config to store in the database
          name = files[0]['filename'].split('.')[0]
          console.log(name);
          new_file_name = files[0]['filename'].split('.')[0] + '.mp4'
          Video.create({
            name: name,
            original_video_path: original_path + name + '/' + files[0]['filename'],
            encoded_video_path: encoded_path + name + '/' + new_file_name,
            file_name: files[0]['filename'],
            pending_encoded: 'true',
            pending_original: 'true',
          }, function(err, video){
            if(err){
              return res.redirect('/new_video');
              fs.unlink(files[0]['fd']);
            }
            Video.upload_s3(files, video.name);
            res.redirect('/video/' + video.id)
          });

      });
    },

    //Show function
    show: function(req, res){
			parameter = req.param('id') || req.params
			Video.findOne(parameter, function(err, vid){
				if(err){
					return res.notFound();
				}
        return res.view({
          video: vid
        })

			});
		},

    _config: {}

};

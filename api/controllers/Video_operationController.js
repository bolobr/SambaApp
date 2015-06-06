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

var client = s3.createClient({
  maxAsyncS3: 20,     // this is the default
  s3RetryCount: 3,    // this is the default
  s3RetryDelay: 1000, // this is the default
  multipartUploadThreshold: 209715200, // (~200 MB)
  multipartUploadSize: 157286400, // (~150 MB)
  s3Options: {
    accessKeyId: "AKIAIHBRBJ5T7ZK6Q5ZA",
    secretAccessKey: "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",
    // any other options are passed to new AWS.S3()
    // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
  },
});

module.exports = {

	 	index: function (req, res) {
        return res.view();
    },

		new_video: function(req, res){
			return res.view();
		},
		create: function(req, res){
			name = req.param('name');
			var file_name, original_video_path, encoded_video_path;
			file = req.file('file');
			console.log("Requesting file");
			file.upload({
			   maxBytes: 2000000000,
				}, function(err, files){
					if(err){
						res.view('/new_video')
					}
          var params = {
            localFile: files[0]['fd'],
            s3Params: {
              Bucket: "bolobuckettest",
              Key: "s3.amazonaws.com/bolobuckettest/video/originals/" + files[0]['filename'],
              // other options supported by putObject, except Body and ContentLength.
              // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
            },
          };
          var uploader = client.uploadFile(params);
          uploader.on('error', function(err) {
            console.error("unable to upload:", err.stack);
          });
          uploader.on('progress', function() {
              console.log("progress", uploader.progressMd5Amount,
              uploader.progressAmount, uploader.progressTotal);
          });
          uploader.on('end', function() {
            console.log("done uploading");
            res.view('homepage');
          });
					console.log(files);

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

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

var client = s3.createClient(options)

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
			try{
				file.upload({
						maxBytes: 2000000000,
						// adapter: require('skipper-s3'),
  					// key: 'AKIAIHBRBJ5T7ZK6Q5ZA',
  					// secret: '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',
  					// bucket: 'bolobuckettest',
						// onProgress: function(err, log){
						// 	console.log(err);
						// 	console.log(log);
						// }
					}, function(err, files){
						console.log(err);
						if(err){
							res.view('/new_video')
						}
						console.log(files);
						res.view('homepage');
					});
				} catch(err){
					console.log(err);
				}
			// name = req.param('name');
			// var vidObj = {
			// 	name: name,
			// 	original_video_path: "teste",
			// }
			// Video.create(vidObj, function(err, vid){
			// 	if(err){
			// 		return res.redirect('/new_video');
			// 	}
			// 	//console.log(req);
			// 	file = req.file('file');
			// 	file.upload({
			// 		maxBytes: 2000000000
			// 	},function(err, files){
			//
			// 		if (err) return res.serverError(err);
			// 		console.log(files);
			// 	});
			// 	str = vid.id || vid.name
			// 	res.redirect('/video/' + str);
			// });
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

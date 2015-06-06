/**
 * Video_operationController
 *
 * @description :: Server-side logic for managing video_operations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
//Only for testing purposes
var wolfpack = require('wolfpack');
var Video = wolfpack('/api/models/Video');

module.exports = {

	 	index: function (req, res) {
        return res.view();
    },

		new_video: function(req, res){
			return res.view();
		},
		create: function(req, res){

			name = req.param('name');
			console.log(name);
			var vidObj = {
				name: name,
				original_video_path: "teste",
			}
			Video.create(vidObj, function(err, vid){
				if(err){
					console.log(err)
					return res.redirect('/new_video');
				}
				file = req.file('file');
				file.upload(function(err, files){
					if (err) return res.serverError(err);
					console.log(files);
				});
				res.redirect('/video/' + vid.id);
			});

			;
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

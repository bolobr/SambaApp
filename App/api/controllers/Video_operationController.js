/**
 * Video_operationController
 *
 * @description :: Server-side logic for managing video_operations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	 	index: function (req, res) {
        return res.view();
    },

		new_video: function(req, res){
			return res.view();
		},
		create: function(req, res){
			name = req.param('name');
			var vidObj = {
				name: name,
				original_video_path: "teste",
			}
			console.log(vidObj);
			Video.create(vidObj, function(err, vid){
				if(err){
					return res.redirect('/new_video');
				}
				res.redirect('/video/' + vid.id);
			});

			;
		},
		show: function(req, res){
			Video.findOne(req.param('id'), function(err, vid){
				if(err) return res.notFound();
				res.view({
					video: vid
				})
			});
		},

    _config: {}

};

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
			var vidObj = {
				req.param('name');
			}

			Video.create(vidObj, function vidCreated(err, vid){
				if(err){
					console.log("Erro na criação");
					return res.redirect('/new_video');
				}
			});

			res.redirect('/video/' + vid.id);
		},
		
		show: function(req, res){
			Video.findOne(req.param('id'), function foundVideo(err, vid){
				if(err) return res.notFound();
				res.view({
					video: video
				})
			});
		}

    _config: {}

};

/** 
  * Gladys Project
  * http://gladysproject.com
  * Software under licence Creative Commons 3.0 France 
  * http://creativecommons.org/licenses/by-nc-sa/3.0/fr/
  * You may not use this software for commercial purposes.
  * @author :: Pierre-Gilles Leymarie
  */
  
/**
 * MotionController
 *
 * @description :: Server-side logic for managing Motions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	create : function(req, res,next){
		var motionObj = {
			datetime: req.param('datetime'),
			motionsensor: req.param('motionsensor')
		};
		Motion.create(motionObj, function(err, motion){
			if(err) return res.json(err);

			res.json(motion);
		});
	},

	
};


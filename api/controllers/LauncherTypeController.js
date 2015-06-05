/** 
  * Gladys Project
  * http://gladysproject.com
  * Software under licence Creative Commons 3.0 France 
  * http://creativecommons.org/licenses/by-nc-sa/3.0/fr/
  * You may not use this software for commercial purposes.
  * @author :: Pierre-Gilles Leymarie
  */
  
 /**
 * LauncherTypeController
 *
 * @description :: Server-side logic for managing launchertypes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	/**
	 * Get all the existing launcher type
	 * @method index
	 * @param {} req
	 * @param {} res
	 * @param {} next
	 * @return 
	 */
	index:function(req,res,next){
		LauncherType.find()
				  .exec(function(err, launcherType){
				  		if(err) return res.json(err);

				  		res.json(launcherType);
				  });
	}
};


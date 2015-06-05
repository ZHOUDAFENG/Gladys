/** 
  * Gladys Project
  * http://gladysproject.com
  * Software under licence Creative Commons 3.0 France 
  * http://creativecommons.org/licenses/by-nc-sa/3.0/fr/
  * You may not use this software for commercial purposes.
  * @author :: Pierre-Gilles Leymarie
  */
  
/**
* MotionSensor.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	
  	name:{
  		type:'string'
  	},

  	code:{
  		type:'string',
  		required:true,
      unique:true
  	},

  	room:{
        model:'Room',
        required:true
    },

    motions:{
        collection: 'Motion',
        via: 'motionsensor'
    }

  }
};


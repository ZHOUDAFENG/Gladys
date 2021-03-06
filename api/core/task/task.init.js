const schedule = require('node-schedule');

module.exports = function(cb){
  
  // tasks started in dev and prod
  gladys.script.init();

  // start sunrise & sunset schedule
  gladys.sun.init().catch(sails.log.warn);
  
  gladys.brain.load()
    .then(() => {
      sails.log.info('Gladys brain loaded with success !');
    })
    .catch((err) => {
      sails.log.error(`Error while loading brain ` + err);
    });


  gladys.alarm.checkAllAutoWakeUp();

  gladys.gateway.init();
  
  if(sails.config.environment !== 'production') {
    return cb();   
  }

  // check if db migration is needed
  gladys.task.checkDbVersion()
    .then(() => {
      sails.log.info('Successfully checked DB version.');
      cb();
    })
    .catch((err) => {
      sails.log.error(`Error while performing DB migration.`);
      sails.log.error(err);
      cb();
    });
  
  
  // tasks started only in prod


  // start sunrise & sunset schedule each day at 00.01 
  // start auto wake up feature each day at 00.01 
  var rule = new schedule.RecurrenceRule();
  rule.hour = 0;
  rule.minute = 1;

  schedule.scheduleJob(rule, function(){
    gladys.sun.init().catch(sails.log.warn);
    gladys.alarm.checkAllAutoWakeUp().catch(sails.log.warn);
  });

  // schedule alarm
  gladys.alarm.init().catch(sails.log.error);
  
  // checking for update now      
  gladys.update.checkUpdate();

  // be sure that Gladys has socket notification type
  gladys.socket.createNotificationType();
  
  // install all modules not 
  // fully installed
  gladys.module.init();

  // checking for update on module now
  gladys.module.checkUpdate();

  // CheckUserPresence every XX minutes, default is 5 minutes
  const DEFAULT_CHECK_USER_PRESENCE_FREQUENCY = 5;

  gladys.param.getValue('USER_CHECK_PRESENCE_FREQUENCY')
    .catch(() => DEFAULT_CHECK_USER_PRESENCE_FREQUENCY)
    .then((checkFrequency) => {
      setInterval(function() {
        gladys.house.checkUsersPresence();
      }, checkFrequency * 60 * 1000);
    });

  // Check for update interval
  setInterval(function(){
    gladys.update.checkUpdate();
    gladys.module.checkUpdate();
  }, sails.config.update.checkUpdateInterval);  
 
};
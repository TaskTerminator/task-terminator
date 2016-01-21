var CronJob = require('cron').CronJob;
var Project = require('../models/Project');
var helpers = require('../controllers/projectHelpers');
var moment = require('moment');

var job = new CronJob({
  cronTime: '01 * * * * *',
  onTick: function() {
      var today = moment().utc().hours(23).minute(0).second(0).millisecond(0).toJSON();
      console.log("TODAY", today);
    Project.find({"setup.dueDate.actual": today, status: "Incomplete"})
    .exec()
    .then((project) => {
        console.log("PROJECT", project)
    })
  },
  start: false,
  timeZone: 'America/Chicago'
});

module.exports = job;
var CronJob = require('cron').CronJob;
var Project = require('../models/Project');
var projectCtrl = require('../controllers/projectCtrl');
var moment = require('moment');

var job = new CronJob({
  cronTime: '00 00 17 * *',
  onTick: function() {
      var today = moment().utc().hours(23).minute(0).second(0).millisecond(0).toJSON();
      console.log("TODAY", today);
    Project.find({$and:[{"setup.dueDate.actual": today}, {status: "Incomplete"}, {overdue: false}]})
    .exec()
    .then((projects) => {
        console.log("PROJECTS", projects);
        for (var i = 0; i < projects.length; i++) {
            console.log('CURRENT PROJECT', projects[i]);
            projects[i].overdue = true;
            projects[i].save()
            .then((project) => {
                projectCtrl.newProject(project.setup.associatedTemplate)
                .then((project) => {
                    console.log("NEW PROJECT INSTANCE CREATED", project);
                })
            })
        }
    })
    .catch((err) => {
           console.log("ERROR", err);
    });
  },
  start: false,
  timeZone: 'America/Chicago'
});

module.exports = job;
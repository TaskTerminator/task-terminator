var CronJob = require('cron').CronJob;
var Project = require('../models/Project');
var projectCtrl = require('../controllers/projectCtrl');
var moment = require('moment');

var job = new CronJob({
  cronTime: '05 * * * * *',
  onTick: function() {
      var today = moment().utc().hours(23).minute(0).second(0).millisecond(0).toJSON();
      console.log("TODAY", today);
    Project.find({$and:[{"setup.dueDate.actual": today}, {status: "Incomplete"}, {overdue: false}]})
    .exec()
    .then((projects) => {
        console.log("PROJECTS", projects);
        for (var i = 0; i < projects.length; i++) {
            projects[i].overdue = true;
            projects[i].save()
            .then((project) => {
                var newProject = projectCtrl.newProject(project.setup.associatedTemplate);
                console.log("NEW PROJECT", newProject);
            })
        }
    })
  },
  start: false,
  timeZone: 'America/Chicago'
});

module.exports = job;
'use strict';

var CronJob = require('cron').CronJob;
var Project = require('../models/Project');
var projectCtrl = require('../controllers/projectCtrl');
var moment = require('moment');

var job = new CronJob({
    cronTime: '00 00 17 * *',
    onTick: function onTick() {
        var today = moment().utc().hours(23).minute(0).second(0).millisecond(0).toJSON();
        console.log("TODAY", today);
        Project.find({ $and: [{ "setup.dueDate.actual": today }, { status: "Incomplete" }, { overdue: false }] }).exec().then(function (projects) {
            console.log("PROJECTS", projects);
            for (var i = 0; i < projects.length; i++) {
                console.log('CURRENT PROJECT', projects[i]);
                projects[i].overdue = true;
                projects[i].save().then(function (project) {
                    projectCtrl.newProject(project.setup.associatedTemplate).then(function (project) {
                        console.log("NEW PROJECT INSTANCE CREATED", project);
                    });
                });
            }
        }).catch(function (err) {
            console.log("ERROR", err);
        });
    },
    start: false,
    timeZone: 'America/Chicago'
});

module.exports = job;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlcl9hc3NldHMvY3Jvbi90ZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUN0QyxJQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUMzQyxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQztBQUN4RCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRS9CLElBQUksR0FBRyxHQUFHLElBQUksT0FBTyxDQUFDO0FBQ3BCLFlBQVEsRUFBRSxjQUFjO0FBQ3hCLFVBQU0sRUFBRSxrQkFBVztBQUNmLFlBQUksS0FBSyxHQUFHLE1BQU0sRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNqRixlQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM5QixlQUFPLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxzQkFBc0IsRUFBRSxLQUFLLEVBQUMsRUFBRSxFQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FDL0YsSUFBSSxFQUFFLENBQ04sSUFBSSxDQUFDLFVBQUMsUUFBUSxFQUFLO0FBQ2hCLG1CQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNsQyxpQkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDdEMsdUJBQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUMsd0JBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQzNCLHdCQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQ2pCLElBQUksQ0FBQyxVQUFDLE9BQU8sRUFBSztBQUNmLCtCQUFXLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FDdkQsSUFBSSxDQUFDLFVBQUMsT0FBTyxFQUFLO0FBQ2YsK0JBQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEVBQUUsT0FBTyxDQUFDLENBQUM7cUJBQ3hELENBQUMsQ0FBQTtpQkFDTCxDQUFDLENBQUE7YUFDTDtTQUNKLENBQUMsQ0FDRCxLQUFLLENBQUMsVUFBQyxHQUFHLEVBQUs7QUFDVCxtQkFBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDaEMsQ0FBQyxDQUFDO0tBQ0o7QUFDRCxTQUFLLEVBQUUsS0FBSztBQUNaLFlBQVEsRUFBRSxpQkFBaUI7Q0FDNUIsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDIiwiZmlsZSI6InNlcnZlcl9hc3NldHMvY3Jvbi90ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIENyb25Kb2IgPSByZXF1aXJlKCdjcm9uJykuQ3JvbkpvYjtcbnZhciBQcm9qZWN0ID0gcmVxdWlyZSgnLi4vbW9kZWxzL1Byb2plY3QnKTtcbnZhciBwcm9qZWN0Q3RybCA9IHJlcXVpcmUoJy4uL2NvbnRyb2xsZXJzL3Byb2plY3RDdHJsJyk7XG52YXIgbW9tZW50ID0gcmVxdWlyZSgnbW9tZW50Jyk7XG5cbnZhciBqb2IgPSBuZXcgQ3JvbkpvYih7XG4gIGNyb25UaW1lOiAnMDAgMDAgMTcgKiAqJyxcbiAgb25UaWNrOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0b2RheSA9IG1vbWVudCgpLnV0YygpLmhvdXJzKDIzKS5taW51dGUoMCkuc2Vjb25kKDApLm1pbGxpc2Vjb25kKDApLnRvSlNPTigpO1xuICAgICAgY29uc29sZS5sb2coXCJUT0RBWVwiLCB0b2RheSk7XG4gICAgUHJvamVjdC5maW5kKHskYW5kOlt7XCJzZXR1cC5kdWVEYXRlLmFjdHVhbFwiOiB0b2RheX0sIHtzdGF0dXM6IFwiSW5jb21wbGV0ZVwifSwge292ZXJkdWU6IGZhbHNlfV19KVxuICAgIC5leGVjKClcbiAgICAudGhlbigocHJvamVjdHMpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJQUk9KRUNUU1wiLCBwcm9qZWN0cyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDVVJSRU5UIFBST0pFQ1QnLCBwcm9qZWN0c1tpXSk7XG4gICAgICAgICAgICBwcm9qZWN0c1tpXS5vdmVyZHVlID0gdHJ1ZTtcbiAgICAgICAgICAgIHByb2plY3RzW2ldLnNhdmUoKVxuICAgICAgICAgICAgLnRoZW4oKHByb2plY3QpID0+IHtcbiAgICAgICAgICAgICAgICBwcm9qZWN0Q3RybC5uZXdQcm9qZWN0KHByb2plY3Quc2V0dXAuYXNzb2NpYXRlZFRlbXBsYXRlKVxuICAgICAgICAgICAgICAgIC50aGVuKChwcm9qZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTkVXIFBST0pFQ1QgSU5TVEFOQ0UgQ1JFQVRFRFwiLCBwcm9qZWN0KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUlwiLCBlcnIpO1xuICAgIH0pO1xuICB9LFxuICBzdGFydDogZmFsc2UsXG4gIHRpbWVab25lOiAnQW1lcmljYS9DaGljYWdvJ1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gam9iOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

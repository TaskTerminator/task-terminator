'use strict';

var mongoose = require('mongoose');
var Botkit = require('botkit');
var Q = require('q');
var positions = require('./positionCtrl.js');
var botHelper = require('./slackBotHelpers.js');
var Witbot = require('witbot');
var Secret = require('../secret.js');

var controller = Botkit.slackbot({
	debug: false
});
//
//	// connect the bot to a stream of messages
//	 controller.spawn({
////	 	//DevMtn Token
////	   // token: 'xoxb-18104911812-lrix7VmoDeWSS4PTA8SxNFnN',
////	 	//Our Slack Token
//	 	token: Secret.token
//	 }).startRTM((err) => {
//    if (err) {
//      throw new Error(err);
//    }
//  });

//LINK THE BOT TO WIT.AI
var witbot = Witbot("CZPINC6EVOQ7DCPZSUUBQ3B5GWQVOQ66");

/****************** BOT SPECIFIC COMMANDS ******************/
//wire up DM's and direct mentions to wit.ai
controller.hears('.*', 'direct_message,direct_mention', function (bot, message) {
	witbot.process(message.text, bot, message);
});

witbot.hears('help', 0.5, function (bot, message, outcome) {
	var title = " ";
	var botSkillz = ["show roles", "Forgot a job title? Here's all of em for your company!", 'show departments', "All the departments. All of em. ", 'show employees', "Don't forget that guy in accounting's name. Find him here!", 'show projects', "Just a list of every open project in your company. Now get working. ", "help", "Tells you all about my magic powers."];
	botHelper.helpAttachment(botSkillz, title).then(function (attachment) {
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});
});

witbot.otherwise(function (bot, message) {
	var title = " ";
	var botSkillz = ["show roles", "Forgot a job title? Here's all of em for your company!", 'show departments', "All the departments. All of em. ", 'show employees', "Don't forget that guy in accounting's name. Find him here!", 'show projects', "Just a list of every open project in your company. Now get working. ", "help", "Tells you all about my magic powers."];
	botHelper.helpAttachment(botSkillz, title).then(function (attachment) {
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});
});

controller.hears(['dm me'], ['direct_message', 'direct_mention'], function (bot, message) {
	bot.startConversation(message, function (err, convo) {
		convo.say('Heard ya');
	});

	bot.startPrivateConversation(message, function (err, dm) {
		dm.say('Private reply!');
	});
});

/****************** GREETINGS ******************/
witbot.hears('greeting', 0.5, function (bot, message, outcome) {
	console.log("WIT.AI Outcome", outcome);
	console.log("WIT.AI Outcome", outcome.entities.greeting);
	bot.reply(message, 'Greetings earthling.');
});

/****************** DEPARTMENTS ******************/
witbot.hears('all_departments', 0.8, function (bot, message, outcome) {
	console.log("WIT.AI Outcome", outcome);
	botHelper.allDepartments().then(function (departments) {
		return botHelper.arrayMaker(departments);
	}).then(function (departmentNames) {
		var title = "Here's all the departments I could find...";
		return botHelper.attachmentMaker(departmentNames, title);
	}).then(function (attachment) {
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});
});

/****************** EMPLOYEES ******************/
witbot.hears('all_employees', 0.8, function (bot, message, outcome) {
	console.log(outcome);
	botHelper.allEmployees().then(function (employees) {
		return botHelper.arrayMakerEmployeeName(employees);
	}).then(function (employeeNames) {
		console.log("Here's the returned promise...", employeeNames);
		var title = "Here's all the employees I could find...";
		return botHelper.attachmentMaker(employeeNames, title);
	}).then(function (attachment) {
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});
});

/****************** POSITIONS ******************/
witbot.hears('all_positions', 0.8, function (bot, message, outcome) {
	botHelper.allPositions().then(function (positions) {
		return botHelper.arrayMaker(positions);
	}).then(function (positionNames) {
		var title = "Here's all the positions I could find...";
		return botHelper.attachmentMaker(positionNames, title);
	}).then(function (attachment) {
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});
});

/****************** PROJECTS ******************/
witbot.hears('all_projects', 0.8, function (bot, message, outcome) {
	console.log("I'm trying to get projects!");
	botHelper.allProjects().then(function (projectDetails) {
		var title = "Here's all the projects I could find...";
		console.log("Here's all the projects I returned....", projectDetails);
		return botHelper.projectsAttachment(projectDetails, title);
	}).then(function (attachment) {
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});
});

witbot.hears('tasks_in_project', 0.3, function (bot, message, outcome) {
	console.log("this is what WIT.AI returned", outcome.entities.project_id);
	console.log("this is what WIT.AI returned", outcome.entities.project_id[0].value);
	var title = "Here are the tasks for project - " + outcome.entities.project_id[0].value;
	var projectId = outcome.entities.project_id[0].value;
	return botHelper.hashStripper(projectId).then(function (cleanId) {
		console.log("Here's the clean ID I made", cleanId);
		return botHelper.tasksInProject(cleanId);
	}).then(function (project) {
		console.log("WHat we gotz back", project[0].tasks);
		var array = project[0].tasks;
		console.log("Here's the tasks associated with that project", array);
		return botHelper.taskAttachment(array, title);
	}).then(function (attachment) {
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});

	// bot.reply(message, "Let me get those tasks for you!");
});

witbot.hears('overdue_projects', 0.8, function (bot, message, outcome) {
	console.log("I'm trying to get all overdue projects!");
	botHelper.overdueProjects().then(function (projectDetails) {
		var title = "Here's all the overdue projects I could find...";
		console.log("Here's all the overdue projects I returned....", projectDetails);
		return botHelper.projectsAttachment(projectDetails, title);
	}).then(function (attachment) {
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});
});

witbot.hears('insult', 0.7, function (bot, message, outcome) {
	console.log("YOU INSULTED ME!");
	bot.reply(message, "https://www.youtube.com/watch?v=KWza5PQA5Zc");
});

witbot.hears('joke', 0.5, function (bot, message, outcome) {
	console.log("Here's your joke");
	bot.reply(message, "https://www.youtube.com/watch?v=It3DU2HMbaY");
});

witbot.hears('canada', 0.5, function (bot, message, outcome) {
	bot.reply(message, "https://www.youtube.com/watch?v=pFCd4ZOTVg4");
});

witbot.hears('jimmy', 0.3, function (bot, message, outcome) {
	bot.reply(message, "https://www.youtube.com/watch?v=cTl762MuXyc");
});

witbot.hears('brownbag', 0.4, function (bot, message, outcome) {
	bot.reply(message, "https://www.youtube.com/watch?v=ePkPYA4AQ3o");
});

witbot.hears('cahlan', 0.3, function (bot, message, outcome) {
	bot.reply(message, "https://www.youtube.com/watch?v=HmqCDgr3yQg");
});

witbot.hears('wilson', 0.3, function (bot, message, outcome) {
	bot.reply(message, "https://www.youtube.com/watch?v=3gNrkgwS6aM");
});

witbot.hears('projects_due_this_month', 0.8, function (bot, message, outcome) {
	console.log("I'm trying to get all projects due this month!");
	botHelper.projectsDueThisMonth().then(function (projectDetails) {
		var title = "Here's all the projects due this month...";
		console.log("Here's all the projects due this month....", projectDetails);
		return botHelper.projectsAttachment(projectDetails, title);
	}).then(function (attachment) {
		console.log('HELLO', attachment);
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});
});

witbot.hears('projects_due_this_week', 0.8, function (bot, message, outcome) {
	console.log("I'm trying to get all projects due this week!");
	botHelper.projectsDueThisWeek().then(function (projectDetails) {
		var title = "Here's all the projects due this week...";
		console.log("Here's all the projects due this week....", projectDetails);
		return botHelper.projectsAttachment(projectDetails, title);
	}).then(function (attachment) {
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});
});

witbot.hears('projects_due_today', 0.8, function (bot, message, outcome) {
	console.log("I'm trying to get all projects due today!");
	botHelper.projectsDueToday().then(function (projectDetails) {
		var title = "Here's all the projects due today...";
		console.log("Here's all the projects due today....", projectDetails);
		return botHelper.projectsAttachment(projectDetails, title);
	}).then(function (attachment) {
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});
});

/****************** PROJECT TASKS ******************/
witbot.hears('all_tasks', 0.8, function (bot, message, coutcome) {
	botHelper.allProjectTasks().then(function (tasks) {
		// console.log("Here are the tasks I got back!",tasks);
		var title = "Here's all the tasks I could find...";
		return botHelper.taskAttachment(tasks, title);
	}).then(function (attachment) {
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});
});

witbot.hears('all_incomplete_tasks', 0.2, function (bot, message, outcome) {
	console.log("I'm trying to get all incomplete tasks!");
	botHelper.allIncompleteTasks().then(function (incompleteTasks) {
		var title = "Here's all the incomplete tasks I could find...";
		console.log("Here's all the incomplete tasks I returned....", incompleteTasks);
		return botHelper.taskAttachment(incompleteTasks, title);
	}).then(function (attachment) {
		console.log('ATTACHMENT', attachment);
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});
});

witbot.hears('overdue_tasks', 0.8, function (bot, message, outcome) {
	console.log("I'm trying to get all overdue tasks!");
	botHelper.overdueTasks().then(function (projectDetails) {
		var title = "Here's all the overdue tasks I could find...";
		console.log("Here's all the overdue tasks I returned....", projectDetails);
		return botHelper.projectsAttachment(projectDetails, title);
	}).then(function (taskNames) {
		// console.log("Here's the returned promise...", taskNames);
		var title = "Here's all the overdue tasks I could find...";
		return botHelper.attachmentMaker(taskNames, title);
	}).then(function (attachment) {
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});
});

witbot.hears('task_complete', 0.8, function (bot, message, outcome) {
	console.log("I'm trying to change the task status to complete...");
	var taskid = outcome.entities.task_id[0].value;
	var newCleanId;
	var projectIdRef;
	console.log("TASK ID", taskid);
	return botHelper.hashStripper(taskid).then(function (cleanId) {
		console.log("Here's the clean ID I made", cleanId);
		newCleanId = cleanId;
		return botHelper.statusCheck(cleanId);
	}).then(function (task) {
		if (!task) {
			bot.reply(message, "Task has already been completed.");
		} else {
			projectIdRef = task[0].associatedProject;
			return botHelper.taskComplete(newCleanId);
		}
	}).then(function (task) {
		console.log("Here's the returned promise...", task);
		var title = "Here's the task...";
		return botHelper.taskAttachment([task], title);
	}).then(function (attachment) {
		var deferred = Q.defer();
		var attachments = [];
		attachments.push(attachment);
		deferred.resolve(bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		}));
		return deferred.promise;
	}).then(function () {
		return botHelper.taskCompleteCount(projectIdRef);
	});
});

/****************** INCOMPLETE PROJECTS ******************/

witbot.hears('incomplete_projects', 0.8, function (bot, message, outcome) {
	console.log("I'm trying to get incomplete projects!");
	botHelper.allIncompleteProjects().then(function (projectDetails) {
		var title = "Here's all the incomplete projects I could find...";
		console.log("Here's all the incomplete projects I returned....", projectDetails);
		return botHelper.projectsAttachment(projectDetails, title);
	}).then(function (attachment) {
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});
});

/****************** COMPLETE PROJECTS ******************/

witbot.hears('complete_projects', 0.8, function (bot, message, outcome) {
	console.log("I'm trying to get complete projects!");
	botHelper.allCompleteProjects().then(function (projectDetails) {
		var title = "Here's all the complete projects I could find...";
		console.log("Here's all the complete projects I returned....", projectDetails);
		return botHelper.projectsAttachment(projectDetails, title);
	}).then(function (attachment) {
		var attachments = [];
		attachments.push(attachment);
		bot.reply(message, {
			// text: ' ',
			attachments: attachments
		}, function (err, resp) {
			console.log(err, resp);
		});
	});
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlcl9hc3NldHMvY29udHJvbGxlcnMvc2xhY2tDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3JDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqQyxJQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdkIsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDL0MsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFDbEQsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQzs7QUFFdkMsSUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztBQUNoQyxNQUFLLEVBQUUsS0FBSztDQUNiLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQUFDLEFBZUgsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLGtDQUFrQyxDQUFDOzs7O0FBQUMsQUFLdkQsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsK0JBQStCLEVBQUUsVUFBVSxHQUFHLEVBQUUsT0FBTyxFQUFFO0FBQ2xGLE9BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7Q0FDM0MsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxVQUFVLEdBQUcsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFO0FBQzFELEtBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQztBQUNoQixLQUFJLFNBQVMsR0FBRyxDQUNmLFlBQVksRUFDWix3REFBd0QsRUFDeEQsa0JBQWtCLEVBQ2xCLGtDQUFrQyxF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O0VBQzNELENBQUMsQ0FDRCxJQUFJLENBQUMsVUFBQyxVQUFVLEVBQUs7QUFDckIsTUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLGFBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDN0IsS0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUM7O0FBRWpCLGNBQVcsRUFBRSxXQUFXO0dBQ3hCLEVBQUMsVUFBUyxHQUFHLEVBQUMsSUFBSSxFQUFFO0FBQ3BCLFVBQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDLElBQUksQ0FBQyxDQUFDO0dBQ3RCLENBQUMsQ0FBQztFQUNILENBQUMsQ0FBQztDQUNILENBQUMsQ0FBQyIsImZpbGUiOiJzZXJ2ZXJfYXNzZXRzL2NvbnRyb2xsZXJzL3NsYWNrQ3RybC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IG1vbmdvb3NlID0gcmVxdWlyZSgnbW9uZ29vc2UnKTtcbmNvbnN0IEJvdGtpdCA9IHJlcXVpcmUoJ2JvdGtpdCcpO1xuY29uc3QgUSA9IHJlcXVpcmUoJ3EnKTtcbmNvbnN0IHBvc2l0aW9ucyA9IHJlcXVpcmUoJy4vcG9zaXRpb25DdHJsLmpzJyk7XG5jb25zdCBib3RIZWxwZXIgPSByZXF1aXJlKCcuL3NsYWNrQm90SGVscGVycy5qcycpO1xuY29uc3QgV2l0Ym90ID0gcmVxdWlyZSgnd2l0Ym90Jyk7XG5jb25zdCBTZWNyZXQgPSByZXF1aXJlKCcuLi9zZWNyZXQuanMnKTtcblxuY29uc3QgY29udHJvbGxlciA9IEJvdGtpdC5zbGFja2JvdCh7XG5cdCAgZGVidWc6IGZhbHNlXG5cdH0pO1xuLy9cbi8vXHQvLyBjb25uZWN0IHRoZSBib3QgdG8gYSBzdHJlYW0gb2YgbWVzc2FnZXNcbi8vXHQgY29udHJvbGxlci5zcGF3bih7XG4vLy8vXHQgXHQvL0Rldk10biBUb2tlblxuLy8vL1x0ICAgLy8gdG9rZW46ICd4b3hiLTE4MTA0OTExODEyLWxyaXg3Vm1vRGVXU1M0UFRBOFN4TkZuTicsXG4vLy8vXHQgXHQvL091ciBTbGFjayBUb2tlblxuLy9cdCBcdHRva2VuOiBTZWNyZXQudG9rZW5cbi8vXHQgfSkuc3RhcnRSVE0oKGVycikgPT4ge1xuLy8gICAgaWYgKGVycikge1xuLy8gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbi8vICAgIH1cbi8vICB9KTtcblxuXHQvL0xJTksgVEhFIEJPVCBUTyBXSVQuQUlcblx0Y29uc3Qgd2l0Ym90ID0gV2l0Ym90KFwiQ1pQSU5DNkVWT1E3RENQWlNVVUJRM0I1R1dRVk9RNjZcIik7XG5cblxuXHQvKioqKioqKioqKioqKioqKioqIEJPVCBTUEVDSUZJQyBDT01NQU5EUyAqKioqKioqKioqKioqKioqKiovXG5cdC8vd2lyZSB1cCBETSdzIGFuZCBkaXJlY3QgbWVudGlvbnMgdG8gd2l0LmFpXG4gICAgY29udHJvbGxlci5oZWFycygnLionLCAnZGlyZWN0X21lc3NhZ2UsZGlyZWN0X21lbnRpb24nLCBmdW5jdGlvbiAoYm90LCBtZXNzYWdlKSB7XG5cdFx0d2l0Ym90LnByb2Nlc3MobWVzc2FnZS50ZXh0LCBib3QsIG1lc3NhZ2UpO1xuXHR9KTtcblxuXHR3aXRib3QuaGVhcnMoJ2hlbHAnLCAwLjUsIGZ1bmN0aW9uIChib3QsIG1lc3NhZ2UsIG91dGNvbWUpIHtcblx0XHR2YXIgdGl0bGUgPSBcIiBcIjtcblx0XHR2YXIgYm90U2tpbGx6ID0gW1xuXHRcdFx0XCJzaG93IHJvbGVzXCIsXG5cdFx0XHRcIkZvcmdvdCBhIGpvYiB0aXRsZT8gSGVyZSdzIGFsbCBvZiBlbSBmb3IgeW91ciBjb21wYW55IVwiLFxuXHRcdFx0J3Nob3cgZGVwYXJ0bWVudHMnLFxuXHRcdFx0XCJBbGwgdGhlIGRlcGFydG1lbnRzLiBBbGwgb2YgZW0uIFwiLFxuXHRcdFx0J3Nob3cgZW1wbG95ZWVzJyxcblx0XHRcdFwiRG9uJ3QgZm9yZ2V0IHRoYXQgZ3V5IGluIGFjY291bnRpbmcncyBuYW1lLiBGaW5kIGhpbSBoZXJlIVwiLFxuXHRcdFx0J3Nob3cgcHJvamVjdHMnLFxuXHRcdFx0XCJKdXN0IGEgbGlzdCBvZiBldmVyeSBvcGVuIHByb2plY3QgaW4geW91ciBjb21wYW55LiBOb3cgZ2V0IHdvcmtpbmcuIFwiLFxuXHRcdFx0XCJoZWxwXCIsXG5cdFx0XHRcIlRlbGxzIHlvdSBhbGwgYWJvdXQgbXkgbWFnaWMgcG93ZXJzLlwiLFxuXHRcdF07XG5cdFx0Ym90SGVscGVyLmhlbHBBdHRhY2htZW50KGJvdFNraWxseix0aXRsZSlcblx0XHQudGhlbigoYXR0YWNobWVudCkgPT4ge1xuXHRcdFx0dmFyIGF0dGFjaG1lbnRzID0gW107XG5cdFx0XHRhdHRhY2htZW50cy5wdXNoKGF0dGFjaG1lbnQpO1xuXHRcdFx0Ym90LnJlcGx5KG1lc3NhZ2Use1xuXHRcdFx0XHQvLyB0ZXh0OiAnICcsXG5cdFx0XHRcdGF0dGFjaG1lbnRzOiBhdHRhY2htZW50cyxcblx0XHRcdH0sZnVuY3Rpb24oZXJyLHJlc3ApIHtcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyLHJlc3ApO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0pO1xuXG5cdHdpdGJvdC5vdGhlcndpc2UoZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSkge1xuXHRcdHZhciB0aXRsZSA9IFwiIFwiO1xuXHRcdHZhciBib3RTa2lsbHogPSBbXG5cdFx0XHRcInNob3cgcm9sZXNcIixcblx0XHRcdFwiRm9yZ290IGEgam9iIHRpdGxlPyBIZXJlJ3MgYWxsIG9mIGVtIGZvciB5b3VyIGNvbXBhbnkhXCIsXG5cdFx0XHQnc2hvdyBkZXBhcnRtZW50cycsXG5cdFx0XHRcIkFsbCB0aGUgZGVwYXJ0bWVudHMuIEFsbCBvZiBlbS4gXCIsXG5cdFx0XHQnc2hvdyBlbXBsb3llZXMnLFxuXHRcdFx0XCJEb24ndCBmb3JnZXQgdGhhdCBndXkgaW4gYWNjb3VudGluZydzIG5hbWUuIEZpbmQgaGltIGhlcmUhXCIsXG5cdFx0XHQnc2hvdyBwcm9qZWN0cycsXG5cdFx0XHRcIkp1c3QgYSBsaXN0IG9mIGV2ZXJ5IG9wZW4gcHJvamVjdCBpbiB5b3VyIGNvbXBhbnkuIE5vdyBnZXQgd29ya2luZy4gXCIsXG5cdFx0XHRcImhlbHBcIixcblx0XHRcdFwiVGVsbHMgeW91IGFsbCBhYm91dCBteSBtYWdpYyBwb3dlcnMuXCIsXG5cdFx0XTtcblx0XHRib3RIZWxwZXIuaGVscEF0dGFjaG1lbnQoYm90U2tpbGx6LHRpdGxlKVxuXHRcdC50aGVuKChhdHRhY2htZW50KSA9PiB7XG5cdFx0XHR2YXIgYXR0YWNobWVudHMgPSBbXTtcblx0XHRcdGF0dGFjaG1lbnRzLnB1c2goYXR0YWNobWVudCk7XG5cdFx0XHRib3QucmVwbHkobWVzc2FnZSx7XG5cdFx0XHRcdC8vIHRleHQ6ICcgJyxcblx0XHRcdFx0YXR0YWNobWVudHM6IGF0dGFjaG1lbnRzLFxuXHRcdFx0fSxmdW5jdGlvbihlcnIscmVzcCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIscmVzcCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSk7XG5cblx0Y29udHJvbGxlci5oZWFycyhbJ2RtIG1lJ10sWydkaXJlY3RfbWVzc2FnZScsJ2RpcmVjdF9tZW50aW9uJ10sZnVuY3Rpb24oYm90LG1lc3NhZ2UpIHtcblx0XHRib3Quc3RhcnRDb252ZXJzYXRpb24obWVzc2FnZSxmdW5jdGlvbihlcnIsY29udm8pIHtcblx0XHRcdGNvbnZvLnNheSgnSGVhcmQgeWEnKTtcblx0XHR9KTtcblxuXHRcdGJvdC5zdGFydFByaXZhdGVDb252ZXJzYXRpb24obWVzc2FnZSxmdW5jdGlvbihlcnIsZG0pIHtcblx0XHRcdGRtLnNheSgnUHJpdmF0ZSByZXBseSEnKTtcblx0XHR9KTtcblx0fSk7XG5cblx0LyoqKioqKioqKioqKioqKioqKiBHUkVFVElOR1MgKioqKioqKioqKioqKioqKioqL1xuXHR3aXRib3QuaGVhcnMoJ2dyZWV0aW5nJywgMC41LCBmdW5jdGlvbiAoYm90LCBtZXNzYWdlLCBvdXRjb21lKSB7XG5cdFx0Y29uc29sZS5sb2coXCJXSVQuQUkgT3V0Y29tZVwiLCBvdXRjb21lKTtcblx0XHRjb25zb2xlLmxvZyhcIldJVC5BSSBPdXRjb21lXCIsIG91dGNvbWUuZW50aXRpZXMuZ3JlZXRpbmcpO1xuXHRcdGJvdC5yZXBseShtZXNzYWdlLCAnR3JlZXRpbmdzIGVhcnRobGluZy4nKTtcblx0fSk7XG5cblx0LyoqKioqKioqKioqKioqKioqKiBERVBBUlRNRU5UUyAqKioqKioqKioqKioqKioqKiovXG5cdHdpdGJvdC5oZWFycygnYWxsX2RlcGFydG1lbnRzJywgMC44LCBmdW5jdGlvbiAoYm90LCBtZXNzYWdlLCBvdXRjb21lKSB7XG5cdFx0Y29uc29sZS5sb2coXCJXSVQuQUkgT3V0Y29tZVwiLCBvdXRjb21lKTtcblx0XHRib3RIZWxwZXIuYWxsRGVwYXJ0bWVudHMoKVxuXHRcdC50aGVuKChkZXBhcnRtZW50cykgPT57XG5cdFx0XHRyZXR1cm4gYm90SGVscGVyLmFycmF5TWFrZXIoZGVwYXJ0bWVudHMpO1xuXHRcdH0pXG5cdFx0LnRoZW4oKGRlcGFydG1lbnROYW1lcykgPT4ge1xuXHRcdFx0dmFyIHRpdGxlID0gXCJIZXJlJ3MgYWxsIHRoZSBkZXBhcnRtZW50cyBJIGNvdWxkIGZpbmQuLi5cIjtcblx0XHRcdHJldHVybiBib3RIZWxwZXIuYXR0YWNobWVudE1ha2VyKGRlcGFydG1lbnROYW1lcywgdGl0bGUpO1xuXHRcdH0pXG5cdFx0LnRoZW4oKGF0dGFjaG1lbnQpID0+IHtcblx0XHRcdHZhciBhdHRhY2htZW50cyA9IFtdO1xuXHRcdFx0YXR0YWNobWVudHMucHVzaChhdHRhY2htZW50KTtcblx0XHRcdGJvdC5yZXBseShtZXNzYWdlLHtcblx0XHRcdFx0Ly8gdGV4dDogJyAnLFxuXHRcdFx0XHRhdHRhY2htZW50czogYXR0YWNobWVudHMsXG5cdFx0XHR9LGZ1bmN0aW9uKGVycixyZXNwKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycixyZXNwKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9KTtcblxuXHQvKioqKioqKioqKioqKioqKioqIEVNUExPWUVFUyAqKioqKioqKioqKioqKioqKiovXG5cdHdpdGJvdC5oZWFycygnYWxsX2VtcGxveWVlcycsIDAuOCwgZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSwgb3V0Y29tZSkge1xuXHRcdGNvbnNvbGUubG9nKG91dGNvbWUpO1xuXHRcdGJvdEhlbHBlci5hbGxFbXBsb3llZXMoKVxuXHRcdC50aGVuKChlbXBsb3llZXMpID0+e1xuXHRcdFx0cmV0dXJuIGJvdEhlbHBlci5hcnJheU1ha2VyRW1wbG95ZWVOYW1lKGVtcGxveWVlcyk7XG5cdFx0fSlcblx0XHQudGhlbigoZW1wbG95ZWVOYW1lcykgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coXCJIZXJlJ3MgdGhlIHJldHVybmVkIHByb21pc2UuLi5cIiwgZW1wbG95ZWVOYW1lcyk7XG5cdFx0XHR2YXIgdGl0bGUgPSBcIkhlcmUncyBhbGwgdGhlIGVtcGxveWVlcyBJIGNvdWxkIGZpbmQuLi5cIjtcblx0XHRcdHJldHVybiBib3RIZWxwZXIuYXR0YWNobWVudE1ha2VyKGVtcGxveWVlTmFtZXMsIHRpdGxlKTtcblx0XHR9KVxuXHRcdC50aGVuKChhdHRhY2htZW50KSA9PiB7XG5cdFx0XHR2YXIgYXR0YWNobWVudHMgPSBbXTtcblx0XHRcdGF0dGFjaG1lbnRzLnB1c2goYXR0YWNobWVudCk7XG5cdFx0XHRib3QucmVwbHkobWVzc2FnZSx7XG5cdFx0XHRcdC8vIHRleHQ6ICcgJyxcblx0XHRcdFx0YXR0YWNobWVudHM6IGF0dGFjaG1lbnRzLFxuXHRcdFx0fSxmdW5jdGlvbihlcnIscmVzcCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIscmVzcCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSk7XG5cblxuXHQvKioqKioqKioqKioqKioqKioqIFBPU0lUSU9OUyAqKioqKioqKioqKioqKioqKiovXG5cdHdpdGJvdC5oZWFycygnYWxsX3Bvc2l0aW9ucycsIDAuOCwgZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSwgb3V0Y29tZSkge1xuXHRcdGJvdEhlbHBlci5hbGxQb3NpdGlvbnMoKVxuXHRcdC50aGVuKChwb3NpdGlvbnMpID0+e1xuXHRcdFx0cmV0dXJuIGJvdEhlbHBlci5hcnJheU1ha2VyKHBvc2l0aW9ucyk7XG5cdFx0fSlcblx0XHQudGhlbigocG9zaXRpb25OYW1lcykgPT4ge1xuXHRcdFx0dmFyIHRpdGxlID0gXCJIZXJlJ3MgYWxsIHRoZSBwb3NpdGlvbnMgSSBjb3VsZCBmaW5kLi4uXCI7XG5cdFx0XHRyZXR1cm4gYm90SGVscGVyLmF0dGFjaG1lbnRNYWtlcihwb3NpdGlvbk5hbWVzLCB0aXRsZSk7XG5cdFx0fSlcblx0XHQudGhlbigoYXR0YWNobWVudCkgPT4ge1xuXHRcdFx0dmFyIGF0dGFjaG1lbnRzID0gW107XG5cdFx0XHRhdHRhY2htZW50cy5wdXNoKGF0dGFjaG1lbnQpO1xuXHRcdFx0Ym90LnJlcGx5KG1lc3NhZ2Use1xuXHRcdFx0XHQvLyB0ZXh0OiAnICcsXG5cdFx0XHRcdGF0dGFjaG1lbnRzOiBhdHRhY2htZW50cyxcblx0XHRcdH0sZnVuY3Rpb24oZXJyLHJlc3ApIHtcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyLHJlc3ApO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0pO1xuXG5cdC8qKioqKioqKioqKioqKioqKiogUFJPSkVDVFMgKioqKioqKioqKioqKioqKioqL1xuXHR3aXRib3QuaGVhcnMoJ2FsbF9wcm9qZWN0cycsIDAuOCwgZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSwgb3V0Y29tZSkge1xuXHRcdGNvbnNvbGUubG9nKFwiSSdtIHRyeWluZyB0byBnZXQgcHJvamVjdHMhXCIpO1xuXHRcdGJvdEhlbHBlci5hbGxQcm9qZWN0cygpXG5cdFx0LnRoZW4oKHByb2plY3REZXRhaWxzKSA9PiB7XG5cdFx0XHR2YXIgdGl0bGUgPSBcIkhlcmUncyBhbGwgdGhlIHByb2plY3RzIEkgY291bGQgZmluZC4uLlwiO1xuXHRcdFx0Y29uc29sZS5sb2coXCJIZXJlJ3MgYWxsIHRoZSBwcm9qZWN0cyBJIHJldHVybmVkLi4uLlwiLCBwcm9qZWN0RGV0YWlscyk7XG5cdFx0XHRyZXR1cm4gYm90SGVscGVyLnByb2plY3RzQXR0YWNobWVudChwcm9qZWN0RGV0YWlscywgdGl0bGUpO1xuXHRcdH0pXG5cdFx0LnRoZW4oKGF0dGFjaG1lbnQpID0+IHtcblx0XHRcdHZhciBhdHRhY2htZW50cyA9IFtdO1xuXHRcdFx0YXR0YWNobWVudHMucHVzaChhdHRhY2htZW50KTtcblx0XHRcdGJvdC5yZXBseShtZXNzYWdlLHtcblx0XHRcdFx0Ly8gdGV4dDogJyAnLFxuXHRcdFx0XHRhdHRhY2htZW50czogYXR0YWNobWVudHMsXG5cdFx0XHR9LGZ1bmN0aW9uKGVycixyZXNwKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycixyZXNwKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9KTtcblxuXHR3aXRib3QuaGVhcnMoJ3Rhc2tzX2luX3Byb2plY3QnLCAwLjMsIGZ1bmN0aW9uKGJvdCxtZXNzYWdlLCBvdXRjb21lKXtcblx0XHRjb25zb2xlLmxvZyhcInRoaXMgaXMgd2hhdCBXSVQuQUkgcmV0dXJuZWRcIiwgb3V0Y29tZS5lbnRpdGllcy5wcm9qZWN0X2lkKTtcblx0XHRjb25zb2xlLmxvZyhcInRoaXMgaXMgd2hhdCBXSVQuQUkgcmV0dXJuZWRcIiwgb3V0Y29tZS5lbnRpdGllcy5wcm9qZWN0X2lkWzBdLnZhbHVlKTtcblx0XHR2YXIgdGl0bGUgPSBcIkhlcmUgYXJlIHRoZSB0YXNrcyBmb3IgcHJvamVjdCAtIFwiICsgb3V0Y29tZS5lbnRpdGllcy5wcm9qZWN0X2lkWzBdLnZhbHVlO1xuXHRcdHZhciBwcm9qZWN0SWQgPSBvdXRjb21lLmVudGl0aWVzLnByb2plY3RfaWRbMF0udmFsdWU7XG5cdFx0cmV0dXJuIGJvdEhlbHBlci5oYXNoU3RyaXBwZXIocHJvamVjdElkKVxuXHRcdC50aGVuKChjbGVhbklkKSA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkhlcmUncyB0aGUgY2xlYW4gSUQgSSBtYWRlXCIsIGNsZWFuSWQpO1xuXHRcdFx0cmV0dXJuIGJvdEhlbHBlci50YXNrc0luUHJvamVjdChjbGVhbklkKTtcblx0XHR9KVxuXHRcdC50aGVuKChwcm9qZWN0KSA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZyhcIldIYXQgd2UgZ290eiBiYWNrXCIsIHByb2plY3RbMF0udGFza3MpO1xuXHRcdFx0dmFyIGFycmF5ID0gcHJvamVjdFswXS50YXNrcztcblx0XHRcdGNvbnNvbGUubG9nKFwiSGVyZSdzIHRoZSB0YXNrcyBhc3NvY2lhdGVkIHdpdGggdGhhdCBwcm9qZWN0XCIsIGFycmF5KTtcblx0XHRcdHJldHVybiBib3RIZWxwZXIudGFza0F0dGFjaG1lbnQoYXJyYXksdGl0bGUpO1xuXHRcdH0pXG5cdFx0LnRoZW4oKGF0dGFjaG1lbnQpPT4ge1xuXHRcdFx0dmFyIGF0dGFjaG1lbnRzID0gW107XG5cdFx0XHRhdHRhY2htZW50cy5wdXNoKGF0dGFjaG1lbnQpO1xuXHRcdFx0Ym90LnJlcGx5KG1lc3NhZ2Use1xuXHRcdFx0XHQvLyB0ZXh0OiAnICcsXG5cdFx0XHRcdGF0dGFjaG1lbnRzOiBhdHRhY2htZW50cyxcblx0XHRcdH0sZnVuY3Rpb24oZXJyLHJlc3ApIHtcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyLHJlc3ApO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHQvLyBib3QucmVwbHkobWVzc2FnZSwgXCJMZXQgbWUgZ2V0IHRob3NlIHRhc2tzIGZvciB5b3UhXCIpO1xuXHR9KTtcblxuXHR3aXRib3QuaGVhcnMoJ292ZXJkdWVfcHJvamVjdHMnLCAwLjgsIGZ1bmN0aW9uIChib3QsIG1lc3NhZ2UsIG91dGNvbWUpIHtcblx0XHRjb25zb2xlLmxvZyhcIkknbSB0cnlpbmcgdG8gZ2V0IGFsbCBvdmVyZHVlIHByb2plY3RzIVwiKTtcblx0XHRib3RIZWxwZXIub3ZlcmR1ZVByb2plY3RzKClcblx0XHQudGhlbigocHJvamVjdERldGFpbHMpID0+IHtcblx0XHRcdHZhciB0aXRsZSA9IFwiSGVyZSdzIGFsbCB0aGUgb3ZlcmR1ZSBwcm9qZWN0cyBJIGNvdWxkIGZpbmQuLi5cIjtcblx0XHRcdGNvbnNvbGUubG9nKFwiSGVyZSdzIGFsbCB0aGUgb3ZlcmR1ZSBwcm9qZWN0cyBJIHJldHVybmVkLi4uLlwiLCBwcm9qZWN0RGV0YWlscyk7XG5cdFx0XHRyZXR1cm4gYm90SGVscGVyLnByb2plY3RzQXR0YWNobWVudChwcm9qZWN0RGV0YWlscywgdGl0bGUpO1xuXHRcdH0pXG5cdFx0LnRoZW4oKGF0dGFjaG1lbnQpID0+IHtcblx0XHRcdHZhciBhdHRhY2htZW50cyA9IFtdO1xuXHRcdFx0YXR0YWNobWVudHMucHVzaChhdHRhY2htZW50KTtcblx0XHRcdGJvdC5yZXBseShtZXNzYWdlLHtcblx0XHRcdFx0Ly8gdGV4dDogJyAnLFxuXHRcdFx0XHRhdHRhY2htZW50czogYXR0YWNobWVudHMsXG5cdFx0XHR9LGZ1bmN0aW9uKGVycixyZXNwKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycixyZXNwKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9KTtcblxuXHR3aXRib3QuaGVhcnMoJ2luc3VsdCcsIDAuNywgZnVuY3Rpb24oYm90LG1lc3NhZ2Usb3V0Y29tZSl7XG5cdFx0Y29uc29sZS5sb2coXCJZT1UgSU5TVUxURUQgTUUhXCIpO1xuXHRcdGJvdC5yZXBseShtZXNzYWdlLCBcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9S1d6YTVQUUE1WmNcIik7XG5cdH0pO1xuXG5cdHdpdGJvdC5oZWFycygnam9rZScsIDAuNSwgZnVuY3Rpb24oYm90LCBtZXNzYWdlLCBvdXRjb21lKXtcblx0XHRjb25zb2xlLmxvZyhcIkhlcmUncyB5b3VyIGpva2VcIik7XG5cdFx0Ym90LnJlcGx5KG1lc3NhZ2UsIFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1JdDNEVTJITWJhWVwiKTtcblx0fSk7XG5cblx0d2l0Ym90LmhlYXJzKCdjYW5hZGEnLCAwLjUsIGZ1bmN0aW9uKGJvdCxtZXNzYWdlLG91dGNvbWUpe1xuXHRcdGJvdC5yZXBseShtZXNzYWdlLCBcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9cEZDZDRaT1RWZzRcIik7XG5cdH0pO1xuXG5cdHdpdGJvdC5oZWFycygnamltbXknLCAwLjMsIGZ1bmN0aW9uKGJvdCwgbWVzc2FnZSwgb3V0Y29tZSl7XG5cdFx0Ym90LnJlcGx5KG1lc3NhZ2UsIFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1jVGw3NjJNdVh5Y1wiKTtcblx0fSk7XG5cblx0d2l0Ym90LmhlYXJzKCdicm93bmJhZycsIDAuNCwgZnVuY3Rpb24oYm90LG1lc3NhZ2Usb3V0Y29tZSl7XG5cdFx0Ym90LnJlcGx5KG1lc3NhZ2UsXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PWVQa1BZQTRBUTNvXCIpO1xuXHR9KTtcblxuXHR3aXRib3QuaGVhcnMoJ2NhaGxhbicsIDAuMywgZnVuY3Rpb24oYm90LG1lc3NhZ2Usb3V0Y29tZSl7XG5cdFx0Ym90LnJlcGx5KG1lc3NhZ2UsIFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1IbXFDRGdyM3lRZ1wiKTtcblx0fSk7XG5cbiAgICB3aXRib3QuaGVhcnMoJ3dpbHNvbicsIDAuMywgZnVuY3Rpb24oYm90LG1lc3NhZ2Usb3V0Y29tZSl7XG5cdFx0Ym90LnJlcGx5KG1lc3NhZ2UsIFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj0zZ05ya2d3UzZhTVwiKTtcblx0fSk7XG5cbiAgICB3aXRib3QuaGVhcnMoJ3Byb2plY3RzX2R1ZV90aGlzX21vbnRoJywgMC44LCBmdW5jdGlvbiAoYm90LCBtZXNzYWdlLCBvdXRjb21lKSB7XG5cdFx0Y29uc29sZS5sb2coXCJJJ20gdHJ5aW5nIHRvIGdldCBhbGwgcHJvamVjdHMgZHVlIHRoaXMgbW9udGghXCIpO1xuXHRcdGJvdEhlbHBlci5wcm9qZWN0c0R1ZVRoaXNNb250aCgpXG5cdFx0LnRoZW4oKHByb2plY3REZXRhaWxzKSA9PiB7XG5cdFx0XHR2YXIgdGl0bGUgPSBcIkhlcmUncyBhbGwgdGhlIHByb2plY3RzIGR1ZSB0aGlzIG1vbnRoLi4uXCI7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkhlcmUncyBhbGwgdGhlIHByb2plY3RzIGR1ZSB0aGlzIG1vbnRoLi4uLlwiLCBwcm9qZWN0RGV0YWlscyk7XG5cdFx0XHRyZXR1cm4gYm90SGVscGVyLnByb2plY3RzQXR0YWNobWVudChwcm9qZWN0RGV0YWlscywgdGl0bGUpO1xuXHRcdH0pXG5cdFx0LnRoZW4oKGF0dGFjaG1lbnQpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdIRUxMTycsIGF0dGFjaG1lbnQpO1xuXHRcdFx0dmFyIGF0dGFjaG1lbnRzID0gW107XG5cdFx0XHRhdHRhY2htZW50cy5wdXNoKGF0dGFjaG1lbnQpO1xuXHRcdFx0Ym90LnJlcGx5KG1lc3NhZ2Use1xuXHRcdFx0XHQvLyB0ZXh0OiAnICcsXG5cdFx0XHRcdGF0dGFjaG1lbnRzOiBhdHRhY2htZW50cyxcblx0XHRcdH0sZnVuY3Rpb24oZXJyLHJlc3ApIHtcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyLHJlc3ApO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0pO1xuXG4gICAgd2l0Ym90LmhlYXJzKCdwcm9qZWN0c19kdWVfdGhpc193ZWVrJywgMC44LCBmdW5jdGlvbiAoYm90LCBtZXNzYWdlLCBvdXRjb21lKSB7XG5cdFx0Y29uc29sZS5sb2coXCJJJ20gdHJ5aW5nIHRvIGdldCBhbGwgcHJvamVjdHMgZHVlIHRoaXMgd2VlayFcIik7XG5cdFx0Ym90SGVscGVyLnByb2plY3RzRHVlVGhpc1dlZWsoKVxuXHRcdC50aGVuKChwcm9qZWN0RGV0YWlscykgPT4ge1xuXHRcdFx0dmFyIHRpdGxlID0gXCJIZXJlJ3MgYWxsIHRoZSBwcm9qZWN0cyBkdWUgdGhpcyB3ZWVrLi4uXCI7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkhlcmUncyBhbGwgdGhlIHByb2plY3RzIGR1ZSB0aGlzIHdlZWsuLi4uXCIsIHByb2plY3REZXRhaWxzKTtcblx0XHRcdHJldHVybiBib3RIZWxwZXIucHJvamVjdHNBdHRhY2htZW50KHByb2plY3REZXRhaWxzLCB0aXRsZSk7XG5cdFx0fSlcblx0XHQudGhlbigoYXR0YWNobWVudCkgPT4ge1xuXHRcdFx0dmFyIGF0dGFjaG1lbnRzID0gW107XG5cdFx0XHRhdHRhY2htZW50cy5wdXNoKGF0dGFjaG1lbnQpO1xuXHRcdFx0Ym90LnJlcGx5KG1lc3NhZ2Use1xuXHRcdFx0XHQvLyB0ZXh0OiAnICcsXG5cdFx0XHRcdGF0dGFjaG1lbnRzOiBhdHRhY2htZW50cyxcblx0XHRcdH0sZnVuY3Rpb24oZXJyLHJlc3ApIHtcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyLHJlc3ApO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0pO1xuXG4gICAgd2l0Ym90LmhlYXJzKCdwcm9qZWN0c19kdWVfdG9kYXknLCAwLjgsIGZ1bmN0aW9uIChib3QsIG1lc3NhZ2UsIG91dGNvbWUpIHtcblx0XHRjb25zb2xlLmxvZyhcIkknbSB0cnlpbmcgdG8gZ2V0IGFsbCBwcm9qZWN0cyBkdWUgdG9kYXkhXCIpO1xuXHRcdGJvdEhlbHBlci5wcm9qZWN0c0R1ZVRvZGF5KClcblx0XHQudGhlbigocHJvamVjdERldGFpbHMpID0+IHtcblx0XHRcdHZhciB0aXRsZSA9IFwiSGVyZSdzIGFsbCB0aGUgcHJvamVjdHMgZHVlIHRvZGF5Li4uXCI7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkhlcmUncyBhbGwgdGhlIHByb2plY3RzIGR1ZSB0b2RheS4uLi5cIiwgcHJvamVjdERldGFpbHMpO1xuXHRcdFx0cmV0dXJuIGJvdEhlbHBlci5wcm9qZWN0c0F0dGFjaG1lbnQocHJvamVjdERldGFpbHMsIHRpdGxlKTtcblx0XHR9KVxuXHRcdC50aGVuKChhdHRhY2htZW50KSA9PiB7XG5cdFx0XHR2YXIgYXR0YWNobWVudHMgPSBbXTtcblx0XHRcdGF0dGFjaG1lbnRzLnB1c2goYXR0YWNobWVudCk7XG5cdFx0XHRib3QucmVwbHkobWVzc2FnZSx7XG5cdFx0XHRcdC8vIHRleHQ6ICcgJyxcblx0XHRcdFx0YXR0YWNobWVudHM6IGF0dGFjaG1lbnRzLFxuXHRcdFx0fSxmdW5jdGlvbihlcnIscmVzcCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIscmVzcCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSk7XG5cblx0LyoqKioqKioqKioqKioqKioqKiBQUk9KRUNUIFRBU0tTICoqKioqKioqKioqKioqKioqKi9cblx0d2l0Ym90LmhlYXJzKCdhbGxfdGFza3MnLDAuOCwgZnVuY3Rpb24oYm90LG1lc3NhZ2UsY291dGNvbWUpe1xuXHRcdGJvdEhlbHBlci5hbGxQcm9qZWN0VGFza3MoKVxuXHRcdC50aGVuKCh0YXNrcykgPT57XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhcIkhlcmUgYXJlIHRoZSB0YXNrcyBJIGdvdCBiYWNrIVwiLHRhc2tzKTtcblx0XHRcdHZhciB0aXRsZSA9IFwiSGVyZSdzIGFsbCB0aGUgdGFza3MgSSBjb3VsZCBmaW5kLi4uXCI7XG5cdFx0XHRyZXR1cm4gYm90SGVscGVyLnRhc2tBdHRhY2htZW50KHRhc2tzLCB0aXRsZSk7XG5cdFx0fSlcblx0XHQudGhlbigoYXR0YWNobWVudCkgPT4ge1xuXHRcdFx0dmFyIGF0dGFjaG1lbnRzID0gW107XG5cdFx0XHRhdHRhY2htZW50cy5wdXNoKGF0dGFjaG1lbnQpO1xuXHRcdFx0Ym90LnJlcGx5KG1lc3NhZ2Use1xuXHRcdFx0XHQvLyB0ZXh0OiAnICcsXG5cdFx0XHRcdGF0dGFjaG1lbnRzOiBhdHRhY2htZW50cyxcblx0XHRcdH0sZnVuY3Rpb24oZXJyLHJlc3ApIHtcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyLHJlc3ApO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0pO1xuXG4gICAgd2l0Ym90LmhlYXJzKCdhbGxfaW5jb21wbGV0ZV90YXNrcycsIDAuMiwgZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSwgb3V0Y29tZSkge1xuXHRcdGNvbnNvbGUubG9nKFwiSSdtIHRyeWluZyB0byBnZXQgYWxsIGluY29tcGxldGUgdGFza3MhXCIpO1xuXHRcdGJvdEhlbHBlci5hbGxJbmNvbXBsZXRlVGFza3MoKVxuXHRcdC50aGVuKChpbmNvbXBsZXRlVGFza3MpID0+IHtcblx0XHRcdHZhciB0aXRsZSA9IFwiSGVyZSdzIGFsbCB0aGUgaW5jb21wbGV0ZSB0YXNrcyBJIGNvdWxkIGZpbmQuLi5cIjtcblx0XHRcdGNvbnNvbGUubG9nKFwiSGVyZSdzIGFsbCB0aGUgaW5jb21wbGV0ZSB0YXNrcyBJIHJldHVybmVkLi4uLlwiLCBpbmNvbXBsZXRlVGFza3MpO1xuXHRcdFx0cmV0dXJuIGJvdEhlbHBlci50YXNrQXR0YWNobWVudChpbmNvbXBsZXRlVGFza3MsIHRpdGxlKTtcblx0XHR9KVxuXHRcdC50aGVuKChhdHRhY2htZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQVRUQUNITUVOVCcsIGF0dGFjaG1lbnQpO1xuXHRcdFx0dmFyIGF0dGFjaG1lbnRzID0gW107XG5cdFx0XHRhdHRhY2htZW50cy5wdXNoKGF0dGFjaG1lbnQpO1xuXHRcdFx0Ym90LnJlcGx5KG1lc3NhZ2Use1xuXHRcdFx0XHQvLyB0ZXh0OiAnICcsXG5cdFx0XHRcdGF0dGFjaG1lbnRzOiBhdHRhY2htZW50cyxcblx0XHRcdH0sZnVuY3Rpb24oZXJyLHJlc3ApIHtcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyLHJlc3ApO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0pO1xuXG4gICAgd2l0Ym90LmhlYXJzKCdvdmVyZHVlX3Rhc2tzJywgMC44LCBmdW5jdGlvbiAoYm90LCBtZXNzYWdlLCBvdXRjb21lKSB7XG5cdFx0Y29uc29sZS5sb2coXCJJJ20gdHJ5aW5nIHRvIGdldCBhbGwgb3ZlcmR1ZSB0YXNrcyFcIik7XG5cdFx0Ym90SGVscGVyLm92ZXJkdWVUYXNrcygpXG5cdFx0LnRoZW4oKHByb2plY3REZXRhaWxzKSA9PiB7XG5cdFx0XHR2YXIgdGl0bGUgPSBcIkhlcmUncyBhbGwgdGhlIG92ZXJkdWUgdGFza3MgSSBjb3VsZCBmaW5kLi4uXCI7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkhlcmUncyBhbGwgdGhlIG92ZXJkdWUgdGFza3MgSSByZXR1cm5lZC4uLi5cIiwgcHJvamVjdERldGFpbHMpO1xuXHRcdFx0cmV0dXJuIGJvdEhlbHBlci5wcm9qZWN0c0F0dGFjaG1lbnQocHJvamVjdERldGFpbHMsIHRpdGxlKTtcblx0XHR9KVxuICAgICAgICAudGhlbigodGFza05hbWVzKSA9PiB7XG5cdFx0XHQvLyBjb25zb2xlLmxvZyhcIkhlcmUncyB0aGUgcmV0dXJuZWQgcHJvbWlzZS4uLlwiLCB0YXNrTmFtZXMpO1xuXHRcdFx0dmFyIHRpdGxlID0gXCJIZXJlJ3MgYWxsIHRoZSBvdmVyZHVlIHRhc2tzIEkgY291bGQgZmluZC4uLlwiO1xuXHRcdFx0cmV0dXJuIGJvdEhlbHBlci5hdHRhY2htZW50TWFrZXIodGFza05hbWVzLCB0aXRsZSk7XG5cdFx0fSlcblx0XHQudGhlbigoYXR0YWNobWVudCkgPT4ge1xuXHRcdFx0dmFyIGF0dGFjaG1lbnRzID0gW107XG5cdFx0XHRhdHRhY2htZW50cy5wdXNoKGF0dGFjaG1lbnQpO1xuXHRcdFx0Ym90LnJlcGx5KG1lc3NhZ2Use1xuXHRcdFx0XHQvLyB0ZXh0OiAnICcsXG5cdFx0XHRcdGF0dGFjaG1lbnRzOiBhdHRhY2htZW50cyxcblx0XHRcdH0sZnVuY3Rpb24oZXJyLHJlc3ApIHtcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyLHJlc3ApO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0pO1xuXG5cbiBcdHdpdGJvdC5oZWFycygndGFza19jb21wbGV0ZScsIDAuOCwgZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSwgb3V0Y29tZSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkknbSB0cnlpbmcgdG8gY2hhbmdlIHRoZSB0YXNrIHN0YXR1cyB0byBjb21wbGV0ZS4uLlwiKTtcbiAgICAgICAgdmFyIHRhc2tpZCA9IG91dGNvbWUuZW50aXRpZXMudGFza19pZFswXS52YWx1ZTtcbiAgICAgICAgdmFyIG5ld0NsZWFuSWQ7XG4gICAgICAgIHZhciBwcm9qZWN0SWRSZWY7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVEFTSyBJRFwiLCB0YXNraWQpXG5cdFx0cmV0dXJuIGJvdEhlbHBlci5oYXNoU3RyaXBwZXIodGFza2lkKVxuICAgICAgICAudGhlbigoY2xlYW5JZCkgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coXCJIZXJlJ3MgdGhlIGNsZWFuIElEIEkgbWFkZVwiLCBjbGVhbklkKTtcbiAgICAgICAgICAgIG5ld0NsZWFuSWQgPSBjbGVhbklkO1xuXHRcdFx0cmV0dXJuIGJvdEhlbHBlci5zdGF0dXNDaGVjayhjbGVhbklkKTtcbiAgICAgICAgfSlcblx0XHQudGhlbigodGFzaykgPT4ge1xuICAgICAgICAgICAgaWYgKCF0YXNrKSB7XG4gICAgICAgICAgICAgICAgYm90LnJlcGx5KG1lc3NhZ2UsIFwiVGFzayBoYXMgYWxyZWFkeSBiZWVuIGNvbXBsZXRlZC5cIilcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcHJvamVjdElkUmVmID0gdGFza1swXS5hc3NvY2lhdGVkUHJvamVjdDtcbiAgICAgICAgICAgICAgICByZXR1cm4gYm90SGVscGVyLnRhc2tDb21wbGV0ZShuZXdDbGVhbklkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oKHRhc2spID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiSGVyZSdzIHRoZSByZXR1cm5lZCBwcm9taXNlLi4uXCIsIHRhc2spO1xuXHRcdFx0dmFyIHRpdGxlID0gXCJIZXJlJ3MgdGhlIHRhc2suLi5cIjtcblx0XHRcdHJldHVybiBib3RIZWxwZXIudGFza0F0dGFjaG1lbnQoW3Rhc2tdLCB0aXRsZSk7XG5cdFx0fSlcblx0XHQudGhlbigoYXR0YWNobWVudCkgPT4ge1xuICAgICAgICAgICAgdmFyIGRlZmVycmVkID0gUS5kZWZlcigpO1xuXHRcdFx0dmFyIGF0dGFjaG1lbnRzID0gW107XG5cdFx0XHRhdHRhY2htZW50cy5wdXNoKGF0dGFjaG1lbnQpO1xuXHRcdFx0ZGVmZXJyZWQucmVzb2x2ZShib3QucmVwbHkobWVzc2FnZSx7XG5cdFx0XHRcdC8vIHRleHQ6ICcgJyxcblx0XHRcdFx0YXR0YWNobWVudHM6IGF0dGFjaG1lbnRzLFxuXHRcdFx0fSxmdW5jdGlvbihlcnIscmVzcCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIscmVzcCk7XG5cdFx0XHR9KSk7XG4gICAgICAgICAgICByZXR1cm4gZGVmZXJyZWQucHJvbWlzZTtcblx0XHR9KVxuICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYm90SGVscGVyLnRhc2tDb21wbGV0ZUNvdW50KHByb2plY3RJZFJlZik7XG4gICAgICAgIH0pO1xuIFx0fSk7XG5cbiAgICAvKioqKioqKioqKioqKioqKioqIElOQ09NUExFVEUgUFJPSkVDVFMgKioqKioqKioqKioqKioqKioqL1xuXG5cdHdpdGJvdC5oZWFycygnaW5jb21wbGV0ZV9wcm9qZWN0cycsIDAuOCwgZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSwgb3V0Y29tZSkge1xuXHRcdGNvbnNvbGUubG9nKFwiSSdtIHRyeWluZyB0byBnZXQgaW5jb21wbGV0ZSBwcm9qZWN0cyFcIik7XG5cdFx0Ym90SGVscGVyLmFsbEluY29tcGxldGVQcm9qZWN0cygpXG5cdFx0LnRoZW4oKHByb2plY3REZXRhaWxzKSA9PiB7XG5cdFx0XHR2YXIgdGl0bGUgPSBcIkhlcmUncyBhbGwgdGhlIGluY29tcGxldGUgcHJvamVjdHMgSSBjb3VsZCBmaW5kLi4uXCI7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkhlcmUncyBhbGwgdGhlIGluY29tcGxldGUgcHJvamVjdHMgSSByZXR1cm5lZC4uLi5cIiwgcHJvamVjdERldGFpbHMpO1xuXHRcdFx0cmV0dXJuIGJvdEhlbHBlci5wcm9qZWN0c0F0dGFjaG1lbnQocHJvamVjdERldGFpbHMsIHRpdGxlKTtcblx0XHR9KVxuXHRcdC50aGVuKChhdHRhY2htZW50KSA9PiB7XG5cdFx0XHR2YXIgYXR0YWNobWVudHMgPSBbXTtcblx0XHRcdGF0dGFjaG1lbnRzLnB1c2goYXR0YWNobWVudCk7XG5cdFx0XHRib3QucmVwbHkobWVzc2FnZSx7XG5cdFx0XHRcdC8vIHRleHQ6ICcgJyxcblx0XHRcdFx0YXR0YWNobWVudHM6IGF0dGFjaG1lbnRzLFxuXHRcdFx0fSxmdW5jdGlvbihlcnIscmVzcCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIscmVzcCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSk7XG5cbiAgICAvKioqKioqKioqKioqKioqKioqIENPTVBMRVRFIFBST0pFQ1RTICoqKioqKioqKioqKioqKioqKi9cblxuXHR3aXRib3QuaGVhcnMoJ2NvbXBsZXRlX3Byb2plY3RzJywgMC44LCBmdW5jdGlvbiAoYm90LCBtZXNzYWdlLCBvdXRjb21lKSB7XG5cdFx0Y29uc29sZS5sb2coXCJJJ20gdHJ5aW5nIHRvIGdldCBjb21wbGV0ZSBwcm9qZWN0cyFcIik7XG5cdFx0Ym90SGVscGVyLmFsbENvbXBsZXRlUHJvamVjdHMoKVxuXHRcdC50aGVuKChwcm9qZWN0RGV0YWlscykgPT4ge1xuXHRcdFx0dmFyIHRpdGxlID0gXCJIZXJlJ3MgYWxsIHRoZSBjb21wbGV0ZSBwcm9qZWN0cyBJIGNvdWxkIGZpbmQuLi5cIjtcblx0XHRcdGNvbnNvbGUubG9nKFwiSGVyZSdzIGFsbCB0aGUgY29tcGxldGUgcHJvamVjdHMgSSByZXR1cm5lZC4uLi5cIiwgcHJvamVjdERldGFpbHMpO1xuXHRcdFx0cmV0dXJuIGJvdEhlbHBlci5wcm9qZWN0c0F0dGFjaG1lbnQocHJvamVjdERldGFpbHMsIHRpdGxlKTtcblx0XHR9KVxuXHRcdC50aGVuKChhdHRhY2htZW50KSA9PiB7XG5cdFx0XHR2YXIgYXR0YWNobWVudHMgPSBbXTtcblx0XHRcdGF0dGFjaG1lbnRzLnB1c2goYXR0YWNobWVudCk7XG5cdFx0XHRib3QucmVwbHkobWVzc2FnZSx7XG5cdFx0XHRcdC8vIHRleHQ6ICcgJyxcblx0XHRcdFx0YXR0YWNobWVudHM6IGF0dGFjaG1lbnRzLFxuXHRcdFx0fSxmdW5jdGlvbihlcnIscmVzcCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIscmVzcCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

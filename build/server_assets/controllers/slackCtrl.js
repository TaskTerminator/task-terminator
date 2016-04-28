'use strict';

var mongoose = require('mongoose');
var Botkit = require('botkit');
var Q = require('q');
var positions = require('../controllers/positionCtrl.js');
var botHelper = require('../controllers/slackBotHelpers.js');
var Witbot = require('witbot');

var controller = Botkit.slackbot({
	debug: false
});
//
//	// connect the bot to a stream of messages
//	 controller.spawn({
//	 	//DevMtn Token
//	   // token: 'xoxb-18104911812-lrix7VmoDeWSS4PTA8SxNFnN',
//	 	//Our Slack Token
////	 	token: 'xoxb-19173759013-8uzX74R1NerEeFscDMEHIu39',
//	 }).startRTM(function(err) {
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

module.exports = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlcl9hc3NldHMvY29udHJvbGxlcnMvc2xhY2tDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3JDLElBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqQyxJQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdkIsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7QUFDNUQsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLENBQUM7QUFDL0QsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUVqQyxJQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDO0FBQ2hDLE1BQUssRUFBRSxLQUFLO0NBQ2IsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FBQUMsQUFlSCxJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsa0NBQWtDLENBQ3ZEOzs7O0FBQUMsQUFLRixVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSwrQkFBK0IsRUFBRSxVQUFVLEdBQUcsRUFBRSxPQUFPLEVBQUU7QUFDL0UsT0FBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztDQUMzQyxDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFVBQVUsR0FBRyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUU7QUFDMUQsS0FBSSxLQUFLLEdBQUcsR0FBRyxDQUFDO0FBQ2hCLEtBQUksU0FBUyxHQUFHLENBQ2YsWUFBWSxFQUNaLHdEQUF3RCxFQUN4RCxrQkFBa0IsRUFDbEIsa0NBQWtDLEVBQ2xDLGdCQUFnQixFQUNoQiw0REFBNEQsRUFDNUQsZUFBZSxFQUNmLHNFQUFz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QUFPLEVBQUM7QUFDeEQsUUFBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ2hDLElBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLDZDQUE2QyxDQUFDLENBQUM7Q0FDbEUsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxVQUFTLEdBQUcsRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDO0FBQ3hELElBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLDZDQUE2QyxDQUFDLENBQUM7Q0FDbEUsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxVQUFTLEdBQUcsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFDO0FBQ3pELElBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLDZDQUE2QyxDQUFDLENBQUM7Q0FDbEUsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxVQUFTLEdBQUcsRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDO0FBQzFELElBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFDLDZDQUE2QyxDQUFDLENBQUM7Q0FDakUsQ0FBQyxDQUFDOztBQUVILE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxVQUFTLEdBQUcsRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDO0FBQ3hELElBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLDZDQUE2QyxDQUFDLENBQUM7Q0FDbEUsQ0FBQyxDQUFDOztBQUVBLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxVQUFTLEdBQUcsRUFBQyxPQUFPLEVBQUMsT0FBTyxFQUFDO0FBQzNELElBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLDZDQUE2QyxDQUFDLENBQUM7Q0FDbEUsQ0FBQyxDQUFDOztBQUVBLE1BQU0sQ0FBQyxLQUFLLENBQUMseUJB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QixNQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDckIsYUFBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM3QixLQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBQzs7QUFFakIsY0FBVyxFQUFFLFdBQVc7R0FDeEIsRUFBQyxVQUFTLEdBQUcsRUFBQyxJQUFJLEVBQUU7QUFDcEIsVUFBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLENBQUM7R0FDdEIsQ0FBQyxDQUFDO0VBQ0gsQ0FBQyxDQUFDO0NBQ0gsQ0FBQyxDQUFDOztBQUdILE1BQU0sQ0FBQyxPQUFPLEdBQUcsRUFFaEIsQ0FBQyIsImZpbGUiOiJzZXJ2ZXJfYXNzZXRzL2NvbnRyb2xsZXJzL3NsYWNrQ3RybC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuY29uc3QgbW9uZ29vc2UgPSByZXF1aXJlKCdtb25nb29zZScpO1xuY29uc3QgQm90a2l0ID0gcmVxdWlyZSgnYm90a2l0Jyk7XG5jb25zdCBRID0gcmVxdWlyZSgncScpO1xuY29uc3QgcG9zaXRpb25zID0gcmVxdWlyZSgnLi4vY29udHJvbGxlcnMvcG9zaXRpb25DdHJsLmpzJyk7XG5jb25zdCBib3RIZWxwZXIgPSByZXF1aXJlKCcuLi9jb250cm9sbGVycy9zbGFja0JvdEhlbHBlcnMuanMnKTtcbmNvbnN0IFdpdGJvdCA9IHJlcXVpcmUoJ3dpdGJvdCcpO1xuXG5jb25zdCBjb250cm9sbGVyID0gQm90a2l0LnNsYWNrYm90KHtcblx0ICBkZWJ1ZzogZmFsc2Vcblx0fSk7XG4vL1xuLy9cdC8vIGNvbm5lY3QgdGhlIGJvdCB0byBhIHN0cmVhbSBvZiBtZXNzYWdlc1xuLy9cdCBjb250cm9sbGVyLnNwYXduKHtcbi8vXHQgXHQvL0Rldk10biBUb2tlblxuLy9cdCAgIC8vIHRva2VuOiAneG94Yi0xODEwNDkxMTgxMi1scml4N1Ztb0RlV1NTNFBUQThTeE5Gbk4nLFxuLy9cdCBcdC8vT3VyIFNsYWNrIFRva2VuXG4vLy8vXHQgXHR0b2tlbjogJ3hveGItMTkxNzM3NTkwMTMtOHV6WDc0UjFOZXJFZUZzY0RNRUhJdTM5Jyxcbi8vXHQgfSkuc3RhcnRSVE0oZnVuY3Rpb24oZXJyKSB7XG4vLyAgICBpZiAoZXJyKSB7XG4vLyAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuLy8gICAgfVxuLy8gIH0pO1xuXG5cdC8vTElOSyBUSEUgQk9UIFRPIFdJVC5BSVxuXHRjb25zdCB3aXRib3QgPSBXaXRib3QoXCJDWlBJTkM2RVZPUTdEQ1BaU1VVQlEzQjVHV1FWT1E2NlwiXG5cdCk7XG5cblxuXHQvKioqKioqKioqKioqKioqKioqIEJPVCBTUEVDSUZJQyBDT01NQU5EUyAqKioqKioqKioqKioqKioqKiovXG5cdC8vd2lyZSB1cCBETSdzIGFuZCBkaXJlY3QgbWVudGlvbnMgdG8gd2l0LmFpXG5cdGNvbnRyb2xsZXIuaGVhcnMoJy4qJywgJ2RpcmVjdF9tZXNzYWdlLGRpcmVjdF9tZW50aW9uJywgZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSkge1xuXHRcdHdpdGJvdC5wcm9jZXNzKG1lc3NhZ2UudGV4dCwgYm90LCBtZXNzYWdlKTtcblx0fSk7XG5cblx0d2l0Ym90LmhlYXJzKCdoZWxwJywgMC41LCBmdW5jdGlvbiAoYm90LCBtZXNzYWdlLCBvdXRjb21lKSB7XG5cdFx0dmFyIHRpdGxlID0gXCIgXCI7XG5cdFx0dmFyIGJvdFNraWxseiA9IFtcblx0XHRcdFwic2hvdyByb2xlc1wiLFxuXHRcdFx0XCJGb3Jnb3QgYSBqb2IgdGl0bGU/IEhlcmUncyBhbGwgb2YgZW0gZm9yIHlvdXIgY29tcGFueSFcIixcblx0XHRcdCdzaG93IGRlcGFydG1lbnRzJyxcblx0XHRcdFwiQWxsIHRoZSBkZXBhcnRtZW50cy4gQWxsIG9mIGVtLiBcIixcblx0XHRcdCdzaG93IGVtcGxveWVlcycsXG5cdFx0XHRcIkRvbid0IGZvcmdldCB0aGF0IGd1eSBpbiBhY2NvdW50aW5nJ3MgbmFtZS4gRmluZCBoaW0gaGVyZSFcIixcblx0XHRcdCdzaG93IHByb2plY3RzJyxcblx0XHRcdFwiSnVzdCBhIGxpc3Qgb2YgZXZlcnkgb3BlbiBwcm9qZWN0IGluIHlvdXIgY29tcGFueS4gTm93IGdldCB3b3JraW5nLiBcIixcblx0XHRcdFwiaGVscFwiLFxuXHRcdFx0XCJUZWxscyB5b3UgYWxsIGFib3V0IG15IG1hZ2ljIHBvd2Vycy5cIixcblx0XHRdO1xuXHRcdGJvdEhlbHBlci5oZWxwQXR0YWNobWVudChib3RTa2lsbHosdGl0bGUpXG5cdFx0LnRoZW4oKGF0dGFjaG1lbnQpID0+IHtcblx0XHRcdHZhciBhdHRhY2htZW50cyA9IFtdO1xuXHRcdFx0YXR0YWNobWVudHMucHVzaChhdHRhY2htZW50KTtcblx0XHRcdGJvdC5yZXBseShtZXNzYWdlLHtcblx0XHRcdFx0Ly8gdGV4dDogJyAnLFxuXHRcdFx0XHRhdHRhY2htZW50czogYXR0YWNobWVudHMsXG5cdFx0XHR9LGZ1bmN0aW9uKGVycixyZXNwKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycixyZXNwKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9KTtcblxuXHR3aXRib3Qub3RoZXJ3aXNlKGZ1bmN0aW9uIChib3QsIG1lc3NhZ2UpIHtcblx0XHR2YXIgdGl0bGUgPSBcIiBcIjtcblx0XHR2YXIgYm90U2tpbGx6ID0gW1xuXHRcdFx0XCJzaG93IHJvbGVzXCIsXG5cdFx0XHRcIkZvcmdvdCBhIGpvYiB0aXRsZT8gSGVyZSdzIGFsbCBvZiBlbSBmb3IgeW91ciBjb21wYW55IVwiLFxuXHRcdFx0J3Nob3cgZGVwYXJ0bWVudHMnLFxuXHRcdFx0XCJBbGwgdGhlIGRlcGFydG1lbnRzLiBBbGwgb2YgZW0uIFwiLFxuXHRcdFx0J3Nob3cgZW1wbG95ZWVzJyxcblx0XHRcdFwiRG9uJ3QgZm9yZ2V0IHRoYXQgZ3V5IGluIGFjY291bnRpbmcncyBuYW1lLiBGaW5kIGhpbSBoZXJlIVwiLFxuXHRcdFx0J3Nob3cgcHJvamVjdHMnLFxuXHRcdFx0XCJKdXN0IGEgbGlzdCBvZiBldmVyeSBvcGVuIHByb2plY3QgaW4geW91ciBjb21wYW55LiBOb3cgZ2V0IHdvcmtpbmcuIFwiLFxuXHRcdFx0XCJoZWxwXCIsXG5cdFx0XHRcIlRlbGxzIHlvdSBhbGwgYWJvdXQgbXkgbWFnaWMgcG93ZXJzLlwiLFxuXHRcdF07XG5cdFx0Ym90SGVscGVyLmhlbHBBdHRhY2htZW50KGJvdFNraWxseix0aXRsZSlcblx0XHQudGhlbigoYXR0YWNobWVudCkgPT4ge1xuXHRcdFx0dmFyIGF0dGFjaG1lbnRzID0gW107XG5cdFx0XHRhdHRhY2htZW50cy5wdXNoKGF0dGFjaG1lbnQpO1xuXHRcdFx0Ym90LnJlcGx5KG1lc3NhZ2Use1xuXHRcdFx0XHQvLyB0ZXh0OiAnICcsXG5cdFx0XHRcdGF0dGFjaG1lbnRzOiBhdHRhY2htZW50cyxcblx0XHRcdH0sZnVuY3Rpb24oZXJyLHJlc3ApIHtcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyLHJlc3ApO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0pO1xuXG5cdGNvbnRyb2xsZXIuaGVhcnMoWydkbSBtZSddLFsnZGlyZWN0X21lc3NhZ2UnLCdkaXJlY3RfbWVudGlvbiddLGZ1bmN0aW9uKGJvdCxtZXNzYWdlKSB7XG5cdFx0Ym90LnN0YXJ0Q29udmVyc2F0aW9uKG1lc3NhZ2UsZnVuY3Rpb24oZXJyLGNvbnZvKSB7XG5cdFx0XHRjb252by5zYXkoJ0hlYXJkIHlhJyk7XG5cdFx0fSk7XG5cblx0XHRib3Quc3RhcnRQcml2YXRlQ29udmVyc2F0aW9uKG1lc3NhZ2UsZnVuY3Rpb24oZXJyLGRtKSB7XG5cdFx0XHRkbS5zYXkoJ1ByaXZhdGUgcmVwbHkhJyk7XG5cdFx0fSk7XG5cdH0pO1xuXG5cdC8qKioqKioqKioqKioqKioqKiogR1JFRVRJTkdTICoqKioqKioqKioqKioqKioqKi9cblx0d2l0Ym90LmhlYXJzKCdncmVldGluZycsIDAuNSwgZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSwgb3V0Y29tZSkge1xuXHRcdGNvbnNvbGUubG9nKFwiV0lULkFJIE91dGNvbWVcIiwgb3V0Y29tZSk7XG5cdFx0Y29uc29sZS5sb2coXCJXSVQuQUkgT3V0Y29tZVwiLCBvdXRjb21lLmVudGl0aWVzLmdyZWV0aW5nKTtcblx0XHRib3QucmVwbHkobWVzc2FnZSwgJ0dyZWV0aW5ncyBlYXJ0aGxpbmcuJyk7XG5cdH0pO1xuXG5cdC8qKioqKioqKioqKioqKioqKiogREVQQVJUTUVOVFMgKioqKioqKioqKioqKioqKioqL1xuXHR3aXRib3QuaGVhcnMoJ2FsbF9kZXBhcnRtZW50cycsIDAuOCwgZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSwgb3V0Y29tZSkge1xuXHRcdGNvbnNvbGUubG9nKFwiV0lULkFJIE91dGNvbWVcIiwgb3V0Y29tZSk7XG5cdFx0Ym90SGVscGVyLmFsbERlcGFydG1lbnRzKClcblx0XHQudGhlbigoZGVwYXJ0bWVudHMpID0+e1xuXHRcdFx0cmV0dXJuIGJvdEhlbHBlci5hcnJheU1ha2VyKGRlcGFydG1lbnRzKTtcblx0XHR9KVxuXHRcdC50aGVuKChkZXBhcnRtZW50TmFtZXMpID0+IHtcblx0XHRcdHZhciB0aXRsZSA9IFwiSGVyZSdzIGFsbCB0aGUgZGVwYXJ0bWVudHMgSSBjb3VsZCBmaW5kLi4uXCI7XG5cdFx0XHRyZXR1cm4gYm90SGVscGVyLmF0dGFjaG1lbnRNYWtlcihkZXBhcnRtZW50TmFtZXMsIHRpdGxlKTtcblx0XHR9KVxuXHRcdC50aGVuKChhdHRhY2htZW50KSA9PiB7XG5cdFx0XHR2YXIgYXR0YWNobWVudHMgPSBbXTtcblx0XHRcdGF0dGFjaG1lbnRzLnB1c2goYXR0YWNobWVudCk7XG5cdFx0XHRib3QucmVwbHkobWVzc2FnZSx7XG5cdFx0XHRcdC8vIHRleHQ6ICcgJyxcblx0XHRcdFx0YXR0YWNobWVudHM6IGF0dGFjaG1lbnRzLFxuXHRcdFx0fSxmdW5jdGlvbihlcnIscmVzcCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIscmVzcCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSk7XG5cblx0LyoqKioqKioqKioqKioqKioqKiBFTVBMT1lFRVMgKioqKioqKioqKioqKioqKioqL1xuXHR3aXRib3QuaGVhcnMoJ2FsbF9lbXBsb3llZXMnLCAwLjgsIGZ1bmN0aW9uIChib3QsIG1lc3NhZ2UsIG91dGNvbWUpIHtcblx0XHRjb25zb2xlLmxvZyhvdXRjb21lKTtcblx0XHRib3RIZWxwZXIuYWxsRW1wbG95ZWVzKClcblx0XHQudGhlbigoZW1wbG95ZWVzKSA9Pntcblx0XHRcdHJldHVybiBib3RIZWxwZXIuYXJyYXlNYWtlckVtcGxveWVlTmFtZShlbXBsb3llZXMpO1xuXHRcdH0pXG5cdFx0LnRoZW4oKGVtcGxveWVlTmFtZXMpID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKFwiSGVyZSdzIHRoZSByZXR1cm5lZCBwcm9taXNlLi4uXCIsIGVtcGxveWVlTmFtZXMpO1xuXHRcdFx0dmFyIHRpdGxlID0gXCJIZXJlJ3MgYWxsIHRoZSBlbXBsb3llZXMgSSBjb3VsZCBmaW5kLi4uXCI7XG5cdFx0XHRyZXR1cm4gYm90SGVscGVyLmF0dGFjaG1lbnRNYWtlcihlbXBsb3llZU5hbWVzLCB0aXRsZSk7XG5cdFx0fSlcblx0XHQudGhlbigoYXR0YWNobWVudCkgPT4ge1xuXHRcdFx0dmFyIGF0dGFjaG1lbnRzID0gW107XG5cdFx0XHRhdHRhY2htZW50cy5wdXNoKGF0dGFjaG1lbnQpO1xuXHRcdFx0Ym90LnJlcGx5KG1lc3NhZ2Use1xuXHRcdFx0XHQvLyB0ZXh0OiAnICcsXG5cdFx0XHRcdGF0dGFjaG1lbnRzOiBhdHRhY2htZW50cyxcblx0XHRcdH0sZnVuY3Rpb24oZXJyLHJlc3ApIHtcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyLHJlc3ApO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0pO1xuXG5cblx0LyoqKioqKioqKioqKioqKioqKiBQT1NJVElPTlMgKioqKioqKioqKioqKioqKioqL1xuXHR3aXRib3QuaGVhcnMoJ2FsbF9wb3NpdGlvbnMnLCAwLjgsIGZ1bmN0aW9uIChib3QsIG1lc3NhZ2UsIG91dGNvbWUpIHtcblx0XHRib3RIZWxwZXIuYWxsUG9zaXRpb25zKClcblx0XHQudGhlbigocG9zaXRpb25zKSA9Pntcblx0XHRcdHJldHVybiBib3RIZWxwZXIuYXJyYXlNYWtlcihwb3NpdGlvbnMpO1xuXHRcdH0pXG5cdFx0LnRoZW4oKHBvc2l0aW9uTmFtZXMpID0+IHtcblx0XHRcdHZhciB0aXRsZSA9IFwiSGVyZSdzIGFsbCB0aGUgcG9zaXRpb25zIEkgY291bGQgZmluZC4uLlwiO1xuXHRcdFx0cmV0dXJuIGJvdEhlbHBlci5hdHRhY2htZW50TWFrZXIocG9zaXRpb25OYW1lcywgdGl0bGUpO1xuXHRcdH0pXG5cdFx0LnRoZW4oKGF0dGFjaG1lbnQpID0+IHtcblx0XHRcdHZhciBhdHRhY2htZW50cyA9IFtdO1xuXHRcdFx0YXR0YWNobWVudHMucHVzaChhdHRhY2htZW50KTtcblx0XHRcdGJvdC5yZXBseShtZXNzYWdlLHtcblx0XHRcdFx0Ly8gdGV4dDogJyAnLFxuXHRcdFx0XHRhdHRhY2htZW50czogYXR0YWNobWVudHMsXG5cdFx0XHR9LGZ1bmN0aW9uKGVycixyZXNwKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycixyZXNwKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9KTtcblxuXHQvKioqKioqKioqKioqKioqKioqIFBST0pFQ1RTICoqKioqKioqKioqKioqKioqKi9cblx0d2l0Ym90LmhlYXJzKCdhbGxfcHJvamVjdHMnLCAwLjgsIGZ1bmN0aW9uIChib3QsIG1lc3NhZ2UsIG91dGNvbWUpIHtcblx0XHRjb25zb2xlLmxvZyhcIkknbSB0cnlpbmcgdG8gZ2V0IHByb2plY3RzIVwiKTtcblx0XHRib3RIZWxwZXIuYWxsUHJvamVjdHMoKVxuXHRcdC50aGVuKChwcm9qZWN0RGV0YWlscykgPT4ge1xuXHRcdFx0dmFyIHRpdGxlID0gXCJIZXJlJ3MgYWxsIHRoZSBwcm9qZWN0cyBJIGNvdWxkIGZpbmQuLi5cIjtcblx0XHRcdGNvbnNvbGUubG9nKFwiSGVyZSdzIGFsbCB0aGUgcHJvamVjdHMgSSByZXR1cm5lZC4uLi5cIiwgcHJvamVjdERldGFpbHMpO1xuXHRcdFx0cmV0dXJuIGJvdEhlbHBlci5wcm9qZWN0c0F0dGFjaG1lbnQocHJvamVjdERldGFpbHMsIHRpdGxlKTtcblx0XHR9KVxuXHRcdC50aGVuKChhdHRhY2htZW50KSA9PiB7XG5cdFx0XHR2YXIgYXR0YWNobWVudHMgPSBbXTtcblx0XHRcdGF0dGFjaG1lbnRzLnB1c2goYXR0YWNobWVudCk7XG5cdFx0XHRib3QucmVwbHkobWVzc2FnZSx7XG5cdFx0XHRcdC8vIHRleHQ6ICcgJyxcblx0XHRcdFx0YXR0YWNobWVudHM6IGF0dGFjaG1lbnRzLFxuXHRcdFx0fSxmdW5jdGlvbihlcnIscmVzcCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIscmVzcCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSk7XG5cblx0d2l0Ym90LmhlYXJzKCd0YXNrc19pbl9wcm9qZWN0JywgMC4zLCBmdW5jdGlvbihib3QsbWVzc2FnZSwgb3V0Y29tZSl7XG5cdFx0Y29uc29sZS5sb2coXCJ0aGlzIGlzIHdoYXQgV0lULkFJIHJldHVybmVkXCIsIG91dGNvbWUuZW50aXRpZXMucHJvamVjdF9pZCk7XG5cdFx0Y29uc29sZS5sb2coXCJ0aGlzIGlzIHdoYXQgV0lULkFJIHJldHVybmVkXCIsIG91dGNvbWUuZW50aXRpZXMucHJvamVjdF9pZFswXS52YWx1ZSk7XG5cdFx0dmFyIHRpdGxlID0gXCJIZXJlIGFyZSB0aGUgdGFza3MgZm9yIHByb2plY3QgLSBcIiArIG91dGNvbWUuZW50aXRpZXMucHJvamVjdF9pZFswXS52YWx1ZTtcblx0XHR2YXIgcHJvamVjdElkID0gb3V0Y29tZS5lbnRpdGllcy5wcm9qZWN0X2lkWzBdLnZhbHVlO1xuXHRcdHJldHVybiBib3RIZWxwZXIuaGFzaFN0cmlwcGVyKHByb2plY3RJZClcblx0XHQudGhlbigoY2xlYW5JZCkgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coXCJIZXJlJ3MgdGhlIGNsZWFuIElEIEkgbWFkZVwiLCBjbGVhbklkKTtcblx0XHRcdHJldHVybiBib3RIZWxwZXIudGFza3NJblByb2plY3QoY2xlYW5JZCk7XG5cdFx0fSlcblx0XHQudGhlbigocHJvamVjdCkgPT4ge1xuXHRcdFx0Y29uc29sZS5sb2coXCJXSGF0IHdlIGdvdHogYmFja1wiLCBwcm9qZWN0WzBdLnRhc2tzKTtcblx0XHRcdHZhciBhcnJheSA9IHByb2plY3RbMF0udGFza3M7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkhlcmUncyB0aGUgdGFza3MgYXNzb2NpYXRlZCB3aXRoIHRoYXQgcHJvamVjdFwiLCBhcnJheSk7XG5cdFx0XHRyZXR1cm4gYm90SGVscGVyLnRhc2tBdHRhY2htZW50KGFycmF5LHRpdGxlKTtcblx0XHR9KVxuXHRcdC50aGVuKChhdHRhY2htZW50KT0+IHtcblx0XHRcdHZhciBhdHRhY2htZW50cyA9IFtdO1xuXHRcdFx0YXR0YWNobWVudHMucHVzaChhdHRhY2htZW50KTtcblx0XHRcdGJvdC5yZXBseShtZXNzYWdlLHtcblx0XHRcdFx0Ly8gdGV4dDogJyAnLFxuXHRcdFx0XHRhdHRhY2htZW50czogYXR0YWNobWVudHMsXG5cdFx0XHR9LGZ1bmN0aW9uKGVycixyZXNwKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycixyZXNwKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXG5cdFx0Ly8gYm90LnJlcGx5KG1lc3NhZ2UsIFwiTGV0IG1lIGdldCB0aG9zZSB0YXNrcyBmb3IgeW91IVwiKTtcblx0fSk7XG5cblx0d2l0Ym90LmhlYXJzKCdvdmVyZHVlX3Byb2plY3RzJywgMC44LCBmdW5jdGlvbiAoYm90LCBtZXNzYWdlLCBvdXRjb21lKSB7XG5cdFx0Y29uc29sZS5sb2coXCJJJ20gdHJ5aW5nIHRvIGdldCBhbGwgb3ZlcmR1ZSBwcm9qZWN0cyFcIik7XG5cdFx0Ym90SGVscGVyLm92ZXJkdWVQcm9qZWN0cygpXG5cdFx0LnRoZW4oKHByb2plY3REZXRhaWxzKSA9PiB7XG5cdFx0XHR2YXIgdGl0bGUgPSBcIkhlcmUncyBhbGwgdGhlIG92ZXJkdWUgcHJvamVjdHMgSSBjb3VsZCBmaW5kLi4uXCI7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkhlcmUncyBhbGwgdGhlIG92ZXJkdWUgcHJvamVjdHMgSSByZXR1cm5lZC4uLi5cIiwgcHJvamVjdERldGFpbHMpO1xuXHRcdFx0cmV0dXJuIGJvdEhlbHBlci5wcm9qZWN0c0F0dGFjaG1lbnQocHJvamVjdERldGFpbHMsIHRpdGxlKTtcblx0XHR9KVxuXHRcdC50aGVuKChhdHRhY2htZW50KSA9PiB7XG5cdFx0XHR2YXIgYXR0YWNobWVudHMgPSBbXTtcblx0XHRcdGF0dGFjaG1lbnRzLnB1c2goYXR0YWNobWVudCk7XG5cdFx0XHRib3QucmVwbHkobWVzc2FnZSx7XG5cdFx0XHRcdC8vIHRleHQ6ICcgJyxcblx0XHRcdFx0YXR0YWNobWVudHM6IGF0dGFjaG1lbnRzLFxuXHRcdFx0fSxmdW5jdGlvbihlcnIscmVzcCkge1xuXHRcdFx0XHRjb25zb2xlLmxvZyhlcnIscmVzcCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fSk7XG5cblx0d2l0Ym90LmhlYXJzKCdpbnN1bHQnLCAwLjcsIGZ1bmN0aW9uKGJvdCxtZXNzYWdlLG91dGNvbWUpe1xuXHRcdGNvbnNvbGUubG9nKFwiWU9VIElOU1VMVEVEIE1FIVwiKTtcblx0XHRib3QucmVwbHkobWVzc2FnZSwgXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PUtXemE1UFFBNVpjXCIpO1xuXHR9KTtcblxuXHR3aXRib3QuaGVhcnMoJ2pva2UnLCAwLjUsIGZ1bmN0aW9uKGJvdCwgbWVzc2FnZSwgb3V0Y29tZSl7XG5cdFx0Y29uc29sZS5sb2coXCJIZXJlJ3MgeW91ciBqb2tlXCIpO1xuXHRcdGJvdC5yZXBseShtZXNzYWdlLCBcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9SXQzRFUySE1iYVlcIik7XG5cdH0pO1xuXG5cdHdpdGJvdC5oZWFycygnY2FuYWRhJywgMC41LCBmdW5jdGlvbihib3QsbWVzc2FnZSxvdXRjb21lKXtcblx0XHRib3QucmVwbHkobWVzc2FnZSwgXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PXBGQ2Q0Wk9UVmc0XCIpO1xuXHR9KTtcblxuXHR3aXRib3QuaGVhcnMoJ2ppbW15JywgMC4zLCBmdW5jdGlvbihib3QsIG1lc3NhZ2UsIG91dGNvbWUpe1xuXHRcdGJvdC5yZXBseShtZXNzYWdlLCBcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9Y1RsNzYyTXVYeWNcIik7XG5cdH0pO1xuXG5cdHdpdGJvdC5oZWFycygnYnJvd25iYWcnLCAwLjQsIGZ1bmN0aW9uKGJvdCxtZXNzYWdlLG91dGNvbWUpe1xuXHRcdGJvdC5yZXBseShtZXNzYWdlLFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1lUGtQWUE0QVEzb1wiKTtcblx0fSk7XG5cblx0d2l0Ym90LmhlYXJzKCdjYWhsYW4nLCAwLjMsIGZ1bmN0aW9uKGJvdCxtZXNzYWdlLG91dGNvbWUpe1xuXHRcdGJvdC5yZXBseShtZXNzYWdlLCBcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9SG1xQ0RncjN5UWdcIik7XG5cdH0pO1xuXG4gICAgd2l0Ym90LmhlYXJzKCd3aWxzb24nLCAwLjMsIGZ1bmN0aW9uKGJvdCxtZXNzYWdlLG91dGNvbWUpe1xuXHRcdGJvdC5yZXBseShtZXNzYWdlLCBcImh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9M2dOcmtnd1M2YU1cIik7XG5cdH0pO1xuXG4gICAgd2l0Ym90LmhlYXJzKCdwcm9qZWN0c19kdWVfdGhpc19tb250aCcsIDAuOCwgZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSwgb3V0Y29tZSkge1xuXHRcdGNvbnNvbGUubG9nKFwiSSdtIHRyeWluZyB0byBnZXQgYWxsIHByb2plY3RzIGR1ZSB0aGlzIG1vbnRoIVwiKTtcblx0XHRib3RIZWxwZXIucHJvamVjdHNEdWVUaGlzTW9udGgoKVxuXHRcdC50aGVuKChwcm9qZWN0RGV0YWlscykgPT4ge1xuXHRcdFx0dmFyIHRpdGxlID0gXCJIZXJlJ3MgYWxsIHRoZSBwcm9qZWN0cyBkdWUgdGhpcyBtb250aC4uLlwiO1xuXHRcdFx0Y29uc29sZS5sb2coXCJIZXJlJ3MgYWxsIHRoZSBwcm9qZWN0cyBkdWUgdGhpcyBtb250aC4uLi5cIiwgcHJvamVjdERldGFpbHMpO1xuXHRcdFx0cmV0dXJuIGJvdEhlbHBlci5wcm9qZWN0c0F0dGFjaG1lbnQocHJvamVjdERldGFpbHMsIHRpdGxlKTtcblx0XHR9KVxuXHRcdC50aGVuKChhdHRhY2htZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnSEVMTE8nLCBhdHRhY2htZW50KTtcblx0XHRcdHZhciBhdHRhY2htZW50cyA9IFtdO1xuXHRcdFx0YXR0YWNobWVudHMucHVzaChhdHRhY2htZW50KTtcblx0XHRcdGJvdC5yZXBseShtZXNzYWdlLHtcblx0XHRcdFx0Ly8gdGV4dDogJyAnLFxuXHRcdFx0XHRhdHRhY2htZW50czogYXR0YWNobWVudHMsXG5cdFx0XHR9LGZ1bmN0aW9uKGVycixyZXNwKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycixyZXNwKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9KTtcblxuICAgIHdpdGJvdC5oZWFycygncHJvamVjdHNfZHVlX3RoaXNfd2VlaycsIDAuOCwgZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSwgb3V0Y29tZSkge1xuXHRcdGNvbnNvbGUubG9nKFwiSSdtIHRyeWluZyB0byBnZXQgYWxsIHByb2plY3RzIGR1ZSB0aGlzIHdlZWshXCIpO1xuXHRcdGJvdEhlbHBlci5wcm9qZWN0c0R1ZVRoaXNXZWVrKClcblx0XHQudGhlbigocHJvamVjdERldGFpbHMpID0+IHtcblx0XHRcdHZhciB0aXRsZSA9IFwiSGVyZSdzIGFsbCB0aGUgcHJvamVjdHMgZHVlIHRoaXMgd2Vlay4uLlwiO1xuXHRcdFx0Y29uc29sZS5sb2coXCJIZXJlJ3MgYWxsIHRoZSBwcm9qZWN0cyBkdWUgdGhpcyB3ZWVrLi4uLlwiLCBwcm9qZWN0RGV0YWlscyk7XG5cdFx0XHRyZXR1cm4gYm90SGVscGVyLnByb2plY3RzQXR0YWNobWVudChwcm9qZWN0RGV0YWlscywgdGl0bGUpO1xuXHRcdH0pXG5cdFx0LnRoZW4oKGF0dGFjaG1lbnQpID0+IHtcblx0XHRcdHZhciBhdHRhY2htZW50cyA9IFtdO1xuXHRcdFx0YXR0YWNobWVudHMucHVzaChhdHRhY2htZW50KTtcblx0XHRcdGJvdC5yZXBseShtZXNzYWdlLHtcblx0XHRcdFx0Ly8gdGV4dDogJyAnLFxuXHRcdFx0XHRhdHRhY2htZW50czogYXR0YWNobWVudHMsXG5cdFx0XHR9LGZ1bmN0aW9uKGVycixyZXNwKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycixyZXNwKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9KTtcblxuICAgIHdpdGJvdC5oZWFycygncHJvamVjdHNfZHVlX3RvZGF5JywgMC44LCBmdW5jdGlvbiAoYm90LCBtZXNzYWdlLCBvdXRjb21lKSB7XG5cdFx0Y29uc29sZS5sb2coXCJJJ20gdHJ5aW5nIHRvIGdldCBhbGwgcHJvamVjdHMgZHVlIHRvZGF5IVwiKTtcblx0XHRib3RIZWxwZXIucHJvamVjdHNEdWVUb2RheSgpXG5cdFx0LnRoZW4oKHByb2plY3REZXRhaWxzKSA9PiB7XG5cdFx0XHR2YXIgdGl0bGUgPSBcIkhlcmUncyBhbGwgdGhlIHByb2plY3RzIGR1ZSB0b2RheS4uLlwiO1xuXHRcdFx0Y29uc29sZS5sb2coXCJIZXJlJ3MgYWxsIHRoZSBwcm9qZWN0cyBkdWUgdG9kYXkuLi4uXCIsIHByb2plY3REZXRhaWxzKTtcblx0XHRcdHJldHVybiBib3RIZWxwZXIucHJvamVjdHNBdHRhY2htZW50KHByb2plY3REZXRhaWxzLCB0aXRsZSk7XG5cdFx0fSlcblx0XHQudGhlbigoYXR0YWNobWVudCkgPT4ge1xuXHRcdFx0dmFyIGF0dGFjaG1lbnRzID0gW107XG5cdFx0XHRhdHRhY2htZW50cy5wdXNoKGF0dGFjaG1lbnQpO1xuXHRcdFx0Ym90LnJlcGx5KG1lc3NhZ2Use1xuXHRcdFx0XHQvLyB0ZXh0OiAnICcsXG5cdFx0XHRcdGF0dGFjaG1lbnRzOiBhdHRhY2htZW50cyxcblx0XHRcdH0sZnVuY3Rpb24oZXJyLHJlc3ApIHtcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyLHJlc3ApO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0pO1xuXG5cdC8qKioqKioqKioqKioqKioqKiogUFJPSkVDVCBUQVNLUyAqKioqKioqKioqKioqKioqKiovXG5cdHdpdGJvdC5oZWFycygnYWxsX3Rhc2tzJywwLjgsIGZ1bmN0aW9uKGJvdCxtZXNzYWdlLGNvdXRjb21lKXtcblx0XHRib3RIZWxwZXIuYWxsUHJvamVjdFRhc2tzKClcblx0XHQudGhlbigodGFza3MpID0+e1xuXHRcdFx0Ly8gY29uc29sZS5sb2coXCJIZXJlIGFyZSB0aGUgdGFza3MgSSBnb3QgYmFjayFcIix0YXNrcyk7XG5cdFx0XHR2YXIgdGl0bGUgPSBcIkhlcmUncyBhbGwgdGhlIHRhc2tzIEkgY291bGQgZmluZC4uLlwiO1xuXHRcdFx0cmV0dXJuIGJvdEhlbHBlci50YXNrQXR0YWNobWVudCh0YXNrcywgdGl0bGUpO1xuXHRcdH0pXG5cdFx0LnRoZW4oKGF0dGFjaG1lbnQpID0+IHtcblx0XHRcdHZhciBhdHRhY2htZW50cyA9IFtdO1xuXHRcdFx0YXR0YWNobWVudHMucHVzaChhdHRhY2htZW50KTtcblx0XHRcdGJvdC5yZXBseShtZXNzYWdlLHtcblx0XHRcdFx0Ly8gdGV4dDogJyAnLFxuXHRcdFx0XHRhdHRhY2htZW50czogYXR0YWNobWVudHMsXG5cdFx0XHR9LGZ1bmN0aW9uKGVycixyZXNwKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycixyZXNwKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9KTtcblxuICAgIHdpdGJvdC5oZWFycygnYWxsX2luY29tcGxldGVfdGFza3MnLCAwLjIsIGZ1bmN0aW9uIChib3QsIG1lc3NhZ2UsIG91dGNvbWUpIHtcblx0XHRjb25zb2xlLmxvZyhcIkknbSB0cnlpbmcgdG8gZ2V0IGFsbCBpbmNvbXBsZXRlIHRhc2tzIVwiKTtcblx0XHRib3RIZWxwZXIuYWxsSW5jb21wbGV0ZVRhc2tzKClcblx0XHQudGhlbigoaW5jb21wbGV0ZVRhc2tzKSA9PiB7XG5cdFx0XHR2YXIgdGl0bGUgPSBcIkhlcmUncyBhbGwgdGhlIGluY29tcGxldGUgdGFza3MgSSBjb3VsZCBmaW5kLi4uXCI7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkhlcmUncyBhbGwgdGhlIGluY29tcGxldGUgdGFza3MgSSByZXR1cm5lZC4uLi5cIiwgaW5jb21wbGV0ZVRhc2tzKTtcblx0XHRcdHJldHVybiBib3RIZWxwZXIudGFza0F0dGFjaG1lbnQoaW5jb21wbGV0ZVRhc2tzLCB0aXRsZSk7XG5cdFx0fSlcblx0XHQudGhlbigoYXR0YWNobWVudCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0FUVEFDSE1FTlQnLCBhdHRhY2htZW50KTtcblx0XHRcdHZhciBhdHRhY2htZW50cyA9IFtdO1xuXHRcdFx0YXR0YWNobWVudHMucHVzaChhdHRhY2htZW50KTtcblx0XHRcdGJvdC5yZXBseShtZXNzYWdlLHtcblx0XHRcdFx0Ly8gdGV4dDogJyAnLFxuXHRcdFx0XHRhdHRhY2htZW50czogYXR0YWNobWVudHMsXG5cdFx0XHR9LGZ1bmN0aW9uKGVycixyZXNwKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycixyZXNwKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9KTtcblxuICAgIHdpdGJvdC5oZWFycygnb3ZlcmR1ZV90YXNrcycsIDAuOCwgZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSwgb3V0Y29tZSkge1xuXHRcdGNvbnNvbGUubG9nKFwiSSdtIHRyeWluZyB0byBnZXQgYWxsIG92ZXJkdWUgdGFza3MhXCIpO1xuXHRcdGJvdEhlbHBlci5vdmVyZHVlVGFza3MoKVxuXHRcdC50aGVuKChwcm9qZWN0RGV0YWlscykgPT4ge1xuXHRcdFx0dmFyIHRpdGxlID0gXCJIZXJlJ3MgYWxsIHRoZSBvdmVyZHVlIHRhc2tzIEkgY291bGQgZmluZC4uLlwiO1xuXHRcdFx0Y29uc29sZS5sb2coXCJIZXJlJ3MgYWxsIHRoZSBvdmVyZHVlIHRhc2tzIEkgcmV0dXJuZWQuLi4uXCIsIHByb2plY3REZXRhaWxzKTtcblx0XHRcdHJldHVybiBib3RIZWxwZXIucHJvamVjdHNBdHRhY2htZW50KHByb2plY3REZXRhaWxzLCB0aXRsZSk7XG5cdFx0fSlcbiAgICAgICAgLnRoZW4oKHRhc2tOYW1lcykgPT4ge1xuXHRcdFx0Ly8gY29uc29sZS5sb2coXCJIZXJlJ3MgdGhlIHJldHVybmVkIHByb21pc2UuLi5cIiwgdGFza05hbWVzKTtcblx0XHRcdHZhciB0aXRsZSA9IFwiSGVyZSdzIGFsbCB0aGUgb3ZlcmR1ZSB0YXNrcyBJIGNvdWxkIGZpbmQuLi5cIjtcblx0XHRcdHJldHVybiBib3RIZWxwZXIuYXR0YWNobWVudE1ha2VyKHRhc2tOYW1lcywgdGl0bGUpO1xuXHRcdH0pXG5cdFx0LnRoZW4oKGF0dGFjaG1lbnQpID0+IHtcblx0XHRcdHZhciBhdHRhY2htZW50cyA9IFtdO1xuXHRcdFx0YXR0YWNobWVudHMucHVzaChhdHRhY2htZW50KTtcblx0XHRcdGJvdC5yZXBseShtZXNzYWdlLHtcblx0XHRcdFx0Ly8gdGV4dDogJyAnLFxuXHRcdFx0XHRhdHRhY2htZW50czogYXR0YWNobWVudHMsXG5cdFx0XHR9LGZ1bmN0aW9uKGVycixyZXNwKSB7XG5cdFx0XHRcdGNvbnNvbGUubG9nKGVycixyZXNwKTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9KTtcblxuXG4gXHR3aXRib3QuaGVhcnMoJ3Rhc2tfY29tcGxldGUnLCAwLjgsIGZ1bmN0aW9uIChib3QsIG1lc3NhZ2UsIG91dGNvbWUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJJJ20gdHJ5aW5nIHRvIGNoYW5nZSB0aGUgdGFzayBzdGF0dXMgdG8gY29tcGxldGUuLi5cIik7XG4gICAgICAgIHZhciB0YXNraWQgPSBvdXRjb21lLmVudGl0aWVzLnRhc2tfaWRbMF0udmFsdWU7XG4gICAgICAgIHZhciBuZXdDbGVhbklkO1xuICAgICAgICB2YXIgcHJvamVjdElkUmVmO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRBU0sgSURcIiwgdGFza2lkKVxuXHRcdHJldHVybiBib3RIZWxwZXIuaGFzaFN0cmlwcGVyKHRhc2tpZClcbiAgICAgICAgLnRoZW4oKGNsZWFuSWQpID0+IHtcblx0XHRcdGNvbnNvbGUubG9nKFwiSGVyZSdzIHRoZSBjbGVhbiBJRCBJIG1hZGVcIiwgY2xlYW5JZCk7XG4gICAgICAgICAgICBuZXdDbGVhbklkID0gY2xlYW5JZDtcblx0XHRcdHJldHVybiBib3RIZWxwZXIuc3RhdHVzQ2hlY2soY2xlYW5JZCk7XG4gICAgICAgIH0pXG5cdFx0LnRoZW4oKHRhc2spID0+IHtcbiAgICAgICAgICAgIGlmICghdGFzaykge1xuICAgICAgICAgICAgICAgIGJvdC5yZXBseShtZXNzYWdlLCBcIlRhc2sgaGFzIGFscmVhZHkgYmVlbiBjb21wbGV0ZWQuXCIpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHByb2plY3RJZFJlZiA9IHRhc2tbMF0uYXNzb2NpYXRlZFByb2plY3Q7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJvdEhlbHBlci50YXNrQ29tcGxldGUobmV3Q2xlYW5JZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCh0YXNrKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkhlcmUncyB0aGUgcmV0dXJuZWQgcHJvbWlzZS4uLlwiLCB0YXNrKTtcblx0XHRcdHZhciB0aXRsZSA9IFwiSGVyZSdzIHRoZSB0YXNrLi4uXCI7XG5cdFx0XHRyZXR1cm4gYm90SGVscGVyLnRhc2tBdHRhY2htZW50KFt0YXNrXSwgdGl0bGUpO1xuXHRcdH0pXG5cdFx0LnRoZW4oKGF0dGFjaG1lbnQpID0+IHtcbiAgICAgICAgICAgIHZhciBkZWZlcnJlZCA9IFEuZGVmZXIoKTtcblx0XHRcdHZhciBhdHRhY2htZW50cyA9IFtdO1xuXHRcdFx0YXR0YWNobWVudHMucHVzaChhdHRhY2htZW50KTtcblx0XHRcdGRlZmVycmVkLnJlc29sdmUoYm90LnJlcGx5KG1lc3NhZ2Use1xuXHRcdFx0XHQvLyB0ZXh0OiAnICcsXG5cdFx0XHRcdGF0dGFjaG1lbnRzOiBhdHRhY2htZW50cyxcblx0XHRcdH0sZnVuY3Rpb24oZXJyLHJlc3ApIHtcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyLHJlc3ApO1xuXHRcdFx0fSkpO1xuICAgICAgICAgICAgcmV0dXJuIGRlZmVycmVkLnByb21pc2U7XG5cdFx0fSlcbiAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGJvdEhlbHBlci50YXNrQ29tcGxldGVDb3VudChwcm9qZWN0SWRSZWYpO1xuICAgICAgICB9KTtcbiBcdH0pO1xuXG4gICAgLyoqKioqKioqKioqKioqKioqKiBJTkNPTVBMRVRFIFBST0pFQ1RTICoqKioqKioqKioqKioqKioqKi9cblxuXHR3aXRib3QuaGVhcnMoJ2luY29tcGxldGVfcHJvamVjdHMnLCAwLjgsIGZ1bmN0aW9uIChib3QsIG1lc3NhZ2UsIG91dGNvbWUpIHtcblx0XHRjb25zb2xlLmxvZyhcIkknbSB0cnlpbmcgdG8gZ2V0IGluY29tcGxldGUgcHJvamVjdHMhXCIpO1xuXHRcdGJvdEhlbHBlci5hbGxJbmNvbXBsZXRlUHJvamVjdHMoKVxuXHRcdC50aGVuKChwcm9qZWN0RGV0YWlscykgPT4ge1xuXHRcdFx0dmFyIHRpdGxlID0gXCJIZXJlJ3MgYWxsIHRoZSBpbmNvbXBsZXRlIHByb2plY3RzIEkgY291bGQgZmluZC4uLlwiO1xuXHRcdFx0Y29uc29sZS5sb2coXCJIZXJlJ3MgYWxsIHRoZSBpbmNvbXBsZXRlIHByb2plY3RzIEkgcmV0dXJuZWQuLi4uXCIsIHByb2plY3REZXRhaWxzKTtcblx0XHRcdHJldHVybiBib3RIZWxwZXIucHJvamVjdHNBdHRhY2htZW50KHByb2plY3REZXRhaWxzLCB0aXRsZSk7XG5cdFx0fSlcblx0XHQudGhlbigoYXR0YWNobWVudCkgPT4ge1xuXHRcdFx0dmFyIGF0dGFjaG1lbnRzID0gW107XG5cdFx0XHRhdHRhY2htZW50cy5wdXNoKGF0dGFjaG1lbnQpO1xuXHRcdFx0Ym90LnJlcGx5KG1lc3NhZ2Use1xuXHRcdFx0XHQvLyB0ZXh0OiAnICcsXG5cdFx0XHRcdGF0dGFjaG1lbnRzOiBhdHRhY2htZW50cyxcblx0XHRcdH0sZnVuY3Rpb24oZXJyLHJlc3ApIHtcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyLHJlc3ApO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0pO1xuXG4gICAgLyoqKioqKioqKioqKioqKioqKiBDT01QTEVURSBQUk9KRUNUUyAqKioqKioqKioqKioqKioqKiovXG5cblx0d2l0Ym90LmhlYXJzKCdjb21wbGV0ZV9wcm9qZWN0cycsIDAuOCwgZnVuY3Rpb24gKGJvdCwgbWVzc2FnZSwgb3V0Y29tZSkge1xuXHRcdGNvbnNvbGUubG9nKFwiSSdtIHRyeWluZyB0byBnZXQgY29tcGxldGUgcHJvamVjdHMhXCIpO1xuXHRcdGJvdEhlbHBlci5hbGxDb21wbGV0ZVByb2plY3RzKClcblx0XHQudGhlbigocHJvamVjdERldGFpbHMpID0+IHtcblx0XHRcdHZhciB0aXRsZSA9IFwiSGVyZSdzIGFsbCB0aGUgY29tcGxldGUgcHJvamVjdHMgSSBjb3VsZCBmaW5kLi4uXCI7XG5cdFx0XHRjb25zb2xlLmxvZyhcIkhlcmUncyBhbGwgdGhlIGNvbXBsZXRlIHByb2plY3RzIEkgcmV0dXJuZWQuLi4uXCIsIHByb2plY3REZXRhaWxzKTtcblx0XHRcdHJldHVybiBib3RIZWxwZXIucHJvamVjdHNBdHRhY2htZW50KHByb2plY3REZXRhaWxzLCB0aXRsZSk7XG5cdFx0fSlcblx0XHQudGhlbigoYXR0YWNobWVudCkgPT4ge1xuXHRcdFx0dmFyIGF0dGFjaG1lbnRzID0gW107XG5cdFx0XHRhdHRhY2htZW50cy5wdXNoKGF0dGFjaG1lbnQpO1xuXHRcdFx0Ym90LnJlcGx5KG1lc3NhZ2Use1xuXHRcdFx0XHQvLyB0ZXh0OiAnICcsXG5cdFx0XHRcdGF0dGFjaG1lbnRzOiBhdHRhY2htZW50cyxcblx0XHRcdH0sZnVuY3Rpb24oZXJyLHJlc3ApIHtcblx0XHRcdFx0Y29uc29sZS5sb2coZXJyLHJlc3ApO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH0pO1xuXG5cbiBtb2R1bGUuZXhwb3J0cyA9IHtcblxuIH07XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

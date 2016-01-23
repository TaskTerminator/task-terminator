
const mongoose = require('mongoose');
const Botkit = require('botkit');
const Q = require('q');
const positions = require('../controllers/positionCtrl.js');
const botHelper = require('../controllers/slackBotHelpers.js');
const Witbot = require('witbot');

const controller = Botkit.slackbot({
	  debug: false
	});

 // connect the bot to a stream of messages
 controller.spawn({
 	//DevMtn Token
   // token: 'xoxb-18104911812-lrix7VmoDeWSS4PTA8SxNFnN',
 	//Our Slack Token
 	token: 'xoxb-19173759013-cGyV554J5XzYpOvptXNBWh53',
 }).startRTM(function(err) {
   if (err) {
     throw new Error(err);
   }
 });

	//LINK THE BOT TO WIT.AI
	const witbot = Witbot("CZPINC6EVOQ7DCPZSUUBQ3B5GWQVOQ66"
	);


	/****************** BOT SPECIFIC COMMANDS ******************/
	//wire up DM's and direct mentions to wit.ai
	controller.hears('.*', 'direct_message,direct_mention', function (bot, message) {
		witbot.process(message.text, bot, message);
	});

	witbot.hears('help', 0.5, function (bot, message, outcome) {
		var title = " ";
		var botSkillz = [
			"show roles",
			"Forgot a job title? Here's all of em for your company!",
			'show departments',
			"All the departments. All of em. ",
			'show employees',
			"Don't forget that guy in accounting's name. Find him here!",
			'show projects',
			"Just a list of every open project in your company. Now get working. ",
			"help",
			"Tells you all about my magic powers.",
		];
		botHelper.helpAttachment(botSkillz,title)
		.then((attachment) => {
			var attachments = [];
			attachments.push(attachment);
			bot.reply(message,{
				// text: ' ',
				attachments: attachments,
			},function(err,resp) {
				console.log(err,resp);
			});
		});
	});

	witbot.otherwise(function (bot, message) {
		var title = " ";
		var botSkillz = [
			"show roles",
			"Forgot a job title? Here's all of em for your company!",
			'show departments',
			"All the departments. All of em. ",
			'show employees',
			"Don't forget that guy in accounting's name. Find him here!",
			'show projects',
			"Just a list of every open project in your company. Now get working. ",
			"help",
			"Tells you all about my magic powers.",
		];
		botHelper.helpAttachment(botSkillz,title)
		.then((attachment) => {
			var attachments = [];
			attachments.push(attachment);
			bot.reply(message,{
				// text: ' ',
				attachments: attachments,
			},function(err,resp) {
				console.log(err,resp);
			});
		});
	});

	controller.hears(['dm me'],['direct_message','direct_mention'],function(bot,message) {
		bot.startConversation(message,function(err,convo) {
			convo.say('Heard ya');
		});

		bot.startPrivateConversation(message,function(err,dm) {
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
		botHelper.allDepartments()
		.then((departments) =>{
			return botHelper.arrayMaker(departments);
		})
		.then((departmentNames) => {
			var title = "Here's all the departments I could find...";
			return botHelper.attachmentMaker(departmentNames, title);
		})
		.then((attachment) => {
			var attachments = [];
			attachments.push(attachment);
			bot.reply(message,{
				// text: ' ',
				attachments: attachments,
			},function(err,resp) {
				console.log(err,resp);
			});
		});
	});

	/****************** EMPLOYEES ******************/
	witbot.hears('all_employees', 0.8, function (bot, message, outcome) {
		console.log(outcome);
		botHelper.allEmployees()
		.then((employees) =>{
			return botHelper.arrayMakerEmployeeName(employees);
		})
		.then((employeeNames) => {
			console.log("Here's the returned promise...", employeeNames);
			var title = "Here's all the employees I could find...";
			return botHelper.attachmentMaker(employeeNames, title);
		})
		.then((attachment) => {
			var attachments = [];
			attachments.push(attachment);
			bot.reply(message,{
				// text: ' ',
				attachments: attachments,
			},function(err,resp) {
				console.log(err,resp);
			});
		});
	});


	/****************** POSITIONS ******************/
	witbot.hears('all_positions', 0.8, function (bot, message, outcome) {
		botHelper.allPositions()
		.then((positions) =>{
			return botHelper.arrayMaker(positions);
		})
		.then((positionNames) => {
			var title = "Here's all the positions I could find...";
			return botHelper.attachmentMaker(positionNames, title);
		})
		.then((attachment) => {
			var attachments = [];
			attachments.push(attachment);
			bot.reply(message,{
				// text: ' ',
				attachments: attachments,
			},function(err,resp) {
				console.log(err,resp);
			});
		});
	});

	/****************** PROJECTS ******************/
	witbot.hears('all_projects', 0.8, function (bot, message, outcome) {
		console.log("I'm trying to get projects!");
		botHelper.allProjects()
		.then((projectDetails) => {
			var title = "Here's all the projects I could find...";
			console.log("Here's all the projects I returned....", projectDetails);
			return botHelper.projectsAttachment(projectDetails, title);
		})
		.then((attachment) => {
			var attachments = [];
			attachments.push(attachment);
			bot.reply(message,{
				// text: ' ',
				attachments: attachments,
			},function(err,resp) {
				console.log(err,resp);
			});
		});
	});

	witbot.hears('tasks_in_project', 0.3, function(bot,message, outcome){
		console.log("this is what WIT.AI returned", outcome.entities.project_id);
		console.log("this is what WIT.AI returned", outcome.entities.project_id[0].value);
		var title = "Here are the tasks for project - " + outcome.entities.project_id[0].value;
		var projectId = outcome.entities.project_id[0].value;
		return botHelper.hashStripper(projectId)
		.then((cleanId) => {
			console.log("Here's the clean ID I made", cleanId);
			return botHelper.tasksInProject(cleanId);
		})
		.then((project) => {
			console.log("WHat we gotz back", project[0].tasks);
			var array = project[0].tasks;
			console.log("Here's the tasks associated with that project", array);
			return botHelper.taskAttachment(array,title);
		})
		.then((attachment)=> {
			var attachments = [];
			attachments.push(attachment);
			bot.reply(message,{
				// text: ' ',
				attachments: attachments,
			},function(err,resp) {
				console.log(err,resp);
			});
		});

		// bot.reply(message, "Let me get those tasks for you!");
	});

	witbot.hears('overdue_projects', 0.8, function (bot, message, outcome) {
		console.log("I'm trying to get all overdue projects!");
		botHelper.overdueProjects()
		.then((projectDetails) => {
			var title = "Here's all the overdue projects I could find...";
			console.log("Here's all the overdue projects I returned....", projectDetails);
			return botHelper.projectsAttachment(projectDetails, title);
		})
		.then((attachment) => {
			var attachments = [];
			attachments.push(attachment);
			bot.reply(message,{
				// text: ' ',
				attachments: attachments,
			},function(err,resp) {
				console.log(err,resp);
			});
		});
	});

	witbot.hears('insult', 0.7, function(bot,message,outcome){
		console.log("YOU INSULTED ME!");
		bot.reply(message, "https://www.youtube.com/watch?v=KWza5PQA5Zc");
	});

	witbot.hears('joke', 0.5, function(bot, message, outcome){
		console.log("Here's your joke");
		bot.reply(message, "https://www.youtube.com/watch?v=It3DU2HMbaY");
	});

	witbot.hears('canada', 0.5, function(bot,message,outcome){
		bot.reply(message, "https://www.youtube.com/watch?v=pFCd4ZOTVg4");
	});

	witbot.hears('jimmy', 0.3, function(bot, message, outcome){
		bot.reply(message, "https://www.youtube.com/watch?v=cTl762MuXyc");
	});

	witbot.hears('brownbag', 0.4, function(bot,message,outcome){
		bot.reply(message,"https://www.youtube.com/watch?v=ePkPYA4AQ3o");
	});

	witbot.hears('cahlan', 0.3, function(bot,message,outcome){
		bot.reply(message, "https://www.youtube.com/watch?v=HmqCDgr3yQg");
	});

    witbot.hears('wilson', 0.3, function(bot,message,outcome){
		bot.reply(message, "https://www.youtube.com/watch?v=3gNrkgwS6aM");
	});

    witbot.hears('projects_due_this_month', 0.8, function (bot, message, outcome) {
		console.log("I'm trying to get all projects due this month!");
		botHelper.projectsDueThisMonth()
		.then((projectDetails) => {
			var title = "Here's all the projects due this month...";
			console.log("Here's all the projects due this month....", projectDetails);
			return botHelper.projectsAttachment(projectDetails, title);
		})
		.then((attachment) => {
            console.log('HELLO', attachment);
			var attachments = [];
			attachments.push(attachment);
			bot.reply(message,{
				// text: ' ',
				attachments: attachments,
			},function(err,resp) {
				console.log(err,resp);
			});
		});
	});

    witbot.hears('projects_due_this_week', 0.8, function (bot, message, outcome) {
		console.log("I'm trying to get all projects due this week!");
		botHelper.projectsDueThisWeek()
		.then((projectDetails) => {
			var title = "Here's all the projects due this week...";
			console.log("Here's all the projects due this week....", projectDetails);
			return botHelper.projectsAttachment(projectDetails, title);
		})
		.then((attachment) => {
			var attachments = [];
			attachments.push(attachment);
			bot.reply(message,{
				// text: ' ',
				attachments: attachments,
			},function(err,resp) {
				console.log(err,resp);
			});
		});
	});

    witbot.hears('projects_due_today', 0.8, function (bot, message, outcome) {
		console.log("I'm trying to get all projects due today!");
		botHelper.projectsDueToday()
		.then((projectDetails) => {
			var title = "Here's all the projects due today...";
			console.log("Here's all the projects due today....", projectDetails);
			return botHelper.projectsAttachment(projectDetails, title);
		})
		.then((attachment) => {
			var attachments = [];
			attachments.push(attachment);
			bot.reply(message,{
				// text: ' ',
				attachments: attachments,
			},function(err,resp) {
				console.log(err,resp);
			});
		});
	});

	/****************** PROJECT TASKS ******************/
	witbot.hears('all_tasks',0.8, function(bot,message,coutcome){
		botHelper.allProjectTasks()
		.then((tasks) =>{
			// console.log("Here are the tasks I got back!",tasks);
			var title = "Here's all the tasks I could find...";
			return botHelper.taskAttachment(tasks, title);
		})
		.then((attachment) => {
			var attachments = [];
			attachments.push(attachment);
			bot.reply(message,{
				// text: ' ',
				attachments: attachments,
			},function(err,resp) {
				console.log(err,resp);
			});
		});
	});

    witbot.hears('all_incomplete_tasks', 0.2, function (bot, message, outcome) {
		console.log("I'm trying to get all incomplete tasks!");
		botHelper.allIncompleteTasks()
		.then((incompleteTasks) => {
			var title = "Here's all the incomplete tasks I could find...";
			console.log("Here's all the incomplete tasks I returned....", incompleteTasks);
			return botHelper.taskAttachment(incompleteTasks, title);
		})
		.then((attachment) => {
            console.log('ATTACHMENT', attachment);
			var attachments = [];
			attachments.push(attachment);
			bot.reply(message,{
				// text: ' ',
				attachments: attachments,
			},function(err,resp) {
				console.log(err,resp);
			});
		});
	});

    witbot.hears('overdue_tasks', 0.8, function (bot, message, outcome) {
		console.log("I'm trying to get all overdue tasks!");
		botHelper.overdueTasks()
		.then((projectDetails) => {
			var title = "Here's all the overdue tasks I could find...";
			console.log("Here's all the overdue tasks I returned....", projectDetails);
			return botHelper.projectsAttachment(projectDetails, title);
		})
        .then((taskNames) => {
			// console.log("Here's the returned promise...", taskNames);
			var title = "Here's all the overdue tasks I could find...";
			return botHelper.attachmentMaker(taskNames, title);
		})
		.then((attachment) => {
			var attachments = [];
			attachments.push(attachment);
			bot.reply(message,{
				// text: ' ',
				attachments: attachments,
			},function(err,resp) {
				console.log(err,resp);
			});
		});
	});


 	witbot.hears('task_complete', 0.8, function (bot, message, outcome) {
        console.log("I'm trying to change the task status to complete...");
        var taskid = outcome.entities.task_id[0].value;
        console.log("TASK ID", taskid)
		return botHelper.hashStripper(taskid)
		.then((cleanId) => {
			console.log("Here's the clean ID I made", cleanId);
			return botHelper.taskComplete(cleanId);
        })
        .then((task) => {
            console.log("Here's the returned promise...", task);
			var title = "Here's the task...";
			return botHelper.taskAttachment([task], title);
		})
		.then((attachment) => {
			var attachments = [];
			attachments.push(attachment);
			bot.reply(message,{
				// text: ' ',
				attachments: attachments,
			},function(err,resp) {
				console.log(err,resp);
			});
		});
 	});

    /****************** INCOMPLETE PROJECTS ******************/

	witbot.hears('incomplete_projects', 0.8, function (bot, message, outcome) {
		console.log("I'm trying to get incomplete projects!");
		botHelper.allIncompleteProjects()
		.then((projectDetails) => {
			var title = "Here's all the incomplete projects I could find...";
			console.log("Here's all the incomplete projects I returned....", projectDetails);
			return botHelper.projectsAttachment(projectDetails, title);
		})
		.then((attachment) => {
			var attachments = [];
			attachments.push(attachment);
			bot.reply(message,{
				// text: ' ',
				attachments: attachments,
			},function(err,resp) {
				console.log(err,resp);
			});
		});
	});

    /****************** COMPLETE PROJECTS ******************/

	witbot.hears('complete_projects', 0.8, function (bot, message, outcome) {
		console.log("I'm trying to get complete projects!");
		botHelper.allCompleteProjects()
		.then((projectDetails) => {
			var title = "Here's all the complete projects I could find...";
			console.log("Here's all the complete projects I returned....", projectDetails);
			return botHelper.projectsAttachment(projectDetails, title);
		})
		.then((attachment) => {
			var attachments = [];
			attachments.push(attachment);
			bot.reply(message,{
				// text: ' ',
				attachments: attachments,
			},function(err,resp) {
				console.log(err,resp);
			});
		});
	});


 module.exports = {

 };

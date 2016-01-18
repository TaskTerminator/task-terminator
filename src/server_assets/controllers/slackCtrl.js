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
	  token: 'xoxb-18104911812-5iVtooMM6dfCQcfyb8W9Rwoc',
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

	witbot.hears('help', 0.2, function (bot, message, outcome) {
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

	witbot.hears('how_are_you', 0.3, function (bot, message, outcome) {
		console.log("WIT.AI Outcome", outcome);
		console.log("WIT.AI Outcome", outcome.entities.greeting);
		bot.reply(message, "I'm great.");
		bot.reply(message, "Better than great.");
		bot.reply(message, "Grand in fact.");
	});

	witbot.hears('greeting', 0.3, function (bot, message, outcome) {
		console.log("WIT.AI Outcome", outcome);
		console.log("WIT.AI Outcome", outcome.entities.greeting);
		bot.reply(message, 'Greetings earthling.');
	});

	/****************** DEPARTMENTS ******************/
	witbot.hears('all_departments', 0.5, function (bot, message, outcome) {
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
	witbot.hears('all_employees', 0.5, function (bot, message, outcome) {
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
	witbot.hears('all_positions', 0.5, function (bot, message, outcome) {
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
	witbot.hears('all_projects', 0.3, function (bot, message, outcome) {
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

	witbot.hears('tasks_in_project', 0.5, function(bot,message, outcome){
		console.log("this is what WIT.AI returned", outcome.entities.project_id);
		console.log("this is what WIT.AI returned", outcome.entities.project_id[0].value);

		var projectId = outcome.entities.project_id[0].value;
		return botHelper.hashStripper(projectId)
		.then((cleanId) => {
			console.log("Here's the clean ID I made", cleanId);
			return botHelper.tasksInProject(cleanId);
		})
		.then((tasks) => {
			console.log("Here's the tasks associated with that project", tasks);
		});

		// bot.reply(message, "Let me get those tasks for you!");
	});

	controller.hears(['show projects', 'projects'],'direct_message,direct_mention,mention',function(bot,message) {
		botHelper.allProjects()
		.then((projects) =>{
			return botHelper.arrayMaker(projects);
		})
		.then((projectNames) => {
			console.log("Here's the returned promise...", projectNames);
			var title = "Here's all the projects I could find...";
			return botHelper.attachmentMaker(projectNames, title);
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
	witbot.hears('all_tasks',0.5, function(bot,message,coutcome){
		botHelper.allProjectTasks()
		.then((tasks) =>{
			// console.log("Here are the tasks I got back!",tasks);
			return botHelper.arrayMaker(tasks);
		})
		.then((taskNames) => {
			// console.log("Here's the returned promise...", taskNames);
			var title = "Here's all the tasks I could find...";
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

	witbot.hears('task_complete', 0.5, function (bot, message, outcome) {
		console.log("WIT.AI Outcome", outcome);

		bot.reply(message, "Way to go brah!");
	});


module.exports = {

};

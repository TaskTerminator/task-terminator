const mongoose = require('mongoose');
const Botkit = require('botkit');
const Q = require('q');
const positions = require('../controllers/positionCtrl.js');
const botHelper = require('../controllers/slackBotHelpers.js');
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

	// give the bot something to listen for.
  controller.hears('show roles','direct_message,direct_mention,mention',function(bot,message) {
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

	controller.hears(['show departments', 'departments'],'direct_message,direct_mention,mention',function(bot,message) {
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

	controller.hears(['show employees', 'employees'],'direct_message,direct_mention,mention',function(bot,message) {
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

	controller.hears(['what can you do', 'help', 'you has skillz'], 'direct_message,direct_mention,mention', function(bot, message){
		var title = "Play around with these commands to see what I can do...";
		var botSkillz = [
			"show roles",
			'show departments',
			'show employees',
			"help"
		];
		botHelper.attachmentMaker(botSkillz,title)
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


	// controller.on('user_typing',function(bot,message) {
	//
  // // controller.hears(["complete","^pattern$"],["direct_message","direct_mention","mention"],function(bot,message) {
	//
  // 	  // do something to respond to message
  // 	  // all of the fields available in a normal Slack message object are available
  // 	  // https://api.slack.com/events/message
  // 	  bot.reply(message,'Type faster!!!!!!!!!!!!!');
	//
  // 	});

module.exports = {




  // getTasks: function(req,res){
  //   console.log('GET - TASKS FOR PROJECT: ', req.params.id);
  //   return res.status(200).end();
  // }

};

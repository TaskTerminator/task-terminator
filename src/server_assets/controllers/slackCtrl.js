const mongoose = require('mongoose');
const Botkit = require('botkit');
const controller = Botkit.slackbot({
	  debug: false
	});

	// connect the bot to a stream of messages
	controller.spawn({
	  token: 'xoxb-18104911812-2VDsYP5U5ntpgdHgOTbmKRaj',
	}).startRTM(function(err) {
    if (err) {
      throw new Error(err);
    }
  });

	// give the bot something to listen for.
	controller.hears('tell me a joke','direct_message,direct_mention,mention',function(bot,message) {
	  bot.reply(message,'No.');
	});

  controller.hears('hello','direct_message,direct_mention,mention',function(bot,message) {
    bot.reply(message,"Hey what's up?");
  });


  controller.hears(['pizzatime'],['ambient','direct_message','direct_mention','mention'],function(bot,message) {
    bot.startConversation(message, askFlavor);
  });

   var askFlavor = function(response, convo) {
    convo.ask("What flavor of pizza do you want?", function(response, convo) {
      convo.say("Awesome.");
      console.log(response);
      askSize(response, convo);
      convo.next();
    });
  };


  var askSize = function(response, convo) {
    convo.ask("What size do you want?", function(response, convo) {
      convo.say("Ok.");
      console.log(response);

      askWhereDeliver(response, convo);
      convo.next();
    });
  };
  var askWhereDeliver = function(response, convo) {
    convo.ask("So where do you want it delivered?", function(response, convo) {
      convo.say("Ok! Good by.");
      console.log(response);

      convo.next();
    });
  };

  controller.hears(['attach'],['direct_message','direct_mention'],function(bot,message) {

    var attachments = [];
    var attachment = {
      title: 'This is an attachment',
      color: '#FFCC99',
      fields: [],
    };

    attachment.fields.push({
      label: 'Field',
      value: 'A longish value',
      short: false,
    });

    attachment.fields.push({
      label: 'Field',
      value: 'Value',
      short: true,
    });

    attachment.fields.push({
      label: 'Field',
      value: 'Value',
      short: true,
    });

    attachments.push(attachment);

    bot.reply(message,{
      text: 'See below...',
      attachments: attachments,
    },function(err,resp) {
      console.log(err,resp);
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



  controller.hears(["complete","^pattern$"],["direct_message","direct_mention","mention"],function(bot,message) {

  	  // do something to respond to message
  	  // all of the fields available in a normal Slack message object are available
  	  // https://api.slack.com/events/message
  	  bot.reply(message,'You used a keyword!');

  	});

module.exports = {




  // getTasks: function(req,res){
  //   console.log('GET - TASKS FOR PROJECT: ', req.params.id);
  //   return res.status(200).end();
  // }

};

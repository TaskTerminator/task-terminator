const mongoose = require('mongoose');
const Position = require('../models/Position.js');

module.exports = {

newPosition: function(req,res){
  console.log("POST - ADD POSITION ENDPOINT");
  return res.status(200).end();
}



};

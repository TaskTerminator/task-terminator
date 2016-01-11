const mongoose = require('mongoose');
const Position = require('../models/Position.js');

module.exports = {

  newPosition: function(req, res) {
    console.log("POST - ADD POSITION ENDPOINT");
    return res.status(200).end();
  },

  onePosition: function(req,res){
    console.log('GET - POSITION ID: ', req.params.id);
    return res.status(200).end();
  },

  editPosition: function(req,res){
    console.log('EDIT - POSITION ID: ', req.params.id);
    return res.status(200).end();
  },

  deletePosition: function(req,res){
    console.log('DELETE - POSITION ID: ', req.params.id);
    return res.status(200).end();
  },

  allPositions: function(req,res){
    console.log("GET - ALL POSITIONS ENDPOINT");
    return res.status(200).end();
  }





};

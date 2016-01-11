const mongoose = require('mongoose');
const Position = require('../models/Position.js');

module.exports = {

  newPosition(req, res) {
    const newPosition = new Position(req.body);
    newPosition.save().then((result) => {
      return res.json(result);
    }).catch((err) => {
      return res.status(500).end();
    });
  },

  onePosition(req,res){
    Position.findById(req.params.id).exec().then((position) => {
      return res.json(position);
    }).catch((err) => {
      return res.status(500).end();
    });
  },

  editPosition(req,res){
    Position.update({_id: req.params.id}, req.body).then(() => {
      return res.status(200).end();
    }).catch((err) => {
      return res.status(500).end();
    });
  },

  deletePosition(req,res){
    Position.remove({_id: req.params.id}, req.body).then(() => {
      return res.status(200).end();
    }).catch((err) => {
      return res.status(500).end();
    });
  },

  allPositions(req,res){
    Position.find().exec().then((positions) => {
      return res.json(positions);
    }).catch((err) => {
      return res.status(500).end();
    });
  }

};

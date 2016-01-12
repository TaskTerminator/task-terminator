const mongoose = require('mongoose');
const Position = require('../models/Position.js');
const Company = require('../models/Company.js');
<<<<<<< HEAD
const Department = require('../models/Department.js');

=======
// <<<<<<< HEAD
const Department = require('../models/Department.js');
// =======
// >>>>>>> origin
>>>>>>> master

module.exports = {

  newPosition(req, res) {
<<<<<<< HEAD
      const newPosition = new Position(req.body);
      Company
        .findOne({
          _id: req.params.companyid
        })
        .exec()
        .then(function(result) {
          result.positions.push(newPosition._id);
          result.save();
        });
      Department
        .findOne({
          _id: req.params.departmentid
        }).exec().then((result) => {
          // console.log("DEPARTMENT", result);
          result.positions.push(newPosition._id);
          result.save();
        });
      newPosition.company = req.params.companyid;
      newPosition.department = req.params.departmentid;
      newPosition.save().then((result) => {
        return res.json(result);
      }).catch((err) => {
        return res.status(500).end();
=======
// <<<<<<< HEAD
    const newPosition = new Position(req.body);
    Company
      .findOne({
        _id: req.params.companyid
      })
      .exec().then((result) => {
        console.log("COMPANY",result);
        result.positions.push(newPosition._id);
      });
    Department
      .findOne({
        _id: req.params.departmentid
      }).exec().then((result) => {
        console.log("DEPARTMENT", result);
        result.positions.push(newPosition._id);
>>>>>>> master
      });
    },

    onePosition(req, res) {
      Position.findById(req.params.id).exec().then((position) => {
        return res.json(position);
      }).catch((err) => {
        return res.status(500).end();
      });
    },

    editPosition(req, res) {
      Position.update({
        _id: req.params.id
      }, req.body).then(() => {
        return res.status(200).end();
      }).catch((err) => {
        return res.status(500).end();
      });
    },

    deletePosition(req, res) {
      Position.remove({
        _id: req.params.id
      }, req.body).then(() => {
        return res.status(200).end();
      }).catch((err) => {
        return res.status(500).end();
      });
    },

    allPositions(req, res) {
      Position.find().exec().then((positions) => {
        return res.json(positions);
      }).catch((err) => {
        return res.status(500).end();
      });
    }

};

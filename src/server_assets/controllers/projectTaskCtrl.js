const mongoose = require('mongoose');
const Project = require('../models/Project.js');


module.exports = {

  getTasks(req, res) {
      Project.findById({_id: req.params.id}).exec().then((result) => {
          return res.json(result.tasks);
      }).catch((err) => {
          return res.status(500).end();
      });
  }

};

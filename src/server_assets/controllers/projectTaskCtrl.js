const mongoose = require('mongoose');
const ProjectTask = require('../models/ProjectTask.js');


module.exports = {

  getTask(req, res) {
      ProjectTask.findById({_id: req.params.id}).exec().then((result) => {
          return res.json(result);
      }).catch((err) => {
          return res.status(500).end();
      });
  }

};

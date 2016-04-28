'use strict';

var mongoose = require('mongoose');
var randomstring = require('randomstring');
var Project = require('../models/Project.js');
var Task = require('../models/ProjectTask');

module.exports = {
    getTasks: function getTasks(req, res) {
        Project.findById({ _id: req.params.id }).exec().then(function (result) {
            return res.json(result.tasks);
        }).catch(function (err) {
            return res.status(500).end();
        });
    },
    addTask: function addTask(req, res) {
        var newTask = new Task(req.body);
        var ID = req.params.projectid;
        newTask.friendlyId = randomstring.generate({ length: 5, readable: true });
        newTask.associatedProject = ID;
        newTask.save().then(function (task) {
            Project.findByIdAndUpdate(ID, { $push: { "tasks": task._id } }).exec();
        }).then(function () {
            return res.status(201).end();
        }).catch(function (err) {
            return res.status(500).end();
        });
    },
    editTask: function editTask(req, res) {
        Project.findByIdAndUpdate(req.params.id, req.body).exec().then(function () {
            return res.status(200).end();
        }).catch(function (err) {
            return res.status(500).end();
        });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNlcnZlcl9hc3NldHMvY29udHJvbGxlcnMvcHJvamVjdFRhc2tDdHJsLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3JDLElBQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM3QyxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUNoRCxJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQzs7QUFHOUMsTUFBTSxDQUFDLE9BQU8sR0FBRztBQUVmLFlBQVEsb0JBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUNmLGVBQU8sQ0FBQyxRQUFRLENBQUMsRUFBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQU0sRUFBSztBQUMzRCxtQkFBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNqQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsR0FBRyxFQUFLO0FBQ2QsbUJBQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNoQyxDQUFDLENBQUM7S0FDTjtBQUVDLFdBQU8sbUJBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUNkLFlBQU0sT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuQyxZQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztBQUNoQyxlQUFPLENBQUMsVUFBVSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0FBQ3hFLGVBQU8sQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7QUFDL0IsZUFBTyxDQUFDLElBQUksRUFBRSxDQUNiLElBQUksQ0FBQyxVQUFDLElBQUksRUFBSztBQUNaLG1CQUFPLENBQUMsaUJBQWlCLENBQUMsRUFBRSxFQUFFLEVBQUMsS0FBSyxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUMsRUFBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUE7U0FDckUsQ0FBQyxDQUNELElBQUksQ0FBQyxZQUFNO0FBQ1IsbUJBQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNoQyxDQUFDLENBQ0QsS0FBSyxDQUFDLFVBQUMsR0FBRyxFQUFLO0FBQ1osbUJBQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNoQyxDQUFDLENBQUM7S0FDTjtBQUVELFlBQVEsb0JBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUNmLGVBQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQ3hELElBQUksQ0FBQyxZQUFNO0FBQ1IsbUJBQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNoQyxDQUFDLENBQ0QsS0FBSyxDQUFDLFVBQUMsR0FBRyxFQUFLO0FBQ1osbUJBQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztTQUNoQyxDQUFDLENBQUM7S0FDTjtDQUVKLENBQUMiLCJmaWxlIjoic2VydmVyX2Fzc2V0cy9jb250cm9sbGVycy9wcm9qZWN0VGFza0N0cmwuanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBtb25nb29zZSA9IHJlcXVpcmUoJ21vbmdvb3NlJyk7XG5jb25zdCByYW5kb21zdHJpbmcgPSByZXF1aXJlKCdyYW5kb21zdHJpbmcnKTtcbmNvbnN0IFByb2plY3QgPSByZXF1aXJlKCcuLi9tb2RlbHMvUHJvamVjdC5qcycpO1xuY29uc3QgVGFzayA9IHJlcXVpcmUoJy4uL21vZGVscy9Qcm9qZWN0VGFzaycpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIGdldFRhc2tzKHJlcSwgcmVzKSB7XG4gICAgICBQcm9qZWN0LmZpbmRCeUlkKHtfaWQ6IHJlcS5wYXJhbXMuaWR9KS5leGVjKCkudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5qc29uKHJlc3VsdC50YXNrcyk7XG4gICAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoNTAwKS5lbmQoKTtcbiAgICAgIH0pO1xuICB9LFxuICAgIFxuICAgIGFkZFRhc2socmVxLCByZXMpIHtcbiAgICAgICAgY29uc3QgbmV3VGFzayA9IG5ldyBUYXNrKHJlcS5ib2R5KTtcbiAgICAgICAgY29uc3QgSUQgPSByZXEucGFyYW1zLnByb2plY3RpZDtcbiAgICAgICAgbmV3VGFzay5mcmllbmRseUlkID0gcmFuZG9tc3RyaW5nLmdlbmVyYXRlKHtsZW5ndGg6IDUsIHJlYWRhYmxlOiB0cnVlfSk7XG4gICAgICAgIG5ld1Rhc2suYXNzb2NpYXRlZFByb2plY3QgPSBJRDtcbiAgICAgICAgbmV3VGFzay5zYXZlKClcbiAgICAgICAgLnRoZW4oKHRhc2spID0+IHtcbiAgICAgICAgICAgIFByb2plY3QuZmluZEJ5SWRBbmRVcGRhdGUoSUQsIHskcHVzaDoge1widGFza3NcIjogdGFzay5faWR9fSkuZXhlYygpXG4gICAgICAgIH0pXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMSkuZW5kKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmVuZCgpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgZWRpdFRhc2socmVxLCByZXMpIHtcbiAgICAgICAgUHJvamVjdC5maW5kQnlJZEFuZFVwZGF0ZShyZXEucGFyYW1zLmlkLCByZXEuYm9keSkuZXhlYygpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMCkuZW5kKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gcmVzLnN0YXR1cyg1MDApLmVuZCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn07XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

const mongoose = require('mongoose');
const Employee = require('../models/Employee.js');
const Template = require('../models/Template.js');

module.exports = {

    getTaskArray(id) {
        Template.findById(id)
            .exec()
            .then((template) => {
                const taskArray = template.tasks;
                return taskArray;
            });
    },
    
    makeTemplateTaskObject(id) {
        TemplateTask.findById(id)
            .exec()
            .then((returnedTask) => {
                console.log("ORIGINAL TASK PRE MANIPULATION", returnedTask);
                const task_plain = returnedTask.toObject();
                delete task_plain._id;
                delete task_plain.__v;
                delete task_plain.date.created;
                return task_plain;
            });
    },

    makeProjectObject(id){
        Template.findById(id)
            .exec()
            .then((template) =>{
                var new_Object = template.toObject();
                delete new_Object._id;
                delete new_Object.__v;
                return new_Object;
            });
    },
    
    nextOccurrence(instance) {
        let date = '';
        if (template_plain.setup.interval.type === 'Weekly') {
        if (template_plain.setup.interval.weeklyInterval !== 'Any') {
            date = timeCtrl.weeklySpecificDay(template_plain.setup.interval.weeklyInterval, instance);
    } else {
        date = timeCtrl.weeklyAnyDay(instance);
        }
    }
    else if (template_plain.setup.interval.type === 'Bi-Weekly') {
        if (template_plain.setup.interval.weeklyInterval !== 'Any') {
            date = timeCtrl.biWeeklySpecificDay(template_plain.setup.interval.biWeeklyInterval, instance);
    } else {
        date = timeCtrl.biWeeklyAnyDay(instance);
        }
    }
    else if (template_plain.setup.interval.type === 'Monthly') {
        if (template_plain.setup.interval.monthlyInterval.firstOfMonth === true) {
            date = timeCtrl.monthlyFirstDay();
    } else if (template_plain.setup.interval.monthlyInterval.lastOfMonth === true) {
        date = timeCtrl.monthlyLastDay(instance);
    } else {
        date = timeCtrl.monthlyAnyDay(instance);
        }
    }
    else if (template_plain.setup.interval.type === 'Semi-Monthly') {
        date = timeCtrl.semiMonthlyFirstCycle(template_plain.setup.interval.semiMonthlyInterval.fromBeginning);
        template_plain.setup.dueDate.anticipated = timeCtrl.semiMonthlySecondCycle(template_plain.setup.interval.semiMonthlyInterval.fromEnd);
    }
    else if (template_plain.setup.interval.type === 'Quarterly') {
        if (template_plain.setup.interval.quarterlyInterval.selection === 'First Day of the Quarter') {
            date = timeCtrl.quarterlyFirstDay();
        } else if (template_plain.setup.interval.quarterlyInterval.selection === 'Last Day of the Quarter') {
            date = timeCtrl.quarterlyLastDay(instance);
        } else if (template_plain.setup.interval.quarterlyInterval.selection === '# Days from Start') {
            date = timeCtrl.quarterlyDaysFromStart(template_plain.setup.interval.quarterlyInterval.fromBeginning, instance);
        } else if (template_plain.setup.interval.quarterlyInterval.selection === '# Days from End') {
            date = timeCtrl.quarterlyDaysBeforeEnd(template_plain.setup.interval.quarterlyInterval.fromEnd, instance);
        } else {
            date = timeCtrl.quarterlyAnyDay(instance);
        }
    } 
    else if (template_plain.setup.interval.type === 'Annually') {
        if (template_plain.setup.interval.annualInterval === 'First Day of the Year') {
            date = timeCtrl.annuallyFirstDay(instance);
        } else if (template_plain.setup.interval.annualInterval.selection === 'Last Day of the Year') {
            date = timeCtrl.annuallyLastDay(instance);
        } else if (template_plain.setup.interval.annualInterval.selection === 'In a Particular Month') {
            date = timeCtrl.annuallyParticularMonth(template_plain.setup.interval.annualInterval.selectMonth, instance);
        } else if (template_plain.setup.interval.annualInterval.selection === 'In a Particular Quarter') {
            date = timeCtrl.annuallyParticularQuarter(template_plain.setup.interval.annualInterval.selectQuarter, instance);
        } else if (template_plain.setup.interval.annualInterval.selection === '# of Days From Start') {
            date = timeCtrl.annuallyDaysFromStart(template_plain.setup.interval.annualInterval.fromBeginning, instance);
        } else if (template_plain.setup.interval.annualInterval.selection === '# of Days Before End') {
            date = timeCtrl.annuallyDaysBeforeEnd(template_plain.setup.interval.annualInterval.fromEnd, instance);
        } else {
            date = timeCtrl.annuallyAnyDay(instance);
        }
    };
        date = template_plain.setup.dueDate.actual;
        return date;
    },
    
    triggeredProject() {
        
    },

};
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
    
    scheduledProject(instance) {
        let deadline = '';
        if (template_plain.setup.interval.type === 'Weekly') {
        if (template_plain.setup.interval.weeklyInterval !== 'Any') {
            deadline = timeCtrl.weeklySpecificDay(template_plain.setup.interval.weeklyInterval, instance);
    } else {
        deadline = timeCtrl.weeklyAnyDay(instance);
        }
    }
    else if (template_plain.setup.interval.type === 'Bi-Weekly') {
        if (template_plain.setup.interval.weeklyInterval !== 'Any') {
            deadline = timeCtrl.biWeeklySpecificDay(template_plain.setup.interval.biWeeklyInterval, instance);
    } else {
        deadline = timeCtrl.biWeeklyAnyDay(instance);
        }
    }
    else if (template_plain.setup.interval.type === 'Monthly') {
        if (template_plain.setup.interval.monthlyInterval.firstOfMonth === true) {
            deadline = timeCtrl.monthlyFirstDay();
    } else if (template_plain.setup.interval.monthlyInterval.lastOfMonth === true) {
        deadline = timeCtrl.monthlyLastDay(instance);
    } else {
        deadline = timeCtrl.monthlyAnyDay(instance);
        }
    }
    else if (template_plain.setup.interval.type === 'Semi-Monthly') {
        deadline = timeCtrl.semiMonthlyFirstCycle(template_plain.setup.interval.semiMonthlyInterval.fromBeginning);
        template_plain.setup.dueDate.anticipated = timeCtrl.semiMonthlySecondCycle(template_plain.setup.interval.semiMonthlyInterval.fromEnd);
    }
    else if (template_plain.setup.interval.type === 'Quarterly') {
        if (template_plain.setup.interval.quarterlyInterval.selection === 'First Day of the Quarter') {
            deadline = timeCtrl.quarterlyFirstDay();
        } else if (template_plain.setup.interval.quarterlyInterval.selection === 'Last Day of the Quarter') {
            deadline = timeCtrl.quarterlyLastDay(instance);
        } else if (template_plain.setup.interval.quarterlyInterval.selection === '# Days from Start') {
            deadline = timeCtrl.quarterlyDaysFromStart(template_plain.setup.interval.quarterlyInterval.fromBeginning, instance);
        } else if (template_plain.setup.interval.quarterlyInterval.selection === '# Days from End') {
            deadline = timeCtrl.quarterlyDaysBeforeEnd(template_plain.setup.interval.quarterlyInterval.fromEnd, instance);
        } else {
            deadline = timeCtrl.quarterlyAnyDay(instance);
        }
    } 
    else if (template_plain.setup.interval.type === 'Annually') {
        if (template_plain.setup.interval.annualInterval === 'First Day of the Year') {
            deadline = timeCtrl.annuallyFirstDay(instance);
        } else if (template_plain.setup.interval.annualInterval.selection === 'Last Day of the Year') {
            deadline = timeCtrl.annuallyLastDay(instance);
        } else if (template_plain.setup.interval.annualInterval.selection === 'In a Particular Month') {
            deadline = timeCtrl.annuallyParticularMonth(template_plain.setup.interval.annualInterval.selectMonth, instance);
        } else if (template_plain.setup.interval.annualInterval.selection === 'In a Particular Quarter') {
            deadline = timeCtrl.annuallyParticularQuarter(template_plain.setup.interval.annualInterval.selectQuarter, instance);
        } else if (template_plain.setup.interval.annualInterval.selection === '# of Days From Start') {
            deadline = timeCtrl.annuallyDaysFromStart(template_plain.setup.interval.annualInterval.fromBeginning, instance);
        } else if (template_plain.setup.interval.annualInterval.selection === '# of Days Before End') {
            deadline = timeCtrl.annuallyDaysBeforeEnd(template_plain.setup.interval.annualInterval.fromEnd, instance);
        } else {
            deadline = timeCtrl.annuallyAnyDay(instance);
        }
    };
        deadline = template_plain.setup.dueDate.actual;
        return deadline;
    },
    
    triggeredProject(date) {
        let deadline = '';
        if (template_plain.setup.dueDate.target === 'Today') {
            date = timeCtrl.deadlineToday();
        }
        else if (template_plain.setup.dueDate.target === '# Days from Today') {
            date = timeCtrl.triggeredProjectDeadline();
        }
        else if (template_plain.setup.dueDate.target === 'Specific Date') {
            date = timeCtrl.dateDeadline(date);
        }
        deadline = template_plain.setup.dueDate.actual;
        return deadline;
    },

};
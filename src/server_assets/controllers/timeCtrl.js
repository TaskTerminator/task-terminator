//Any day formulas default deadline to last business day
//Specific day formulas allow for full range of user selection

const mongoose = require('mongoose');
const moment = require('moment');
const daysToDeadline = 7;
const deadlineHour = 17;
//How can set this globally to here? Just putting in an array for now...... this needs to be translated to and array of numbers [0-7] where 0 === Sunday
const businessDays = [1, 2, 3, 4, 5];


const allowedDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const allowedFrequencies = ["Triggered", "Scheduled"];
const allowedIntervalTypes = ['Daily', 'Daily Business Days', 'Weekly', 'Bi-Weekly', 'Monthly', 'Semi-Montly', 'Quarterly', 'Annually'];
const allowedMonthlyIntervals = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const allowedAnnuallyIntervals = ["First Day of the Year", "Last Day of the Year", "Any Day of the year", "In a Particular Month", "In a Particular Quarter", "# of Days From Start", "# of Days Before end"];
const allowedWeeklyIntervals = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Any'];
const allowedSemiMonthlyIntervals = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th", "13th", "14th", "15th"];
const allowedQuarterlyIntervals = ["First Day of the Quarter", "Last Day of the Quarter", "# Days from Start", "# Days from End", "Any"];


module.exports = {

<<<<<<< HEAD
    now: function () {
        return moment();
    },

    today: function () {
        return moment().day();
    },

    deadlineToday: function () {
        return moment().hours(deadlineHour).minute(0).second(0).millisecond(0);
    },

    triggeredProjectDeadline: function () {
        return moment().hours(deadlineHour).minute(0).second(0).millisecond(0).add(daysToDeadline, 'days');
    },

    dateDeadline: function (date) {
        return moment(date).hours(deadlineHour).minute(0).second(0).millisecond(0);
    },

    weeklyAnyDay: function () {
        const lastDay = businessDays.sort().reverse()[0];
        //This looks to last business day of week in company settings and puts deadline at the deadline hour of that day each week
        return moment().hours(deadlineHour).minute(0).second(0).millisecond(0).day(lastDay + 7);
    },

    weeklySpecificDay: function (selectedDay) {
        return moment().hours(deadlineHour).minute(0).second(0).millisecond(0).day(selectedDay + 7);
    },

    biWeeklyAnyDay: function () {
        const lastDay = businessDays.sort().reverse()[0];
        return moment().hours(deadlineHour).minute(0).second(0).millisecond(0).day(lastDay + 14);
    },

    biWeeklySpecificDay: function (selectedDay) {
        return moment().hours(deadlineHour).minute(0).second(0).millisecond(0).day(selectedDay + 14);
    },

    monthlyFirstDay: function () {
        return moment.hours(deadlineHour).minute(0).second(0).millisecond(0).date(1);
    },

    nextBusinessDay: function (date) {
        const isIn = function (increaseDays) {
            //Sets a number for day of the week...Sunday = 0, Monday = 1 etc.
            const today = moment().day();
            const nextBD = today + increaseDays;
            let flag = false;
            for (let i = 0; i < businessDays.length; i++) {
                if (businessDays[i] === nextBD) {
                    flag = true;
                }
            }
            return flag;
        };
        for (let i = 1; i < 7; i++) {
            if (isIn(i) === true) {
                return moment().hours(deadlineHour).minute(0).second(0).millisecond(0).add(i, 'days');
            }
            return moment().add(1, "weeks").startOf('isoWeek').hours(deadlineHour);
        }
    },





    // nextOccurance: function(intervalType) {
    //
    //   if(intervalType === "Daily"){
    //     return moment().hours(deadlineHour).minute(0).second(0).millisecond(0).add(1, 'days');
    //   } else if( intevalType === 'Daily Business Days') {
    //     return
    //   }
    //
    // }
};
=======
  now: function() {
    return moment();
  },

  dayOfWeek : function() {
    return moment().day();
  },

  thisMonth: function() {
    return moment().month();
  },

  thisQuarter: function() {
    return moment().quarter();
  },

  thisYear: function() {
    return moment().year();
  },

  nextMonth: function() {
    return moment().month() + 1;
  },

  deadlineToday: function() {
    return moment().hours(deadlineHour).minute(0).second(0).millisecond(0);
  },

  triggeredProjectDeadline: function() {
    return moment().hours(deadlineHour).minute(0).second(0).millisecond(0).add(daysToDeadline, 'days');
  },

  dateDeadline: function(date){
    return moment(date).hours(deadlineHour).minute(0).second(0).millisecond(0);
  },

  weeklyAnyDay: function() {
    var lastDay = businessDays.sort().reverse()[0];
    //This looks to last business day of week in company settings and puts deadline at the deadline hour of that day each week
    return moment().hours(deadlineHour).minute(0).second(0).millisecond(0).day(lastDay + 7);
  },

  weeklySpecificDay : function(selectedDay){
    return moment().hours(deadlineHour).minute(0).second(0).millisecond(0).day(selectedDay + 7);
  },

  biWeeklyAnyDay: function(){
    var lastDay = businessDays.sort().reverse()[0];
    return moment().hours(deadlineHour).minute(0).second(0).millisecond(0).day(lastDay + 14);
  },

  biWeeklySpecificDay : function(selectedDay){
    return moment().hours(deadlineHour).minute(0).second(0).millisecond(0).day(selectedDay + 14);
  },

  monthlyFirstDay: function(){
    var nextMonth = moment().month() + 1;
    return moment().hours(deadlineHour).minute(0).second(0).millisecond(0).month(nextMonth).date(1);
  },

  monthlyLastDay: function() {
    var nextMonth = moment().month() + 1;
    return moment().month(nextMonth).endOf("month").hours(deadlineHour).minute(0).second(0).millisecond(0);
  },

  monthlyAnyDay: function() {
    //defaults deadline to the last day of the month same function as monthlyLastDay.... we could do last business day as a strech
    var nextMonth = moment().month() + 1;
    return moment().month(nextMonth).endOf("month").hours(deadlineHour).minute(0).second(0).millisecond(0);
  },

  monthlyDaysFromStart: function(selectedDayOfMonth){
    var nextMonth = moment().month() + 1;
    return moment().month(nextMonth).date(selectedDayOfMonth).hours(deadlineHour).minute(0).second(0).millisecond(0);
  },

  monthlyDaysBeforeEnd: function(numDaysBefore){
    var nextMonth = moment().month() + 1;
    return moment().month(nextMonth).endOf("month").subtract(numDaysBefore, "days").hours(deadlineHour).minute(0).second(0).millisecond(0);
  },

  semiMonthlyFirstCycle : function(selectedDate){
    return moment().hours(deadlineHour).minute(0).second(0).millisecond(0).date(selectedDate);
  },

  semiMothlySecondCycle : function(firstCycleDate){
    return moment().hours(deadlineHour).minute(0).second(0).millisecond(0).date(firstCycleDate + 15);
  },

  quarterlyFirstDay: function(){
    var nextQuarter = moment().quarter() + 1;
    return moment().hours(deadlineHour).minute(0).second(0).millisecond(0).quarter(nextQuarter).date(1);
  },

  quarterlyLastDay: function() {
    var nextQuarter = moment().quarter() + 1;
    return moment().quarter(nextQuarter).endOf("quarter").hours(deadlineHour).minute(0).second(0).millisecond(0);
  },

  quarterlyAnyDay: function() {
    //defaults deadline to the last day of the month same function as monthlyLastDay.... we could do last business day as a strech
    var nextQuarter = moment().quarter() + 1;
    return moment().quarter(nextQuarter).endOf("quarter").hours(deadlineHour).minute(0).second(0).millisecond(0);
  },

  quarterlyDaysFromStart: function(selectedDayOfMonth){
    var nextQuarter = moment().quarter() + 1;
    return moment().quarter(nextQuarter).date(selectedDayOfMonth).hours(deadlineHour).minute(0).second(0).millisecond(0);
  },

  quarterlyDaysBeforeEnd: function(numDaysBefore){
    var nextQuarter = moment().quarter() + 1;
    return moment().quarter(nextQuarter).endOf("quarter").subtract(numDaysBefore, "days").hours(deadlineHour).minute(0).second(0).millisecond(0);
  },

  annuallyFirstDay: function(){
    var nextYear = moment().year() + 1;
    return moment().hours(deadlineHour).minute(0).second(0).millisecond(0).year(nextYear).date(1);
  },

  annuallyLastDay: function() {
    var nextYear = moment().year() + 1;
    return moment().year(nextYear).endOf("year").hours(deadlineHour).minute(0).second(0).millisecond(0);
  },

  annuallyAnyDay: function() {
    //defaults deadline to the last day of the month same function as monthlyLastDay.... we could do last business day as a strech
    var nextYear = moment().year() + 1;
    return moment().year(nextYear).endOf("year").hours(deadlineHour).minute(0).second(0).millisecond(0);
  },

  annuallyDaysFromStart: function(selectedDayOfMonth){
    var nextYear = moment().year() + 1;
    return moment().year(nextYear).date(selectedDayOfMonth).hours(deadlineHour).minute(0).second(0).millisecond(0);
  },

  annuallyDaysBeforeEnd: function(numDaysBefore){
    var nextYear = moment().year() + 1;
    return moment().year(nextYear).endOf("year").subtract(numDaysBefore, "days").hours(deadlineHour).minute(0).second(0).millisecond(0);
  },




  // nextBusinessDay: function(date){
  //   var isIn = function(increaseDays){
  //     //Sets a number for day of the week...Sunday = 0, Monday = 1 etc.
  //     var today = moment().day();
  //     for(var i = 0; i < 7; i ++){
  //       if (businessDays[today + i] === i){
  //         return true;
  //       }
  //     }
  //     return businessDays.includes(today + increaseDays);
  //   };
  //
  //   for (var i = 1; i < 7; i ++){
  //     if(isIn(i) === true){
  //       return moment().hours(deadlineHour).minute(0).second(0).millisecond(0).add(i, 'days');
  //     }
  //   }
  // }



  // nextOccurance: function(intervalType) {
  //
  //   if(intervalType === "Daily"){
  //     return moment().hours(deadlineHour).minute(0).second(0).millisecond(0).add(1, 'days');
  //   } else if( intevalType === 'Daily Business Days') {
  //     return
  //   }
  //
  // }
};
>>>>>>> origin

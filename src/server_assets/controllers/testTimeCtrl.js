const mongoose = require('mongoose');
const moment = require('moment');
const time = require('./timeCtrl.js');

module.exports = {

    testTime : function(req,res) {
      //Complete
      console.log("NOW : ", time.now()._d);
      console.log("TODAY - DAY OF WEEK: ",  time.dayOfWeek());
      console.log("THIS MONTH : ", time.thisMonth());
      console.log("THIS QUARTER:", time.thisQuarter());
      console.log("THIS YEAR: ", time.thisYear());
      console.log("NEXT MONTH : ", time.nextMonth());
      console.log("NEXT BUSINESS DAY:", time.nextBusinessDay()._d);
      console.log("WEEKLY ANY DAY: ", time.weeklyAnyDay()._d);
      console.log("WEEKLY SPECIFIC DAY - MON: ", time.weeklySpecificDay(1)._d);
      console.log("WEEKLY SPECIFIC DAY - WED: ", time.weeklySpecificDay(3)._d);
      console.log("WEEKLY SPECIFIC DAY - FRI: ", time.weeklySpecificDay(5)._d);
      console.log("BIWEEKLY ANY DAY: ", time.biWeeklyAnyDay()._d);
      console.log("BIWEEKLY SPECIFIC DAY - MON: ", time.biWeeklySpecificDay(1)._d);
      console.log("BIWEEKLY SPECIFIC DAY - WED: ", time.biWeeklySpecificDay(3)._d);
      console.log("BIWEEKLY SPECIFIC DAY - FRI: ", time.biWeeklySpecificDay(5)._d);
      console.log("MONTHLY FIRST DAY: ", time.monthlyFirstDay()._d);
      console.log(" ");
      console.log("FIRST MONTHLY LAST DAY: ", time.monthlyLastDay("first")._d);
      console.log("NEXT  MONTHLY LAST DAY: ", time.monthlyLastDay()._d);
      console.log(" ");

      console.log(" ");
      console.log("WEEKLY ANY DAY first : ", time.weeklyAnyDay("first")._d);
      console.log("WEEKLY ANY DAY next : ", time.weeklyAnyDay()._d);
      console.log("WEEKLY SPECIFIC DAY - MON first: ", time.weeklySpecificDay(1,"first")._d);
      console.log("WEEKLY SPECIFIC DAY - MON next: ", time.weeklySpecificDay(1)._d);
      console.log("WEEKLY SPECIFIC DAY - WED first: ", time.weeklySpecificDay(3,"first")._d);
      console.log("WEEKLY SPECIFIC DAY - WED next: ", time.weeklySpecificDay(3)._d);
      console.log("WEEKLY SPECIFIC DAY - FRI first: ", time.weeklySpecificDay(5,"first")._d);
      console.log("WEEKLY SPECIFIC DAY - FRI next: ", time.weeklySpecificDay(5)._d);


      console.log(" ");
      console.log("BIWEEKLY ANY DAY first: ", time.biWeeklyAnyDay("first")._d);
      console.log("BIWEEKLY ANY DAY next:  ", time.biWeeklyAnyDay()._d);
      console.log("BIWEEKLY SPECIFIC DAY - MON first: ", time.biWeeklySpecificDay(1,"first")._d);
      console.log("BIWEEKLY SPECIFIC DAY - MON next: ", time.biWeeklySpecificDay(1)._d);
      console.log("BIWEEKLY SPECIFIC DAY - WED first: ", time.biWeeklySpecificDay(3,"first")._d);
      console.log("BIWEEKLY SPECIFIC DAY - WED next: ", time.biWeeklySpecificDay(3)._d);
      console.log("BIWEEKLY SPECIFIC DAY - FRI first: ", time.biWeeklySpecificDay(5,"first")._d);
      console.log("BIWEEKLY SPECIFIC DAY - FRI next: ", time.biWeeklySpecificDay(5)._d);

      console.log(" ");
      console.log("MONTHLY FIRST DAY: ", time.monthlyFirstDay()._d);
      console.log("MONTHLY LAST DAY first: ", time.monthlyLastDay("first")._d);
      console.log("MONTHLY LAST DAY next: ", time.monthlyLastDay()._d);
      console.log("MONTHLY ANY DAY  frist", time.monthlyAnyDay("first")._d);
      console.log("MONTHLY ANY DAY  next", time.monthlyAnyDay()._d);
      //SELECTION SHOULD BE LIMITED TO NO MORE THAN 28 ON FRONT END
      console.log("MONTHLY 5 Days FROM START first :", time.monthlyDaysFromStart(5,'first')._d);
      console.log("MONTHLY 5 DAYS FROM START next  :",time.monthlyDaysFromStart(5)._d);
      console.log("MONTHLY 22 DAYS FROM START first : ",time.monthlyDaysFromStart(22,'first')._d);
      console.log("MONTHLY 22 DAYS FROM START next : ",time.monthlyDaysFromStart(22)._d);

      console.log("MONTHLY 2 DAYS BEFORE END first:",time.monthlyDaysBeforeEnd(2,"first")._d);
      console.log("MONTHLY 2 DAYS BEFORE END next:",time.monthlyDaysBeforeEnd(2)._d);
      console.log("MONTHLY 25 DAYS BEFORE END first:",time.monthlyDaysBeforeEnd(25, "first")._d);
      console.log("MONTHLY 25 DAYS BEFORE END next :",time.monthlyDaysBeforeEnd(25)._d);

      console.log(" ");
      console.log("QUARTER FIRST DAY: ", time.quarterlyFirstDay()._d);
      console.log("QUARTER LAST DAY first: ", time.quarterlyLastDay("first")._d);
      console.log("QUARTER LAST DAY next: ", time.quarterlyLastDay()._d);
      console.log("QUARTER ANY DAY first", time.quarterlyAnyDay("first")._d);
      console.log("QUARTER ANY DAY next", time.quarterlyAnyDay()._d);
      console.log("QUARTER 5 DAYS FROM START first ", time.quarterlyDaysFromStart(5,'first')._d);
      console.log("QUARTER 5 DAYS FROM START next :",time.quarterlyDaysFromStart(5)._d);
      console.log("QUARTER 45 DAYS FROM START first :  ",time.quarterlyDaysFromStart(45,'first')._d);
      console.log("QUARTER 45 DAYS FROM START next :  ",time.quarterlyDaysFromStart(45)._d);
      console.log("QUARTER 2 DAYS BEFORE END first:",time.quarterlyDaysBeforeEnd(2,"first")._d);
      console.log("QUARTER 2 DAYS BEFORE END next:",time.quarterlyDaysBeforeEnd(2)._d);
      console.log("QUARTER 87 DAYS BEFORE END first:",time.quarterlyDaysBeforeEnd(87, "first")._d);
      console.log("QUARTER 87 DAYS BEFORE END next :",time.quarterlyDaysBeforeEnd(87)._d);

      console.log(" ");
      console.log("ANNUALLY FIRST DAY: ", time.annuallyFirstDay()._d);
      console.log("ANNUALLY LAST DAY first: ", time.annuallyLastDay("first")._d);
      console.log("ANNUALLY LAST DAY next: ", time.annuallyLastDay()._d);
      console.log("ANNUALLY ANY DAY first", time.annuallyAnyDay("first")._d);
      console.log("ANNUALLY ANY DAY next", time.annuallyAnyDay()._d);
      console.log("ANNUALLY 5 DAYS FROM START first  ", time.annuallyDaysFromStart(5,'first')._d);
      console.log("ANNUALLY 5 DAYS FROM START next  ", time.annuallyDaysFromStart(5,'first')._d);
      console.log("ANNUALLY 245 DAYS FROM START first ",time.annuallyDaysFromStart(245,'first')._d);
      console.log("ANNUALLY 245 DAYS FROM START next ",time.annuallyDaysFromStart(245,'first')._d);
      console.log("ANNUALLY 2 DAYS BEFORE END first :",time.annuallyDaysBeforeEnd(2,"first")._d);
      console.log("ANNUALLY 2 DAYS BEFORE END next :",time.annuallyDaysBeforeEnd(2)._d);
      console.log("ANNUALLY 360 DAYS BEFORE END first :",time.annuallyDaysBeforeEnd(360,"first")._d);
      console.log("ANNUALLY 360 DAYS BEFORE END next :",time.annuallyDaysBeforeEnd(360)._d);
      console.log("ANNUALLY PARTICULAR MONTH - NATURAL INSTANCE JANUARY : ", time.annuallyParticularMonth(0, "first")._d);
      console.log("ANNUALLY PARTICULAR MONTH - NATURAL INSTANCE JUNE : ", time.annuallyParticularMonth(5, "first")._d);
      console.log("ANNUALLY PARTICULAR MONTH - JUNE : ", time.annuallyParticularMonth(5)._d);
      console.log("ANNUALLY PARTICULAR QUARTER - NATURAL INSTANCE 1ST : ", time.annuallyParticularQuarter(1, "first")._d);
      console.log("ANNUALLY PARTICULAR QUARTER - NATURAL INSTANCE 2ND : ", time.annuallyParticularQuarter(2, "first")._d);
      console.log("ANNUALLY PARTICULAR QUARTER - NEXT INSTANCE 1ST : ", time.annuallyParticularQuarter(1)._d);


      console.log(" ");
      console.log("NOT FINISHED ");
      console.log("SEMI MONTHLY STARTING ON THE 3RD first cycle", time.semiMonthlyFirstCycle(3)._d);
      console.log("SEMI MONTHLY STARTING ON THE 3RD second cycle", time.semiMothlySecondCycle(3)._d);




      return res.status(200).end();
    }

};

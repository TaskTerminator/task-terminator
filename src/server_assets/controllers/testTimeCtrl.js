const mongoose = require('mongoose');
const moment = require('moment');
const time = require('../controllers/timeCtrl.js');

module.exports = {

    testTime : function(req,res) {
      console.log("NOW : ", time.now()._d);
      console.log("TODAY - DAY OF WEEK: ",  time.dayOfWeek());
      console.log("THIS MONTH : ", time.thisMonth());
      console.log("THIS QUARTER", time.thisQuarter());
      console.log("THIS YEAR ", time.thisYear());
      console.log("NEXT MONTH : ", time.nextMonth());
      // console.log("NEXT BUSINESS DAY", time.nextBusinessDay());
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

      console.log("MONTHLY ANY DAY", time.monthlyAnyDay()._d);
      //SELECTION SHOULD BE LIMITED TO NO MORE THAN 28 ON FRONT END
      console.log(" ");
      console.log("MONTHLY DAYS FROM START - FIRST INSTANCE - 5 DAYS  ", time.monthlyDaysFromStart(5,'first')._d);
      console.log("MONTHLY DAYS FROM START - FIRST INSTANCE - 22 DAYS ",time.monthlyDaysFromStart(22,'first')._d);
      console.log("NEXT INSTANCE MONTHLY 5 DAYS FROM START :",time.monthlyDaysFromStart(5)._d);
      console.log(" ");

      console.log(" ");
      console.log("QUARTER DAYS FROM START - FIRST INSTANCE - 5 DAYS  ", time.quarterlyDaysFromStart(5,'first')._d);
      console.log("QUARTER DAYS FROM START - FIRST INSTANCE - 45 DAYS ",time.quarterlyDaysFromStart(45,'first')._d);
      console.log("NEXT INSTANCE QUARTER 5 DAYS FROM START :",time.quarterlyDaysFromStart(5)._d);
      console.log(" ");

      console.log(" ");
      console.log("ANNUAL DAYS FROM START - FIRST INSTANCE - 5 DAYS  ", time.annuallyDaysFromStart(5,'first')._d);
      console.log("ANNUAL DAYS FROM START - FIRST INSTANCE - 245 DAYS ",time.annuallyDaysFromStart(245,'first')._d);
      console.log("NEXT INSTANCE ANNUAL 5 DAYS FROM START :",time.annuallyDaysFromStart(5)._d);
      console.log(" ");

      console.log("MONTHLY 2 DAYS BEFORE END :",time.monthlyDaysBeforeEnd(2)._d);
      console.log("MONTHLY 9 DAYS BEFORE END :",time.monthlyDaysBeforeEnd(9)._d);
      console.log("MONTHLY 17 DAYS BEFORE END :",time.monthlyDaysBeforeEnd(17)._d);
      console.log("FIRST INSTANCE SEMI MONTHLY STARTING 3RD", time.semiMonthlyFirstCycle(3)._d);
      console.log("SECOND INSTANCE SEMI MONTHLY STARTING 3RD", time.semiMothlySecondCycle(3)._d);
      console.log("QUARTER FIRST DAY: ", time.quarterlyFirstDay()._d);
      console.log("QUARTER LAST DAY: ", time.quarterlyLastDay()._d);
      console.log("QUARTER ANY DAY", time.quarterlyAnyDay()._d);



      console.log("QUARTER 2 DAYS BEFORE END :",time.quarterlyDaysBeforeEnd(2)._d);
      console.log("QUARTER 9 DAYS BEFORE END :",time.quarterlyDaysBeforeEnd(9)._d);

      console.log("ANNUALLY FIRST DAY: ", time.annuallyFirstDay()._d);
      console.log(" ");
      console.log("FIRST ANNUALLY LAST DAY: ", time.annuallyLastDay("first")._d);
      console.log("NEXT  ANNUALLY LAST DAY: ", time.annuallyLastDay()._d);
      console.log(" ");

      console.log("ANNUALLY ANY DAY", time.annuallyAnyDay()._d);
      console.log("ANNUALLY 5 DAYS FROM START :",time.annuallyDaysFromStart(5)._d);
      console.log("ANNUALLY 13 DAYS FROM START :",time.annuallyDaysFromStart(13)._d);
      console.log("ANNUALLY 26 DAYS FROM START :",time.annuallyDaysFromStart(26)._d);
      console.log("ANNUALLY 2 DAYS BEFORE END :",time.annuallyDaysBeforeEnd(2)._d);
      console.log("ANNUALLY 9 DAYS BEFORE END :",time.annuallyDaysBeforeEnd(9)._d);
      console.log("ANNUALLY 17 DAYS BEFORE END :",time.annuallyDaysBeforeEnd(17)._d);
      console.log(" ");
      console.log("ANNUALLY PARTICULAR MONTH - NATURAL INSTANCE JANUARY : ", time.annuallyParticularMonth(0, "first")._d);
      console.log("ANNUALLY PARTICULAR MONTH - NATURAL INSTANCE JUNE : ", time.annuallyParticularMonth(5, "first")._d);
      console.log("ANNUALLY PARTICULAR MONTH - JUNE : ", time.annuallyParticularMonth(5)._d);
      console.log(" ");
      console.log("FIRST INSTANCE ANNUALLY PARTICULAR QUARTER - 3rd : ", time.annuallyParticularQuarter(3,"first")._d);
      console.log("NEXT INSTANCE  ANNUALLY PARTICULAR QUARTER - 3rd : ", time.annuallyParticularQuarter(3)._d);



      return res.status(200).end();
    }

};

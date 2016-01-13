const mongoose = require('mongoose');
const moment = require('moment');
const time = require('../controllers/timeCtrl.js');

module.exports = {

    testTime : function(req,res) {
      console.log("NOW : ", time.now()._d);
      console.log("TODAY - DAY OF WEEK: ",  time.dayOfWeek());
      console.log("THIS MONTH : ", time.thisMonth());
      console.log("THIS QUARTER", time.thisQuarter());
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
      console.log("MONTHLY LAST DAY: ", time.monthlyLastDay()._d);
      console.log("MONTHLY ANY DAY", time.monthlyAnyDay()._d);
      //SELECTION SHOULD BE LIMITED TO NO MORE THAN 28 ON FRONT END
      console.log("MONTHLY 5 DAYS FROM START :",time.monthlyDaysFromStart(5)._d);
      console.log("MONTHLY 13 DAYS FROM START :",time.monthlyDaysFromStart(13)._d);
      console.log("MONTHLY 26 DAYS FROM START :",time.monthlyDaysFromStart(26)._d);
      console.log("MONTHLY 2 DAYS BEFORE END :",time.monthlyDaysBeforeEnd(2)._d);
      console.log("MONTHLY 9 DAYS BEFORE END :",time.monthlyDaysBeforeEnd(9)._d);
      console.log("MONTHLY 17 DAYS BEFORE END :",time.monthlyDaysBeforeEnd(17)._d);
      console.log("FIRST INSTANCE SEMI MONTHLY STARTING 3RD", time.semiMonthlyFirstCycle(3)._d);
      console.log("SECOND INSTANCE SEMI MONTHLY STARTING 3RD", time.semiMothlySecondCycle(3)._d);
      console.log("QUARTER FIRST DAY: ", time.quarterlyFirstDay()._d);
      console.log("QUARTER LAST DAY: ", time.quarterlyLastDay()._d);
      console.log("QUARTER ANY DAY", time.quarterlyAnyDay()._d);
      console.log("QUARTER 5 DAYS FROM START :",time.quarterlyDaysFromStart(5)._d);
      console.log("QUARTER 13 DAYS FROM START :",time.quarterlyDaysFromStart(13)._d);
      console.log("QUARTER 26 DAYS FROM START :",time.quarterlyDaysFromStart(26)._d);
      console.log("QUARTER 2 DAYS BEFORE END :",time.quarterlyDaysBeforeEnd(2)._d);
      console.log("QUARTER 9 DAYS BEFORE END :",time.quarterlyDaysBeforeEnd(9)._d);
      console.log("QUARTER 17 DAYS BEFORE END :",time.quarterlyDaysBeforeEnd(17)._d);


      return res.status(200).end();
    }

};

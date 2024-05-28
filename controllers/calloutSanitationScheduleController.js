const jwt = require('jsonwebtoken');
const CalloutSanitationSchedule = require('../models/CalloutSanitationSchedule');
const DailyScheduleDetail = require('../models/DailyScheduleDetail');
const DailyCalloutSanitationSchedule = require(`../models/DailyCalloutSanitationSchedule`);
const express = require('express');
const app = express();

module.exports.C_S_S_get = async(req, res) => {
    res.render('./callout_sanitation_schedule');
  };
  // module.exports.C_S_S_post = async (req, res) => {
  //   const {Region} = req.body;
   
  //   let newScheduleDetail = [];//new Array(8).fill(0).map(()=>new Array(6).fill(0));
  //   //newScheduleDetail[0] = {};
  //     for (let i = 1; i <= 8; i++) {
  //         newScheduleDetail[i] = [];
  //       for (let j = 1; j <= 5; j++) {
  //         //console.log("L: ",req.body[`row${i}col${j}`]);
  //           if(j==2){
  //               newScheduleDetail[i][j] = req.body[`action_typerow${i}col${j}`]; 
  //           }
  //           else if(j===4 || j===5){
  //               newScheduleDetail[i][j] = req.body[`appt-timerow${i}col${j}`]; 
  //            }
  //            else
  //          { 
  //           newScheduleDetail[i][j] = req.body[`row${i}col${j}`];
  //         }
  //       }
  //     }
  //     let newDailyScheduleDetail = {};
  //     for (let i = 1; i <= 8; i++){

  //          newDailyScheduleDetail[i] = new DailyScheduleDetail({
  //           outlet_name : newScheduleDetail[i][1],
  //           action_type : newScheduleDetail[i][2],
  //           comment : newScheduleDetail[i][3],
  //           time_in : newScheduleDetail[i][4],
  //           time_out : newScheduleDetail[i][5]
  //         });
        
  //     }
  //     console.log(">>4 ",newDailyScheduleDetail);
  //     try {
  //       const dailySched = [];
  //       const temp = []
  //       for (let i = 1; i <= 8; i++){
  //       temp[i] = await DailyScheduleDetail.create(newDailyScheduleDetail[i]);
  //       dailySched[i] = temp[i]._id;
  //     }
  //       console.log(">>1 ",dailySched);
  //       let newSchedule = new CalloutSanitationSchedule({
  //         technician_name: req.body.technician_name,
  //         region: req.body.region,
  //         date: req.body.date,
  //         market: req.body.market,
  //         detail: dailySched
  //       });
  //      const sched = await CalloutSanitationSchedule.create(newSchedule);
  //      const totallist = {};
  //      const dailyscheddetaillist = await DailyScheduleDetail.getall();
  //      const calloutschedlist = await CalloutSanitationSchedule.getall();
  //      for (let i = 1; i <= dailyscheddetaillist.length; i++)
  //      {
  //       for (let j = 1; j <= 9; j++) 
  //       {
  //           totallist[i][j] = calloutschedlist[i]
  //       }
  //      }

  //     res.render('./daily_schedule_list')
  //      console.log(">>2 ", sched);
  //     } catch (error) {
  //       console.log(">> ", error);
  //     }
  //     console.log(newScheduleDetail);
  

  // };
  module.exports.D_C_S_S_post = async (req, res) => {
    let newScheduleDetail = [];//new Array(8).fill(0).map(()=>new Array(6).fill(0));
    //newScheduleDetail[0] = {};
      for (let i = 1; i <= 8; i++) {
          newScheduleDetail[i] = [];
        for (let j = 1; j <= 5; j++) {
          //console.log("L: ",req.body[`row${i}col${j}`]);
            if(j==2){
                newScheduleDetail[i][j] = req.body[`action_typerow${i}col${j}`]; 
            }
            else if(j===4 || j===5){
                newScheduleDetail[i][j] = req.body[`appt-timerow${i}col${j}`]; 
             }
             else
           { 
            newScheduleDetail[i][j] = req.body[`row${i}col${j}`];
          }
        }
      }
      let newDailyScheduleDetail = {};
      for (let i = 1; i <= 8; i++){

           newDailyScheduleDetail[i] = new DailyCalloutSanitationSchedule({
            technician_name: req.body.technician_name,
            region: req.body.region,
            date: req.body.date,
            market: req.body.market, 
            outlet_name : newScheduleDetail[i][1],
            action_type : newScheduleDetail[i][2],
            comment : newScheduleDetail[i][3],
            time_in : newScheduleDetail[i][4],
            time_out : newScheduleDetail[i][5]
          });
        
      }
      console.log(">>4 ",newDailyScheduleDetail);
      let result = {};
      try {
       
        for (let i = 1; i <= 8; i++){
        result = await DailyCalloutSanitationSchedule.create(newDailyScheduleDetail[i]);
        
      }
      if(result)
      {
        let temp = await DailyCalloutSanitationSchedule.getall();
        console.log(">>2 ", temp);
        res.render('./daily_schedule_list', {dailySchedList: temp ,});
     
      }
       //console.log(">>2 ", temp);
      } catch (error) {
        console.log(">> ", error);
      }
      console.log(newScheduleDetail);
  

  };
  module.exports.D_C_S_S_list_get = async(req, res) => {
    let temp = await DailyCalloutSanitationSchedule.getall();
    res.render('./daily_schedule_list', {dailySchedList: temp ,});
  };
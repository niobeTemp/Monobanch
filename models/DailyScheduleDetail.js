const mongoose = require('mongoose');

const DailyScheduleDetailSchema = new mongoose.Schema({
  outlet_name: { type: String },
  action_type: { type: String },
  comment: { type: String },
  time_in: { type: String },
  time_out: { type: String }
  
});

DailyScheduleDetailSchema.statics.getall = async function(){
  const res = await this.find({});
  if(res) return res;
  else throw Error('dsd error');
}

module.exports = mongoose.model('DailyScheduleDetail', DailyScheduleDetailSchema);
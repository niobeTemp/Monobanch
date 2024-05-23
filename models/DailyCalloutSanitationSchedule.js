const mongoose = require('mongoose');

const DailyCalloutSanitationScheduleSchema = new mongoose.Schema({
    technician_name: { type: String},
    region: { type: String  },
    date: { type: String  },
    market: { type: String  },
    outlet_name: { type: String },
    action_type: { type: String },
    comment: { type: String },
    time_in: { type: String },
    time_out: { type: String }  
});

  DailyCalloutSanitationScheduleSchema.statics.getall = async function(){
    const res = await this.find({});
    if(res) return res;
    else throw Error('dcss error');
  }

const DailyCalloutSanitationSchedule = mongoose.model('DailyCalloutSanitationSchedule', DailyCalloutSanitationScheduleSchema);
module.exports = DailyCalloutSanitationSchedule;
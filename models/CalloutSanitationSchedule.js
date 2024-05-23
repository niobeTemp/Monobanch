const mongoose = require('mongoose');

const CalloutSanitationScheduleSchema = new mongoose.Schema({
    technician_name: { type: String},
    region: { type: String  },
    date: { type: String  },
    market: { type: String  },
    detail: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DailyScheduleDetail' }]
  });

CalloutSanitationScheduleSchema.static.getall = async function(){
  const res = await this.find({});
  if(res) return res;
  else throw Error('css error');
}


const CalloutSanitationSchedule = mongoose.model('CalloutSanitationSchedule', CalloutSanitationScheduleSchema);
module.exports = CalloutSanitationSchedule;
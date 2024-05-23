const mongoose = require('mongoose');

const DroughtOutletSchema = new mongoose.Schema({
    serial_number: { type: String},
    retailer_name: { type: String  },
    owner_name: { type: String  },
    region: { type: String  },
    market_place: { type: String  },
    location: { type: String  },
    qrcode: { type: String }   });

const DroughtOutlet = mongoose.model('DroughtOutlet', DroughtOutletSchema);
module.exports = DroughtOutlet;
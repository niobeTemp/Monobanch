const mongoose = require('mongoose');

const TechnicianSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: [true,'object aleady exists!']},
    region: { type: String, required: true }
    });

const Technician = mongoose.model('Technician', TechnicianSchema);
module.exports = Technician;
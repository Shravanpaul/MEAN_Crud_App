/**
 *Questions Schema
 * This file is responsible for defining fields of otp entity.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let patientSchema = new Schema({
    userId: {
        type: Schema.ObjectId, ref: 'user' 
    },
    email: {
        type: String
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    mobile: {
        type: Number
    },
    userProfile: {
        type: String
    }
}, { timestamps: true });
let PatientModel = mongoose.model('patient', patientSchema);

module.exports = PatientModel;
const mongoose = require('mongoose');

const requestsSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    bloodGroup: {
        type: String,
        required: true
    },
    bloodAmount: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    dateRequest: {
        type: String,
        required: true,
    },
    reason: {
        type: String
    }

}, { timestamps: true });


module.exports = mongoose.model('Request', requestsSchema);
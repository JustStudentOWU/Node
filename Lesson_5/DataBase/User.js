const { Schema, model } = require('mongoose');

const { USER_ROLES } = require('../config');

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    born_year: {
        type: Number,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        default: USER_ROLES,
        enum: Object.values(USER_ROLES)
    },
    work: {
        type: Boolean,
        default: false
    },
    car: {
        type: Array
    }
}, { timestamps: true });

module.exports = model('user', userSchema);

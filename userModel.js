const mongoose = require('mongoose');
const { Schema } = mongoose;
const addressSchema = new Schema({
    city: String,
    state: String,
    country: String,
    country_code: String,
});

const cardSchema = new  Schema({
    card_number: String,
    card_type: String,
    currency_code: String,
    balance: String,
});

const userSchema = new Schema({
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    address: addressSchema,
    card: cardSchema,
    married_status: Boolean,
});
const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
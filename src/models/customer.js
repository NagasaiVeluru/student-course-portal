const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const regExpMatch = /[a-zA-Z]/;
const sizeValidator = [
    function(val){
        return (val.length > 0 && val.length <3);
    },
];

const countries = ['USA','Canada','Japan','UK'];

const customerSchema = new mongoose.Schema({
    name: {type:String, required:true,match:regExpMatch},
    address: String,
    city: String,
    state:{type:String,required:true,validate: sizeValidator},
    country: {type:String,required:true,enum:countries},
    zipCode: String,
    createdDate: Date,
    isActive: {type:Boolean, required:true, default:true},
    discount: {type:Number,min:5,max:12}
});

customerSchema.path('city').required(true,`You forgot to add the name of the city. It cannot be empty`);

customerSchema.plugin(passportLocalMongoose);
const Customer = mongoose.model('Customer',customerSchema);

module.exports = Customer;
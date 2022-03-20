const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    coursename: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 10
    },
    courseID: {
        type: String,
        required: true,
        unique: true
    }
},{
    timestamps: true,
})

courseSchema.plugin(passportLocalMongoose);
const Course = mongoose.model('Course',courseSchema);

module.exports = Course;
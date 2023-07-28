const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  id:{
    type:Number,
    default:Date.now(),
    required:true
  },
  first_name: {
    type: String,
    required: [true, "Enter your name !"],
    maxlenght: [30, "Name cannot be exceed 30 characters"],
  },
  last_name: {
    type: String,
    required: [true, "Enter your name !"],
    maxlenght: [30, "Name cannot be exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Enter your email !"],
    unique:  [true, "Please enter valid email address !"],
  },
  gender: {
    type: String,
    required: [true, "Please select your gender !"],
  },
  domain: {
    type: String,
    required: [true, "Please select your domain !"],
    enum: {
      values: [ "IT",
      "Marketing",
      "Management",
      "Business Development",
      "Sales",
      "UI Designing",
      "Finance",
    ],
      message: "Please enter valid domain",
    },
  },
  avatar: {
   type:String,
   required:true
  },
  available:{
    type:Boolean,
    default:true
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('User', userSchema)
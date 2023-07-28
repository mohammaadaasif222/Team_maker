const User = require("../models/userModel");
const APIFeatures = require("../utils/APIFeatures");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/cathAsyncErrorsMiddleware");
const asyncHandler = require("express-async-handler");
const cloudinary = require("cloudinary").v2;

exports.createUser = catchAsyncErrors(async (req, res, next) => {
  const { last_name, first_name, email, gender, domain } = req.body;
  const result = await cloudinary.uploader.upload(req.file.path);
  try {
    const user = await User.create({
      first_name,
      last_name,
      email,
      gender,
      domain,
      avatar: result.secure_url,
    });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      error,
    });
  }
});

exports.getAllUsers = catchAsyncErrors(async (request, response, next) => {
  console.log(request.query);
  const resPerPage = 20;
  const countUser = await User.countDocuments();
  const apiFeatures = new APIFeatures(User.find(), request.query)
    .search()
    .filter()
    .pagination(resPerPage);

  const users = await apiFeatures.query;
  response.status(200).json({
    success: true,
    size: users.length,
    resPerPage,
    countUser,
    users,
  });
});

exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json({
      user,
    });
  } else {
    res.status(404);
    throw new ErrorHandler("User Not Found");
  }
});

exports.updateUserProfile = asyncHandler(async (req, res) => {

  const userId = req.params.id;
  const { last_name, first_name, email, gender, domain } = req.body;
  let result;
  if(req.file){
     result = await cloudinary.uploader.upload(req.file.path);
  }
  const user = await User.findById({_id:userId})

  try {
    const update = {
      first_name:first_name || user.first_name,
      last_name:last_name || user.last_name,
      email:email || user.email,
      gender : gender || user.gender,
      domain : domain || user.domain,
      avatar: req.body.avatar || result.secure_url || user.avatar
    };

    const updatedUser = await User.findOneAndUpdate({ _id: userId }, update, {
      new: true,
    });

    if (!updatedUser) {
      res.status(404);
      throw new ErrorHandler("User Not Found!");
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

exports.deleteUser = catchAsyncErrors(async (request, response, next) => {
  try {
    const userId = request.params.id;
    const result = await User.deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
      return response
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    response
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    response.status(500).json({ success: false, message: "Server error" });
  }
});

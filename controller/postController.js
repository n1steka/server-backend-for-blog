const model = require("../models/postModel");
const asyncHandler = require("../middleware/asyncHandler");
const userModel = require("../models/user");
exports.create = asyncHandler(async (req, res, next) => {
  try {
    const fileName = req.file.filename;
    if (!req.file) {
      res.status(404).json({
        error: "Зураг оруулна уу ! ",
      });
    }
    console.log(
      fileName,
      " filename ))))))))))))))))))))))))))))))))))))))))))) "
    );
    const data = {
      ...req.body,
      createUser: req.userId,
      photo: req.file?.filename || "no photo",
    };
    console.log(fileName + "********************************");
    const text = await model.create(data);

    return res.status(200).json({ success: true, data: text });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.update = asyncHandler(async (req, res, next) => {
  try {
    const updatedData = {
      ...req.body,
      photo: req.file?.filename,
    };

    const text = await model.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });
    return res.status(200).json({ success: true, data: text });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.findDelete = asyncHandler(async (req, res, next) => {
  try {
    const text = await model.findByIdAndDelete(req.params.id, {
      new: true,
    });
    return res.status(200).json({ success: true, data: text });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.detail = asyncHandler(async (req, res, next) => {
  try {
    const text = await model.findById(req.params.id);
    return res.status(200).json({ success: true, data: text });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.getAll = asyncHandler(async (req, res, next) => {
  try {
    const total = await model.countDocuments();
    const text = await model
      .find()
      .populate({ path: "createUser", select: "name" });
    return res.status(200).json({
      success: true,
      total: total,
      data: text,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.getUserPost = async function loginUserPost(req, res, next) {
  try {
    const posts = await model.find({ createUser: req.userId });
    if (!posts) {
      return res.status(404).json({
        success: false,
        error: "No posts found for this user.",
      });
    }
    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    console.error("Error in loginUserPost:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

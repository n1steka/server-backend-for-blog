const model = require("../models/commentModel");
const asyncHandler = require("../middleware/asyncHandler");

exports.getPostComments = asyncHandler(async (req, res, next) => {
  try {
    const text = await model.find({ postId: req.params.postId }).populate({
      path: "postId",
      select: "title ,  description ",
    });
    return res
      .status(200)
      .json({ success: true, count: text.length, data: text });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, count: text.length, error: error.message });
  }
});
exports.create = asyncHandler(async (req, res, next) => {
  try {
    const user = req.userId;
    const data = {
      ...req.body,
      createUser: user,
    };
    const text = await model.create(data);
    return res.status(200).json({ success: true, data: text });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.update = asyncHandler(async (req, res, next) => {
  try {
    const fileName = req.file.filename;
    console.log(fileName + "********************************");

    const updatedData = {
      ...req.body,
      photo: fileName,
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
    const text = await model.find();
    return res.status(200).json({ success: true, total: total, data: text });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

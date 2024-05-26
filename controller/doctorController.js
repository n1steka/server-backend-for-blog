const model = require("../models/doctor-model");
const asyncHandler = require("../middleware/asyncHandler");

exports.create = asyncHandler(async (req, res, next) => {
  try {
    const user = req.userId;
    const data = {
      ...req.body,
      photo: req.file?.filename,
      createUser: user,
    };
    const text = await model.create(data);
    return res.status(200).json({ success: true, data: text });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.update = asyncHandler(async (req, res) => {
  try {
    const user = req.userId;
    const updatedData = {
      ...req.body,
      photo: req.file ? req.file.filename : undefined,
      createUser: user,
    };

    const text = await model.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
      runValidators: true, // Ensure validation is run on the update
    });

    if (!text) {
      return res
        .status(404)
        .json({ success: false, error: "Document not found" });
    }

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

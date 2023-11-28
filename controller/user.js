const User = require("../models/user");
const asyncHandler = require("../middleware/asyncHandler");

// МОКТА Хэрэглэгч нэмэх хасах
exports.getAllUser = asyncHandler(async (req, res, next) => {
  try {
    const allUser = await User.find();
    const total = await User.countDocuments();
    res.status(200).json({
      success: true,
      count: total,
      data: allUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});
exports.getLoginUserInfo = asyncHandler(async (req, res, next) => {
  try {
    const allText = await User.findById(req.userId);
    return res.status(200).json({
      success: true,
      data: allText,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.createUser = asyncHandler(async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ phone: req.body.phone });
    const existingEmail = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "Утасны дугаар бүртгэлтэй байна",
      });
    }
    if (existingEmail) {
      return res.status(400).json({
        success: false,
        error: "И-мэйл бүртгэлтэй байна",
      });
    }
    const inputData = {
      ...req.body,
      photo:
        req.file?.filename === "null" ? "no photo.jpg" : req.file?.filename,
    };
    const user = await User.create(inputData);
    const token = user.getJsonWebToken();
    res.status(200).json({
      success: true,
      token,
      data: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.Login = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        msg: "Имэйл болон нууц үгээ оруулна уу!",
      });
    } else {
      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return res.status(400).json({
          success: false,
          msg: "Имэйл эсвэл нууц үг буруу байна!",
        });
      }
      const isPasswordValid = await user.checkPassword(password);
      if (!isPasswordValid) {
        return res.status(400).json({
          success: false,
          msg: "Имэйл эсвэл нууц үг буруу байна!",
        });
      }
      const token = user.getJsonWebToken();
      res.status(200).json({
        success: true,
        token,
        data: user,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  try {
    const oldData = await User.findById(req.params.id);

    if (!oldData) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const updatedData = {
      ...req.body,
      photo: req.file ? req.file.filename : oldData.photo,
    };

    const updatedUserData = await User.findByIdAndUpdate(
      req.params.id,
      updatedData,
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      data: updatedUserData,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.userDetail = asyncHandler(async (req, res, next) => {
  try {
    const allText = await User.findById(req.params.id);
    return res.status(200).json({
      success: true,
      data: allText,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.deleteUser = async function deleteUser(req, res, next) {
  try {
    const deletePost = await User.findOneAndDelete(req.params.id, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      msg: "Ажилттай усгагдлаа",
      data: deletePost,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  if (!req.body.email) {
    throw new MyError("Та нууц үг сэргээх имэйл хаягаа дамжуулна уу", 400);
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    throw new MyError(req.body.email + " имэйлтэй хэрэглэгч олдсонгүй!", 400);
  }

  const resetToken = user.generatePasswordChangeToken();
  await user.save();

  // await user.save({ validateBeforeSave: false });

  // Имэйл илгээнэ

  res.status(200).json({
    success: true,
    resetToken,
  });
});
// Энд дуусаж байгаа шүүү

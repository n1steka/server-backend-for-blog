const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
  },
  phone: {
    type: String,
    unique: [true, "Утасны бүртгэлтэй байна"],
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: [6, "Нууц үгийн урт хамгийн багад 6 тэмдэгт байна"],
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin", "operator"],
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now, // Corrected "defualt" to "default"
  },
  photo: {
    type: String,
    default: "no user photo",
  },
  status: {
    type: Boolean,
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.checkPassword = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

userSchema.methods.getJsonWebToken = function () {
  let token = jwt.sign(
    { Id: this._id, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIREDIN,
    }
  );
  return token;
};

UserSchema.methods.generatePasswordChangeToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);

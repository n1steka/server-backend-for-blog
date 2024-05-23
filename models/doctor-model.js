const mongoose = require("mongoose");

const doctorProfileSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  createUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  education: {
    type: String,
  },
  hospital: {
    type: String,
  },
  address: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  phone: {
    type: String,
  },
  photo: {
    type: String,
  },
});

const DoctorProfile = mongoose.model("DoctorProfile", doctorProfileSchema);

module.exports = DoctorProfile;

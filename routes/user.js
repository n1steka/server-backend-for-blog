const express = require("express");
const upload = require("../middleware/fileUpload");

const { protect, authorize } = require("../middleware/protect");
const {
  createUser,
  Login,
  getAllUser,
  updateUser,
  deleteUser,
  userDetail,
  getLoginUserInfo,
  forgotPassword
} = require("../controller/user");
const router = express.Router();
const { getUserPost } = require("../controller/postController");

//"/api/v1/user"
router.route("/").get(getAllUser).post(upload.single("file"), createUser);
router
  .route("/:id")
  .put(upload.single("file"), protect, updateUser) // authorize("admin"), hassan
  .delete(upload.single("file"), protect, deleteUser)
  .get(userDetail); // authorize("admin"), hassan
router.route("/login").post(Login);
router.route("/loginUserInfo").post(protect, getLoginUserInfo);
router.route("/getUser/post").get(protect, getUserPost);
router.route("/forgot-password").get();


module.exports = router;

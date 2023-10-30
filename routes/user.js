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
  loginUserPost,
} = require("../controller/user");
const router = express.Router();

//"/api/v1/user"

router
  .route("/")
  .get(protect, authorize("admin"), getAllUser)
  .post(upload.single("file"), createUser);
router
  .route("/:id")
  .put(upload.single("file"), protect, updateUser) // authorize("admin"), hassan
  .delete(upload.single("file"), protect, deleteUser)
  .get(userDetail); // authorize("admin"), hassan

router.route("/login").post(Login);
router.route("/loginUserPost").get(protect, loginUserPost);
module.exports = router;

express = require("express");
const upload = require("../middleware/fileUpload");
const { protect } = require("../middleware/protect");
const {
  create,
  update,
  detail,
  findDelete,
  getAll,
} = require("../controller/postController");
const router = express.Router();
const { getPostComments } = require("../controller/commentController");
// upload.single("file"),

router.route("/").post(upload.single("file"), protect, create).get(getAll);
router.route("/:id").put(update).delete(findDelete).get(detail);
router.route("/:postId/comments").get(getPostComments);

//"/api/v1/moktaText"
module.exports = router;

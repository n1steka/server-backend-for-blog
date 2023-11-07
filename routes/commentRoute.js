express = require("express");
const upload = require("../middleware/fileUpload");
const { protect } = require("../middleware/protect");
const {
  create,
  update,
  detail,
  findDelete,
  getAll,
  getPostComments,
} = require("../controller/commentController");
const router = express.Router();

// upload.single("file"),

router.route("/").post(protect, upload.single("file"), create).get(getAll);
router.route("/:id").put(update).delete(findDelete).get(detail);
//"/api/v1/moktaText"
module.exports = router;

express = require("express");
const upload = require("../middleware/fileUpload");

const {
  create,
  update,
  detail,
  findDelete,
  getAll,
} = require("../controller/postController");
const router = express.Router();

// upload.single("file"),

router.route("/").post(upload.single("file"), create).get(getAll);
router.route("/:id").put(update).delete(findDelete).get(detail);
//"/api/v1/moktaText"
module.exports = router;

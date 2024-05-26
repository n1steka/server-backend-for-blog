express = require("express");
const upload = require("../middleware/fileUpload");

const {
  create,
  update,
  detail,
  findDelete,
  getAll,
} = require("../controller/doctorController");
const { protect } = require("../middleware/protect");
const router = express.Router();

// upload.single("file"),

router.route("/").post(protect, upload.single("file"), create).get(getAll);
router
  .route("/:id")
  .put(protect, upload.single("file"), update)
  .delete(findDelete)
  .get(detail);
//"/api/v1/moktaText"
module.exports = router;

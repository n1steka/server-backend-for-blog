express = require("express");
const upload = require("../middleware/fileUpload");
const { protect } = require("../middleware/protect");
const {
  create,
  update,
  detail,
  findDelete,
  getAll,
  getCategoryItems,
} = require("../controller/itemController");
const router = express.Router();
const cpUpload = upload.fields([
  { name: "file1" },
  { name: "file2" },
  { name: "file3" },
  { name: "file4" },
  { name: "file5" },
]);
// upload.single("file"),

router.route("/").post(protect, cpUpload, create).get(getAll);
router
  .route("/:id")
  .put(cpUpload, protect, update)
  .delete(findDelete)
  .get(detail);
//"/api/v1/moktaText"
module.exports = router;

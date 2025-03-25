const { addNewView, getAllView, getViewById, updateViewById, deleteViewById } = require("../controllers/views.controller");


const router = require("express").Router();

router.post("/", addNewView);
router.get("/", getAllView);
router.get("/:id", getViewById);
router.put("/:id", updateViewById);
router.delete("/:id", deleteViewById);

module.exports = router;

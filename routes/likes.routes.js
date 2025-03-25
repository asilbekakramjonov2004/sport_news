const { addNewLike, getAllLike, getLikeById, updateLikeById, deleteLikeById } = require("../controllers/likes.controller");


const router = require("express").Router();

router.post("/", addNewLike);
router.get("/", getAllLike);
router.get("/:id", getLikeById);
router.put("/:id", updateLikeById);
router.delete("/:id", deleteLikeById);

module.exports = router;

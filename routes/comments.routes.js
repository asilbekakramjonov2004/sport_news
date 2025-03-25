const { addNewComment, getAllComment, getCommentById, updateCommentById, deleteCommentById } = require("../controllers/comments.controller");


const router = require("express").Router();

router.post("/", addNewComment);
router.get("/", getAllComment);
router.get("/:id", getCommentById);
router.put("/:id", updateCommentById);
router.delete("/:id", deleteCommentById);

module.exports = router;

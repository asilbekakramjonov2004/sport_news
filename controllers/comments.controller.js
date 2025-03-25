const { errorHandler } = require("../helpers/error_handler")


const addNewComment = async (req, res) => {
    try {
        const {user_id, news_id, content, created_at, reply_comment_id, is_approved, is_deleted, views, likes} = req.body;
        const newComment = await pool.query(
            `INSERT INTO comments (user_id, news_id, content, created_at, reply_comment_id, is_approved, is_deleted, views, likes)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [user_id, news_id, content, created_at, reply_comment_id, is_approved, is_deleted, views, likes]
        )
        res
      .status(201)
      .send({
        message: "Yangi comment qo'shildi",
        category: newComment.rows[0],
      });
        
    } catch (error) {
        errorHandler(error, res)
    }
}

const getAllComment = async (req, res) => {
    try {
        const results = await pool.query(
            `SELECT * FROM comments`
        )
    res.send(results.rows);
    } catch (error) {
        errorHandler(error, res)
    }
}

const getCommentById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query(
            `SELECT * FROM comments WHERE id = ${id}`,
        )

        if (result.rows.length === 0) {
            return res.status(404).send({ message: "Comment topilmadi" });
          }
        res.send(result.rows[0]);

    } catch (error) {
        errorHandler(error, res)
    }
}

const updateCommentById = async (req, res) => {
    try {
        const {user_id, news_id, content, created_at, reply_comment_id, is_approved, is_deleted, views, likes} = req.body;
        const id = req.params.id;
        const update = await pool.query(
            `UPDATE comments SET 
            user_id=$1, 
            news_id=$2, 
            content=$3, 
            created_at=$4, 
            reply_comment_id=$5, 
            is_approved=$6, 
            is_deleted=$7, 
            views=$8, 
            likes=$9 WHERE id=${id} RETURNING *`,
            [user_id, news_id, content, created_at, reply_comment_id, is_approved, is_deleted, views, likes]
        )
        if (update.rows.length === 0) {
            return res.status(404).send({ message: "Comment topilmadi" });
          }

    res
      .status(200)
      .send({
        message: "Comment muvaffaqqiyatli yangilandi",
        category: update.rows[0],
      });
    } catch (error) {
        errorHandler(error, res)
    }
}

const deleteCommentById = async (req, res) => {
    try {
        const id = req.params.id;
        const del = await pool.query(
            `DELETE FROM comments WHERE id = ${id}`
        )
        if (del.rows.length === 0) {
            return res.status(404).send({ message: "Comment topilmadi" });
          }
          res.status(200).send({ message: "Comment muvaffaqqiyatli o'chirildi" });
    } catch (error) {
        errorHandler(error, res)
    }
}

module.exports = {
    addNewComment,
    getAllComment,
    getCommentById,
    updateCommentById,
    deleteCommentById
}
const { errorHandler } = require("../helpers/error_handler")


const addNewLike = async (req, res) => {
    try {
        const {news_id, user_id, liked_at} = req.body;
        const newLike = await pool.query(
            `INSERT INTO likes (news_id, user_id, liked_at)
            VALUES($1, $2, $3) RETURNING *`,
            [news_id, user_id, liked_at]
        )
        res
      .status(201)
      .send({
        message: "Yangi like qo'shildi",
        category: newLike.rows[0],
      });
        
    } catch (error) {
        errorHandler(error, res)
    }
}

const getAllLike = async (req, res) => {
    try {
        const results = await pool.query(
            `SELECT * FROM likes`
        )
    res.send(results.rows);
    } catch (error) {
        errorHandler(error, res)
    }
}

const getLikeById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query(
            `SELECT * FROM likes WHERE id = ${id}`,
        )

        if (result.rows.length === 0) {
            return res.status(404).send({ message: "Like topilmadi" });
          }
        res.send(result.rows[0]);

    } catch (error) {
        errorHandler(error, res)
    }
}

const updateLikeById = async (req, res) => {
    try {
        const {news_id, user_id, liked_at} = req.body;
        const id = req.params.id;
        const update = await pool.query(
            `UPDATE likes SET news_id=$1, user_id=$2, liked_at=$3 WHERE id=$4 RETURNING *`,
            [news_id, user_id, liked_at,id]
        )
        if (update.rows.length === 0) {
            return res.status(404).send({ message: "Like topilmadi" });
          }

    res
      .status(200)
      .send({
        message: "Like muvaffaqqiyatli yangilandi",
        category: update.rows[0],
      });
    } catch (error) {
        errorHandler(error, res)
    }
}

const deleteLikeById = async (req, res) => {
    try {
        const id = req.params.id;
        const del = await pool.query(
            `DELETE FROM likes WHERE id = ${id}`
        )
        if (del.rows.length === 0) {
            return res.status(404).send({ message: "Like topilmadi" });
          }
          res.status(200).send({ message: "Like muvaffaqqiyatli o'chirildi" });
    } catch (error) {
        errorHandler(error, res)
    }
}

module.exports = {
    addNewLike,
    getAllLike,
    getLikeById,
    updateLikeById,
    deleteLikeById
}
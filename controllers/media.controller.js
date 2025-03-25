const { errorHandler } = require("../helpers/error_handler")


const addNewMedia = async (req, res) => {
    try {
        const {news_id, media_type, media_url, uploaded_at} = req.body;
        const newMedia = await pool.query(
            `INSERT INTO media (news_id, media_type, media_url, uploaded_at)
            VALUES($1, $2, $3, $4) RETURNING *`,
            [news_id, media_type, media_url, uploaded_at]
        )
        res
      .status(201)
      .send({
        message: "Yangi media qo'shildi",
        category: newMedia.rows[0],
      });
        
    } catch (error) {
        errorHandler(error, res)
    }
}

const getAllMedia = async (req, res) => {
    try {
        const results = await pool.query(
            `SELECT * FROM media`
        )
    res.send(results.rows);
    } catch (error) {
        errorHandler(error, res)
    }
}

const getMediaById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query(
            `SELECT * FROM media WHERE id = ${id}`,
        )

        if (result.rows.length === 0) {
            return res.status(404).send({ message: "Media topilmadi" });
          }
        res.send(result.rows[0]);

    } catch (error) {
        errorHandler(error, res)
    }
}

const updateMediaById = async (req, res) => {
    try {
        const {news_id, media_type, media_url, uploaded_at} = req.body;
        const id = req.params.id;
        const update = await pool.query(
            `UPDATE media SET news_id=$1, media_type=$2, media_url=$3, uploaded_at=$4 WHERE id=$5 RETURNING *`,
            [news_id, media_type, media_url, uploaded_at,id]
        )
        if (update.rows.length === 0) {
            return res.status(404).send({ message: "Media topilmadi" });
          }

    res
      .status(200)
      .send({
        message: "Media muvaffaqqiyatli yangilandi",
        category: update.rows[0],
      });
    } catch (error) {
        errorHandler(error, res)
    }
}

const deleteMediaById = async (req, res) => {
    try {
        const id = req.params.id;
        const del = await pool.query(
            `DELETE FROM media WHERE id = ${id}`
        )
        if (del.rows.length === 0) {
            return res.status(404).send({ message: "Media topilmadi" });
          }
          res.status(200).send({ message: "Media muvaffaqqiyatli o'chirildi" });
    } catch (error) {
        errorHandler(error, res)
    }
}

module.exports = {
    addNewMedia,
    getAllMedia,
    getMediaById,
    updateMediaById,
    deleteMediaById
}
const { errorHandler } = require("../helpers/error_handler")


const addNewView = async (req, res) => {
    try {
        const {user_id, news_id, viewed_at} = req.body;
        const newView = await pool.query(
            `INSERT INTO views (user_id, news_id, viewed_at)
            VALUES($1, $2, $3) RETURNING *`,
            [user_id, news_id, viewed_at]
        )
        res
      .status(201)
      .send({
        message: "Yangi view qo'shildi",
        category: newView.rows[0],
      });
        
    } catch (error) {
        errorHandler(error, res)
    }
}

const getAllView = async (req, res) => {
    try {
        const results = await pool.query(
            `SELECT * FROM views`
        )
    res.send(results.rows);
    } catch (error) {
        errorHandler(error, res)
    }
}

const getViewById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query(
            `SELECT * FROM views WHERE id = ${id}`,
        )

        if (result.rows.length === 0) {
            return res.status(404).send({ message: "View topilmadi" });
          }
        res.send(result.rows[0]);

    } catch (error) {
        errorHandler(error, res)
    }
}

const updateViewById = async (req, res) => {
    try {
        const {user_id, news_id, viewed_at} = req.body;
        const id = req.params.id;
        const update = await pool.query(
            `UPDATE views SET user_id=$1, news_id=$2, viewed_at=$3 WHERE id=$4 RETURNING *`,
            [user_id, news_id, viewed_at, id]
        )
        if (update.rows.length === 0) {
            return res.status(404).send({ message: "View topilmadi" });
          }

    res
      .status(200)
      .send({
        message: "View muvaffaqqiyatli yangilandi",
        category: update.rows[0],
      });
    } catch (error) {
        errorHandler(error, res)
    }
}

const deleteViewById = async (req, res) => {
    try {
        const id = req.params.id;
        const del = await pool.query(
            `DELETE FROM views WHERE id = ${id}`
        )
        if (del.rows.length === 0) {
            return res.status(404).send({ message: "View topilmadi" });
          }
          res.status(200).send({ message: "View muvaffaqqiyatli o'chirildi" });
    } catch (error) {
        errorHandler(error, res)
    }
}

module.exports = {
    addNewView,
    getAllView,
    getViewById,
    updateViewById,
    deleteViewById
}
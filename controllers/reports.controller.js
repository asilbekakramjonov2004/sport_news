const { errorHandler } = require("../helpers/error_handler")


const addNewReport = async (req, res) => {
    try {
        const { user_id, news_id, reason, status, created_at} = req.body;
        const newReport = await pool.query(
            `INSERT INTO reports (user_id, news_id, reason, status, created_at)
            VALUES($1, $2, $3, $4, $5) RETURNING *`,
            [user_id, news_id, reason, status, created_at]
        )
        res
      .status(201)
      .send({
        message: "Yangi reports qo'shildi",
        category: newReport.rows[0],
      });
        
    } catch (error) {
        errorHandler(error, res)
    }
}

const getAllReport = async (req, res) => {
    try {
        const results = await pool.query(
            `SELECT * FROM reports`
        )
    res.send(results.rows);
    } catch (error) {
        errorHandler(error, res)
    }
}

const getReportById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await pool.query(
            `SELECT * FROM reports WHERE id = ${id}`,
        )

        if (result.rows.length === 0) {
            return res.status(404).send({ message: "Report topilmadi" });
          }
        res.send(result.rows[0]);

    } catch (error) {
        errorHandler(error, res)
    }
}

const updateReportById = async (req, res) => {
    try {
        const {user_id, news_id, reason, status, created_at} = req.body;
        const id = req.params.id;
        const update = await pool.query(
            `UPDATE reports SET user_id=$1, news_id=$2, reason=$3, status=$4, created_at=$5 WHERE id=$6 RETURNING *`,
            [user_id, news_id, reason, status, created_at, id]
        )
        if (update.rows.length === 0) {
            return res.status(404).send({ message: "Report topilmadi" });
          }

    res
      .status(200)
      .send({
        message: "Report muvaffaqqiyatli yangilandi",
        category: update.rows[0],
      });
    } catch (error) {
        errorHandler(error, res)
    }
}

const deleteReportById = async (req, res) => {
    try {
        const id = req.params.id;
        const del = await pool.query(
            `DELETE FROM reports WHERE id = ${id}`
        )
        if (del.rows.length === 0) {
            return res.status(404).send({ message: "Report topilmadi" });
          }
          res.status(200).send({ message: "Report muvaffaqqiyatli o'chirildi" });
    } catch (error) {
        errorHandler(error, res)
    }
}

module.exports = {
    addNewReport,
    getAllReport,
    getReportById,
    updateReportById,
    deleteReportById
}
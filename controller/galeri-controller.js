const pool = require("../database/database")
const galeriController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from galeri")
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("select * from galeri where id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    create: async (req, res) => {
        const { namagaleri, urlgambar, deskripsi, videogaleri } = req.body;
        const sql = "INSERT INTO galeri (namagaleri, urlgambar, deskripsi, videogaleri) VALUES (?, ?, ?, ?)";
    
        const connection = await pool.getConnection();
    
        try {
            await connection.beginTransaction();
    
            const [rows, fields] = await connection.query(sql, [namagaleri, urlgambar, deskripsi, videogaleri]);
    
            await connection.commit();
    
            res.json({
                data: rows
            });
        } catch (error) {
            await connection.rollback();
            console.log(error);
            res.json({
                status: "error"
            });
        } finally {
            connection.release();
        }
    },

    
    update: async (req, res) => {
        try {
            const { namagaleri, urlgambar, deskripsi, videogaleri } = req.body
            const { id } = req.params
            const sql = "update galeri set namagaleri = ?, urlgambar = ?, deskripsi = ?, videogaleri = ? where id = ?"
            const [rows, fields] = await pool.query(sql, [namagaleri, urlgambar, deskripsi, videogaleri, id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }, 
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("delete from galeri where id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }

}

module.exports = galeriController
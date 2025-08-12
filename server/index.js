import express from "express"
import { pool } from "./connection_db.js"

const app = express()
app.use(express.json()) // permite que Express interprete automáticamente el body en JSON cuando recibes una petición POST o PUT.


app.get('/facturas', async (req, res) => {
    try {
        const [rows] = await pool.query(`
        SELECT 
            f.numero,
            f.periodo,
            c.nombre as nombre_cliente,
            f.monto
        FROM facturas f
        left JOIN clientes c ON f.id = c.id
        left JOIN transacciones t ON f.id = t.id
        `);

        res.json(rows);

    } catch (error) {
        res.status(500).json({
            status: 'error',
            endpoint: req.originalUrl,
            method: req.method,
            message: error.message
        });
    }
});

app.get('/facturas/:id', async (req, res) => {
    try {
        const { id } = req.params

        const [rows] = await pool.query(`
        SELECT 
            f.numero,
            f.periodo,
            c.nombre as nombre_cliente,
            f.monto
        FROM facturas f
        left JOIN clientes c ON f.id = c.id
        left JOIN transacciones t ON f.id = t.id
        `, [id]);

        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({
            status: 'error',
            endpoint: req.originalUrl,
            method: req.method,
            message: error.message
        });
    }
});

app.post('/clientes', async (req, res) => {
    try {
        const {
            numero_identificacion,
            nombre,direccion,
            telefono,
            correo_electronico,
            plataforma_utilizada
        } = req.body

        const query = `
            INSERT INTO clientes 
            (numero_identificacion,nombre,direccion,telefono,correo_electronico,plataforma_utilizada)
            VALUES (?, ?, ?, ?, ?, ?)
        `
        const values = [
            numero_identificacion,
            nombre,direccion,
            telefono,
            correo_electronico,
            plataforma_utilizada
        ]

        const result = await pool.query(query, values)

        res.status(201).json({
            mensaje: "prestamo creado exitosamente"
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            endpoint: req.originalUrl,
            method: req.method,
            message: error.message
        });
    }
});

app.delete('/clientes/:id', async (req, res) => {
    try {
        const { id } = req.params

        const query = `
        DELETE FROM clientes WHERE id = ?
        `
        const values = [
            id
        ]

        const [result] = await pool.query(query, values)

        if (result.affectedRows != 0) {
            return res.json({ mensaje: "cliente eliminado" })
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            endpoint: req.originalUrl,
            method: req.method,
            message: error.message
        });
    }




})

//Inicio del servidor cuando este todo listo
app.listen(3000, () => {
    console.log("servidor prepado correctamente en http://localhost:3000");
})
/*se encarga de cargar los clients a la base de datos*/
import fs from 'fs'; // es la que me permite leer archivos
import path from 'path'; // esta muestra la ruta actual
import csv from 'csv-parser';
import { pool } from "../connection_db.js"


export async function load_clientes() {

    const path_csv = path.resolve('./docs/CSV/2_clientes.csv');
    const clients = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(path_csv)
            .pipe(csv())
            .on("data", (fila) => {
                clients.push([
                    fila.numero_identificacion.trim(),
                    fila.nombre,
                    fila.direccion,
                    fila.telefono,
                    fila.correo_electronico,
                    fila.plataforma_utilizada,
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO clientes (numero_identificacion,nombre,direccion,telefono,correo_electronico,plataforma_utilizada) VALUES ?';
                    const [result] = await pool.query(sql, [clients]);

                    console.log(`✅ Se insertaron ${result.affectedRows} autores.`);
                    resolve(); // Termina exitosamente
                } catch (error) {
                    console.error('❌ Error al insertar clients:', error.message);
                    reject(error);
                }
            })
            .on('error', (err) => {
                console.error('❌ Error al leer el archivo CSV de clients:', err.message);
                reject(err);
            });
    });
}
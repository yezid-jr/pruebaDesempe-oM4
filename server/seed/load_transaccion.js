/*se encarga de cargar los transacciones a la base de datos*/
import fs from 'fs'; // es la que me permite leer archivos
import path from 'path'; // esta muestra la ruta actual
import csv from 'csv-parser';
import { pool } from "../connection_db.js"


export async function load_transaction() {

    const path_csv = path.resolve('./docs/CSV/3_transacciones.csv');
    const transacciones = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(path_csv)
            .pipe(csv())
            .on("data", (fila) => {
                transacciones.push([
                    fila.id,
	                fila.fecha_hora,
	                fila.monto,
	                fila.estado,
	                fila.tipo
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO transacciones (id,fecha_hora,monto,estado,tipo) VALUES ?';
                    const [result] = await pool.query(sql, [transacciones]);

                    console.log(`✅ Se insertaron ${result.affectedRows} autores.`);
                    resolve(); // Termina exitosamente
                } catch (error) {
                    console.error('❌ Error al insertar transacciones:', error.message);
                    reject(error);
                }
            })
            .on('error', (err) => {
                console.error('❌ Error al leer el archivo CSV de transacciones:', err.message);
                reject(err);
            });
    });
}
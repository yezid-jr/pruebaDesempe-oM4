/*se encarga de cargar los bill a la base de datos*/
import fs from 'fs'; // es la que me permite leer archivos
import path from 'path'; // esta muestra la ruta actual
import csv from 'csv-parser';
import { pool } from "../connection_db.js"


export async function load_bill() {

    const path_csv = path.resolve('./docs/CSV/1_factura.csv');
    const bill = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream(path_csv)
            .pipe(csv())
            .on("data", (fila) => {
                bill.push([
                    fila.id,
	                fila.numero,
                    fila.periodo,
                    fila.monto,
                    fila.monto_pagado,
                    fila.id_cliente,
                    fila.id_transaccion
                ]);
            })
            .on('end', async () => {
                try {
                    const sql = 'INSERT INTO facturas (id,numero,periodo,monto,monto_pagado,id_cliente,id_transaccion) VALUES ?';
                    const [result] = await pool.query(sql, [bill]);

                    console.log(`✅ Se insertaron ${result.affectedRows} autores.`);
                    resolve(); // Termina exitosamente
                } catch (error) {
                    console.error('❌ Error al insertar bill:', error.message);
                    reject(error);
                }
            })
            .on('error', (err) => {
                console.error('❌ Error al leer el archivo CSV de bill:', err.message);
                reject(err);
            });
    });
}
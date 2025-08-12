import { load_clientes } from "./load_clientes.js";
import {load_transaction} from "./load_transaccion.js"
import {load_bill} from "./load_bill.js"

(async () => {
    try {
        console.log('🚀 Iniciando seeders...');

        // await load_clientes();
        // await load_transaction();
        await load_bill();

        console.log('✅ Todos los seeders ejecutados correctamente.');
    } catch (error) {
        console.error('❌ Error ejecutando los seeders:', error.message);
    } finally {
        process.exit();
    }
})()
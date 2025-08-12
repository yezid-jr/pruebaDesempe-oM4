import mysql from "mysql2/promise.js"

export const pool = mysql.createPool({
    host: "127.0.0.1",
    database: "ExpertSoft",
    port: "3306",
    user: "root",
    password: "Qwe.123*",
    connectionLimit: 10,        // Máximo número de conexiones activas al mismo tiempo
    waitForConnections: true,   // Si se alcanza el límite, las nuevas peticiones esperan su turno
    queueLimit: 0               // Número máximo de peticiones en espera (0 = sin límite)
})
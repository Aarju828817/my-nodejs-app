// import { drizzle } from "drizzle-orm/mysql2"
import mysql from "mysql2/promise"
// import * as schema from "../../schema"

const connection = mysql.createConnection({
   host: process.env.DATABASE_HOST,
   user: process.env.DATABASE_USER,
   password: process.env.DATABASE_PASSWORD,
   database: process.env.DATABASE_NAME,
})

// const getConnection = async () => {

//    return connection
// }

// const db = drizzle(getConnection(), { schema: schema, mode: "default" })

export default connection

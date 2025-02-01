import "dotenv/config";

export default {
  schema: "./schema/*",
  out: "./drizzle",
  dialect: "mysql",
  driver: "mysql2",
  dbCredentials: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  },
};

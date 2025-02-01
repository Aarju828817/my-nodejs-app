import { mysqlTable, serial, text, date, timestamp, int } from "drizzle-orm/mysql-core"

export const accounts = mysqlTable("jili_games_accounts", {
   id: serial("id").primaryKey(),
   name: text("name"),
   userId: int("user_id"),
   // secretKey: text("secret_key"),
   ipAddress: text("ip_address"),
   createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
})

export const logs = mysqlTable("logs", {
   id: serial("id").primaryKey(),
   accountId: int("account_id"),
   serviceName: int("service_name"),
   url: text("url"),
   type: text("type"),
   message: text("message"),
   title: text("title"),
   createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
})

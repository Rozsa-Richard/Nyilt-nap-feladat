import Database from "better-sqlite3";
const db = new Database("./data/db.sqlite");

export default db;
import { type SQLiteDatabase } from "expo-sqlite"

export async function initializeDatabase(database: SQLiteDatabase) {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS occurrences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      photo BLOB,
      location TEXT NOT NULL
    );
  `)
}

import { type SQLiteDatabase } from "expo-sqlite"

export async function initializeDatabase(database: SQLiteDatabase) {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL
    );
  `)
}

// export async function initializeDatabase(database: SQLiteDatabase) {
//   await database.execAsync(`
//     CREATE TABLE IF NOT EXISTS ocurrences (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       title TEXT NOT NULL,
//       name TEXT NOT NULL,
//       name TEXT NOT NULL,
//       name TEXT NOT NULL,
//       name TEXT NOT NULL,
//       quantity INTEGER NOT NULL
//     );
//   `)
// }

import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase(database: SQLiteDatabase) {

  // await database.execAsync(`
  //   DROP TABLE occurrences
  // `);

  // await database.execAsync(`
  //   DROP TABLE images
  // `);

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS occurrences (
      id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      id_photo INTEGER,
      location TEXT NOT NULL
    );
  `);

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS images (
      id_photo INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
      photo BLOB
    );
  `);
}

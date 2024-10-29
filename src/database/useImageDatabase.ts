import { useSQLiteContext } from "expo-sqlite"

export type ImageDatabase = {
  id_photo: number
  photo: Uint8Array
}

export function useImageDatabase() {
  const database = useSQLiteContext()

  async function createImage(data: Omit<ImageDatabase, "id_photo">) {
    const statement = await database.prepareAsync(
      "INSERT INTO images (photo) VALUES ($photo)"
    );
  
    try {
      const result = await statement.executeAsync({
        $photo: data.photo
      });

      const insertedRowId = result.lastInsertRowId;
      return { insertedRowId };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }
  

  async function searchById(id_photo: number) {
    try {
      const query = "SELECT * FROM occurrences WHERE id_photo = ?"

      const response = await database.getAllAsync<ImageDatabase>(
        query,
        `%${id_photo}%`
      )
      return response
    } catch (error) {
      throw error
    }
  }

  async function update(data: ImageDatabase) {
    const statement = await database.prepareAsync(
      "UPDATE occurrences SET photo = $photo WHERE id_photo = $id_photo"
    )

    try {
      await statement.executeAsync({
        $photo: data.photo
      })
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function remove(id_photo: number) {
    try {
      await database.execAsync("DELETE FROM occurrences WHERE id_photo = " + id_photo)
    } catch (error) {
      throw error
    }
  }

  async function show(id_photo: number) {
    try {
      const query = "SELECT * FROM occurrences WHERE id_photo = ?"

      const response = await database.getFirstAsync<ImageDatabase>(query, [
        id_photo,
      ])

      return response
    } catch (error) {
      throw error
    }
  }

  return { createImage, searchById, update, remove, show }
}

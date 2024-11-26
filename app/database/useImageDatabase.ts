import { useSQLiteContext } from "expo-sqlite"

export type ImageDatabase = {
  id_photo: number
  photo: Uint8Array
}

function uint8ArrayToBase64(buffer: Uint8Array) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToUint8Array(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
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

  async function getImageById(id_photo: number) {
    try {
      const query = "SELECT * FROM images WHERE id_photo = ?";
      const response = await database.getFirstAsync<ImageDatabase & { photo: string }>(query, [id_photo]);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async function getAllImagesById(id_photo: number) {
    try {
      const query = "SELECT * FROM images WHERE id_photo = ?"

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
      "UPDATE images SET photo = $photo WHERE id_photo = $id_photo"
    )

    try {
      await statement.executeAsync({
        $photo: data.photo,
        $id_photo: data.id_photo
      })
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function remove(id_photo: number) {
    try {
      await database.execAsync("DELETE FROM images WHERE id_photo = " + id_photo)
    } catch (error) {
      throw error
    }
  }

  async function show(id_photo: number) {
    try {
      const query = "SELECT * FROM images WHERE id_photo = ?"

      const response = await database.getFirstAsync<ImageDatabase>(query, [
        id_photo,
      ])

      return response
    } catch (error) {
      throw error
    }
  }

  return { createImage, getImageById, update, remove, show }
}

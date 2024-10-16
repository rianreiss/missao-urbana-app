import { useSQLiteContext } from "expo-sqlite"

export type OccurrenceDatabase = {
  id: number
  category: string
  description: string
  photo: string
  location: string
}

export function useOccurrenceDatabase() {
  const database = useSQLiteContext()

  async function create(data: Omit<OccurrenceDatabase, "id">) {
    const statement = await database.prepareAsync(
      "INSERT INTO occurrences (category, description, photo, location) VALUES ($category, $description, $photo, $location)"
    )

    try {
      const result = await statement.executeAsync({
        $category: data.category,
        $description: data.description,
        $photo: data.photo,
        $location: data.location
      })

      const insertedRowId = result.lastInsertRowId.toLocaleString()

      return { insertedRowId }
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function searchByCategory(category: string) {
    try {
      const query = "SELECT * FROM occurrences WHERE category LIKE ?"

      const response = await database.getAllAsync<OccurrenceDatabase>(
        query,
        `%${category}%`
      )

      return response
    } catch (error) {
      throw error
    }
  }

  async function update(data: OccurrenceDatabase) {
    const statement = await database.prepareAsync(
      "UPDATE occurrences SET category = $category, description = $description, photo = $photo, location = $location WHERE id = $id"
    )

    try {
      await statement.executeAsync({
        $category: data.category,
        $description: data.description,
        $photo: data.photo,
        $location: data.location
      })
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function remove(id: number) {
    try {
      await database.execAsync("DELETE FROM occurrences WHERE id = " + id)
    } catch (error) {
      throw error
    }
  }

  async function show(id: number) {
    try {
      const query = "SELECT * FROM occurrences WHERE id = ?"

      const response = await database.getFirstAsync<OccurrenceDatabase>(query, [
        id,
      ])

      return response
    } catch (error) {
      throw error
    }
  }

  return { create, searchByCategory, update, remove, show }
}

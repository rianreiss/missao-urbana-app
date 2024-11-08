import { useState, useEffect } from "react"
import { View, Text } from "react-native"
import { useLocalSearchParams } from "expo-router"

import { useOccurrenceDatabase } from "@/database/useOccurrenceDatabase"

export default function Details() {
  const [data, setData] = useState({
    category: "",
    description: "",
    idPhoto: 0,
    location: "",
  })

  const occurrenceDatabase = useOccurrenceDatabase()
  const params = useLocalSearchParams<{ id: string }>()

  useEffect(() => {
    if (params.id) {
      occurrenceDatabase.show(Number(params.id)).then((response) => {
        if (response) {
          setData({
            category: response.category,
            description: response.description,
            idPhoto: response.idPhoto,
            location: response.location,
          })
        }
      })
    }
  }, [params.id])

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 32 }}>ID: {params.id} </Text>

      <Text style={{ fontSize: 32 }}>Quantidade: {data.category}</Text>

      <Text style={{ fontSize: 32 }}>Nome: {data.description}</Text>

      <Text style={{ fontSize: 32 }}>Quantidade: {data.idPhoto}</Text>

      <Text style={{ fontSize: 32 }}>Nome: {data.location}</Text>
    </View>
  )
}

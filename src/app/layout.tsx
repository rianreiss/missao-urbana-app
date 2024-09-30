import { useEffect, useState } from "react"
import { View, Button, Alert, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native"
import { router, Link } from "expo-router"

import { Input } from "@/components/Input"
import { Product } from "@/components/Product"

import OcurrenceForm from '@/components/OcurrenceForm'

import {
  useProductDatabase,
  ProductDatabase,
} from "@/database/useProductDatabase"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Index() {
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [search, setSearch] = useState("")
  const [products, setProducts] = useState<ProductDatabase[]>([])

  const productDatabase = useProductDatabase()

  async function create() {
    try {
      if (isNaN(Number(quantity))) {
        return Alert.alert("Quantidade", "A quantidade precisa ser um número!")
      }

      const response = await productDatabase.create({
        name,
        quantity: Number(quantity),
      })

      Alert.alert("Produto cadastrado com o ID: " + response.insertedRowId)
    } catch (error) {
      console.log(error)
    }
  }

  async function update() {
    try {
      if (isNaN(Number(quantity))) {
        return Alert.alert("Quantidade", "A quantidade precisa ser um número!")
      }

      const response = await productDatabase.update({
        id: Number(id),
        name,
        quantity: Number(quantity),
      })

      Alert.alert("Produto atualizado!")
    } catch (error) {
      console.log(error)
    }
  }

  async function list() {
    try {
      const response = await productDatabase.searchByName(search)
      setProducts(response)
    } catch (error) {
      console.log(error)
    }
  }

  async function remove(id: number) {
    try {
      await productDatabase.remove(id)
      await list()
    } catch (error) {
      console.log(error)
    }
  }
  
  async function handleSave() {
    if (id) {
      update()
    } else {
      create()
    }

    setId("")
    setName("")
    setQuantity("")
    await list()
  }

  return (
    <SafeAreaView style={styles.container}>

        <Link href={"/"} style={styles.button}>
            <Text style={styles.buttonText}>Voltar</Text>
        </Link>

      <OcurrenceForm></OcurrenceForm>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title1: {
    color: 'white',
    marginTop: 0,
    margin: 5,
    fontSize: 15,
    fontWeight: 'bold'
  },
  title2: {
    color: 'white',
    marginTop: 0,
    margin: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: '#1A1A1A',
    // backgroundColor: '#646464',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    // backgroundColor: '#f5f5f5', // Cor de fundo
  },
  // { backgroundColor: 'black', flex: 1, justifyContent: "center", padding: 32, gap: 16 }
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'space-around', // Espaçamento igual entre os botões
  },
  buttonText: {
    color: '#fff', // Cor do texto
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#fcbc24', // Cor de fundo do botão
    // backgroundColor: '#dcac34', // Cor de fundo do botão
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: 'center', // Centraliza o texto no botão
  },
  spacer: {
    margin: 10
  }
})
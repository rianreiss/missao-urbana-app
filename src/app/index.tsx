import { useEffect, useState } from "react"
import { View, Button, Alert, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native"
import { router, Link } from "expo-router"
import { Camera } from 'expo-camera'

import { Input } from "@/components/Input"
import { Product } from "@/components/Product"

import OcurrenceForm from '@/components/OcurrenceForm'

import {
  useOccurrenceDatabase,
  OccurrenceDatabase,
} from "@/database/useOccurrenceDatabase"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Index() {
  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [search, setSearch] = useState("")
  const [products, setProducts] = useState<OccurrenceDatabase[]>([])

  const occurrenceDatabase = useOccurrenceDatabase()

  async function create() {
    try {
      if (isNaN(Number(quantity))) {
        return Alert.alert("Quantidade", "A quantidade precisa ser um número!")
      }

      const response = await occurrenceDatabase.create({
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

      const response = await occurrenceDatabase.update({
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
      const response = await occurrenceDatabase.searchByName(search)
      setProducts(response)
    } catch (error) {
      console.log(error)
    }
  }

  async function remove(id: number) {
    try {
      await occurrenceDatabase.remove(id)
      await list()
    } catch (error) {
      console.log(error)
    }
  }

  function details(item: OccurrenceDatabase) {
    setId(String(item.id))
    setName(item.name)
    setQuantity(String(item.quantity))
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

  useEffect(() => {
    list()
  }, [search])

  const handleButtonPress = (buttonName: string) => {
    console.log(`${buttonName} pressionado`);
    // Aqui você pode adicionar a navegação ou lógica correspondente
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Input placeholder="Nome" onChangeText={setName} value={name} />
      <Input
        placeholder="Quantidade"
        onChangeText={setQuantity}
        value={quantity}
      />

      <Button title="Salvar" onPress={handleSave} />

      <Input placeholder="Pesquisar" onChangeText={setSearch} /> */}

      <View style={styles.spacer}></View>

      <View>
        <Text style={styles.title1}>Bem-vindo(a) ao</Text>
        <Text style={styles.title2}>Missão Urbana App</Text>
      </View>

      <View style={styles.spacer}></View>
      <View style={styles.spacer}></View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Meu Perfil')}>
          <Text style={styles.buttonText}>Meu Perfil</Text>
        </TouchableOpacity>

        <Link href={"/ocurrenceList"} style={styles.button}>
          <TouchableOpacity onPress={() => handleButtonPress('Nova Ocorrência')}>
            <Text style={styles.buttonText}>Minhas Ocorrências</Text>
          </TouchableOpacity>
        </Link>

        <Link href={"/layout"} style={styles.button}>
          <TouchableOpacity onPress={() => handleButtonPress('Nova Ocorrência')}>
            <Text style={styles.buttonText}>Nova Ocorrência</Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Notícias')}>
          <Text style={styles.buttonText}>Notícias</Text>
        </TouchableOpacity>
      </View>

      {/* <OcurrenceForm /> */}

      {/* <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Product
            data={item}
            onPress={() => details(item)}
            onDelete={() => remove(item.id)}
            onOpen={() => router.navigate("/details/" + item.id)}
          />
        )}
        contentContainerStyle={{ gap: 16 }}
      /> */}
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
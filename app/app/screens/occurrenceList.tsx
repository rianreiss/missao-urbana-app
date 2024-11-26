import { useEffect, useState } from "react"
import LayoutAlernative from '@/app/layoutAlternative';
import { View, Button, Alert, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native"
import { useRouter, Link } from "expo-router"

import { Input } from "@/components/Input"
import { Occurrence } from "@/components/Occurrence"

import OcurrenceForm from '@/app/screens/occurrenceForm'

import {
  useOccurrenceDatabase,
  OccurrenceDatabase,
} from "@/database/useOccurrenceDatabase"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Index() {
  const router = useRouter();
  const [id, setId] = useState("")
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [idPhoto, setIdPhoto] = useState<number>(0);
  const [location, setLocation] = useState('');
  const [search, setSearch] = useState("")
  const [occurrences, setOccurrences] = useState<OccurrenceDatabase[]>([])

  const productDatabase = useOccurrenceDatabase()

  const goBack = () => {
    router.push('/');
  };

  useEffect(() => {
    list();
  }, []);  

  async function list() {
    try {
      const response = await productDatabase.searchAll()
      console.log(response);
      setOccurrences(response)
    } catch (error) {
      console.log(error)
    }
  }
  
  async function update() {
    try {
      // if (isNaN(Number(quantity))) {
      //   return Alert.alert("Quantidade", "A quantidade precisa ser um número!")
      // }

      const response = await productDatabase.update({
        id: Number(id),
        category,
        description,
        idPhoto,
        location
      })

      Alert.alert("Ocorrência atualizada!")
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
    }

    setId("")
    setCategory("")
    setDescription("")
    setIdPhoto(0)
    setLocation("")
    await list()
  }

  function details(item: OccurrenceDatabase): void {
    throw new Error("Function not implemented.")
  }

  return (
    <LayoutAlernative title='Minhas Ocorrências'>
      <View style={styles.container}>

        <View style={styles.backContainer}>
          <TouchableOpacity style={styles.button} onPress={() => goBack()}>
            <Text style={[styles.buttonText, { fontSize: 14 }]}>Voltar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
        data={occurrences}
        style={styles.flatList}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Occurrence
            data={item}
            onPress={() => details(item)}
            onDelete={() => remove(item.id)}
            onOpen={() => router.navigate("/details/" + item.id)}
          />
        )}
        contentContainerStyle={{ gap: 16 }}
        />
      </View>
    </LayoutAlernative>
  )
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#1A1A1A',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    gap: 10,
  },
  backContainer: {
    width: '100%',
    alignItems: "flex-end",
  },

  flatList: {
    width: '100%',
    borderRadius: 5,
  },

  button: {
    width: 'auto',
    backgroundColor: '#fcbc24',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,                // sombra para Android
    shadowColor: '#fff',         // sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2 ,
    shadowRadius: 8,
  },
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
  button1: {
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
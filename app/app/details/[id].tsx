import { useState, useEffect } from "react"
import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { useLocalSearchParams } from "expo-router"
import { useRouter } from "expo-router";
import Layout from '@/app/layout';

import {
  useOccurrenceDatabase,
} from "@/database/useOccurrenceDatabase"
import { useImageDatabase } from "@/database/useImageDatabase";

export default function Details() {
  const [categoryHandled, setCategoryHandled] = useState('');
  const router = useRouter();
  const [data, setData] = useState({
    category: "Categoria ainda carregando...",
    description: "",
    id_photo: 0,
    location: "",
  });
  const imageDatabase = useImageDatabase();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [idPhoto, setIdPhoto] = useState<number>(0);

  const occurrenceDatabase = useOccurrenceDatabase()
  const params = useLocalSearchParams<{ id: string }>()

  const goBack = () => {
    router.push('/app/screens/occurrenceList');
  };

  const fetchImage = async (id: number) => {
    try {
      const imageData = await imageDatabase.getImageById(id);
      if (imageData) {
        
        const uint8Array = imageData.photo;
        let binary = '';
        for (let i = 0; i < uint8Array.length; i++) {
          binary += String.fromCharCode(uint8Array[i]);
        }

        const base64Image = `data:image/jpeg;base64,${btoa(binary)}`;
        setImageUri(base64Image);
      }
    } catch (error) {
      console.log("Erro ao buscar a imagem:", error);
    }
  };

  useEffect(() => {
    if (params.id) {
      occurrenceDatabase.show(Number(params.id)).then((response) => {

        const dropdownData = [
          { label: 'Asfalto / Calçada / Outros', value: '1' },
          { label: 'Poste / Fios / Outros', value: '2' },
          { label: 'Denúncia', value: '3' },
          { label: 'Esclarecimento', value: '4' },
          { label: 'Sugestão', value: '5' },
          { label: 'Outros...', value: '6' },
        ];
    
        const category = dropdownData.find((item) => item.value === data.category);
        setCategoryHandled(category ? category.label : 'Categoria ainda carregando...');

        if (response) {
          // console.log({response})
          setData({
            category: response.category,
            description: response.description,
            id_photo: response.id_photo,
            location: response.location,
          })

          fetchImage(data.id_photo);
        }
      })
    }
  })

  return (
    <Layout title='Detalhes da Ocorrência'>

      <View style={styles.backContainer}>
        <TouchableOpacity style={styles.button} onPress={() => goBack()}>
          <Text style={[styles.buttonText, { fontSize: 14 }]}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.backContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.navigate("../screens/" + params.id)}>
          <Text style={[styles.buttonText, { fontSize: 14 }]}>Editar</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={{ backgroundColor: 'white', flex: 1, justifyContent: "center", alignItems: "center" }}> */}
      <View style={styles.container}>

        <Text style={styles.textTitle}>Cateoria: {categoryHandled}</Text>
        {imageUri ? (
              <View style={styles.imageLabel}>
                <Image source={{ uri: imageUri }} style={styles.image} />
              </View>
            ) : <Text style={{ color: 'white' }}>Carregando Imagem...</Text>
        }
          
        <Text style={styles.textDescription}>{data.description}</Text>
        <Text style={styles.textDescription}>Localização: <Text style={styles.text}>{data.location}</Text></Text>
        {/* {() => router.navigate("../details/" + item.id)} */}
      </View>
    </Layout>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#363636',
    padding: 10,
    width: '100%',
    gap: 20,
  },
  backContainer: {
    width: '100%',
    alignItems: "flex-end",
    marginBottom: 10,
  },
  formContainer: {
    width: '100%',
    height: '100%',
    alignItems: "center",
    paddingTop: 10,
    gap: 20
  },
  textTitle: {
    color: 'white', // Cor do texto
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    width: '100%'
  },
  textDescription: {
    color: 'white', // Cor do texto
    fontSize: 16,
    textAlign: 'left',
    width: '100%'
  },
  text: {
    color: 'white', // Cor do texto
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'white', // Cor do texto
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    width: 'auto',
    backgroundColor: '#fcbc24',
    paddingVertical: 8,
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
  imageLabel: {
    width: '100%',
    alignItems: "center",
    gap: 10
  },
  image: {
    width: 250,
    height: 300,
    borderWidth: 1,
    borderColor: "#fcbc24",
  },
})
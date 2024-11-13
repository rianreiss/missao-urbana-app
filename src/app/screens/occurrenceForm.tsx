import React, { useState, useEffect } from 'react';
import Layout from '@/app/layout';
import { Image, View, TextInput, Text, StyleSheet, Alert, TouchableOpacity, Modal } from 'react-native';
import { CameraComponent } from "@/components/CameraComponent"
import DropdownButton from '@/components/DropdownButton';
import { useRouter } from "expo-router";
import {
  useOccurrenceDatabase,
  OccurrenceDatabase,
} from "@/database/useOccurrenceDatabase"
import { useImageDatabase } from "@/database/useImageDatabase";

const OcurrenceForm: React.FC = () => {
  const router = useRouter();
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [idPhoto, setIdPhoto] = useState<number>(0);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [location, setLocation] = useState('');
  const [erro, setErro] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [occurrence, setOccurrenceroducts] = useState<OccurrenceDatabase[]>([]);
  const occurrenceDatabase = useOccurrenceDatabase()
  const imageDatabase = useImageDatabase();

  const goBack = () => {
    router.push('/');
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value); // Atualiza o estado da categoria com o valor do dropdown
  };

  const handleImageTaked = (id: number) => {
    setIdPhoto(id);
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
    if (idPhoto !== 0) {
      fetchImage(idPhoto);
    }
  }, [idPhoto]);


  async function create() {
    try {
      const response = await occurrenceDatabase.create({
        category,
        description,
        idPhoto,
        location
      })

      Alert.alert("Ocorrência registrada. Salve o ID para acompanhar: " + response.insertedRowId)

      goBack();
    } catch (error) {
      console.log(error)
    }
  }

  const validarFormulario = () => {
    if (!category || !description || idPhoto == 0 || !location) {
      setErro('Todos os campos são obrigatórios!');

      setTimeout(() => {
        setErro('');
      }, 1500);

      return false;
    }
    setErro('');
    return true;
  };

  const handleSubmit = () => {
    console.log('Valor selecionado:', category);

    if (validarFormulario()) {

      create();

      console.log('Ocorrência enviada:', { category, description, idPhoto, location });
      setCategory('');
      setDescription('');
      setIdPhoto(0);
      setLocation('');
      setImageUri(null);
    }
  };

  const handleCategory = () => {
    console.log({DropdownButton})

  }


  return (
    <Layout title='Formulário de Ocorrência'>

      <View style={styles.container}>

        <View style={styles.backContainer}>
          <TouchableOpacity style={styles.button} onPress={() => goBack()}>
            <Text style={[styles.buttonText, { fontSize: 14 }]}>Voltar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>

          <View style={styles.label}>
            <Text style={styles.inputText}>Categoria</Text>

            <DropdownButton onSelectCategory={handleCategoryChange}/>
          </View>

          <View style={styles.label}>
            <Text style={styles.inputText}>Descrição</Text>

            <TextInput
              style={styles.input}
              value={description}
              onChangeText={setDescription}
              multiline
            />
          </View>

          <View style={styles.label}>
            <Text style={styles.inputText}>Foto</Text>

            {imageUri ? (
              <View style={styles.imageLabel}>
                <Image source={{ uri: imageUri }} style={styles.image} />

                <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                  <Text style={styles.buttonText}>Refazer a foto</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.imageLabel}>
                <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
                  <Text style={styles.buttonText}>Tirar foto</Text>
                </TouchableOpacity>
              </View>
            )}

            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>

                  <CameraComponent onClose={() => setModalVisible(false)} onTakeImage={handleImageTaked}></CameraComponent>

                </View>
              </View>
            </Modal>
          </View>

          <View style={styles.label}>
            <Text style={styles.inputText}>Endereço</Text>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
            />
          </View>

          {erro ? <Text style={styles.error}>{erro}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Registrar</Text>
          </TouchableOpacity>
        </View>

      </View>
      
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    marginBottom: 30,
  },
  backContainer: {
    width: '100%',
    alignItems: "flex-end",
  },
  formContainer: {
    width: '100%',
    height: '100%',
    alignItems: "center",
    paddingTop: 10,
    gap: 20
  },
  label: {
    width: '100%',
    alignItems: "flex-start",
  },
  inputText: {
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    width: '100%',
    minHeight: 40,
    height: 'auto',
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "#999",
    padding: 10,
    fontSize: 16,
    color: 'white',
  },
  imageLabel: {
    width: '100%',
    alignItems: "center",
    gap: 10
  },
  image: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: "#fcbc24",
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    flex: 0.8,
    width: '90%',
    padding: 15,
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#363636',
    borderWidth: 1,
    borderColor: '#fcbc24',
    borderRadius: 10,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: 'black', // Cor do texto
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
  }
});

export default OcurrenceForm;
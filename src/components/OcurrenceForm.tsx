import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TextInputProps, TouchableOpacity, Modal } from 'react-native';
import { CameraComponent } from "@/components/Camera"
import DropdownButton from '@/components/DropdownButton';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import {
  useOccurrenceDatabase,
  OccurrenceDatabase,
} from "@/database/useOccurrenceDatabase"

const OcurrenceForm: React.FC = () => {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [idPhoto, setIdPhoto] = useState<number | null>(null);
  const [location, setLocation] = useState('');
  const [erro, setErro] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [occurrence, setOccurrenceroducts] = useState<OccurrenceDatabase[]>([]);

  const occurrenceDatabase = useOccurrenceDatabase()

  const handleCategoryChange = (value: string) => {
    setCategory(value); // Atualiza o estado da categoria com o valor do dropdown
  };

  const handleImageTaked = (id: number) => {
    setIdPhoto(id);
  };

  async function create() {
    try {
      const response = await occurrenceDatabase.create({
        category,
        description,
        idPhoto,
        location
      })

      Alert.alert("Ocorrência registrada. Salve o ID para acompanhar: " + response.insertedRowId)
    } catch (error) {
      console.log(error)
    }
  }

  const validarFormulario = () => {
    if (!category || !description || idPhoto == 1 || !location) {
      setErro('Todos os campos são obrigatórios!');
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
      setIdPhoto(null);
      setLocation('');
    }
  };

  async function pickImageAndSave(create: Function) {
    // Solicita permissão para acessar a biblioteca de mídia
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }
  
    // Abre a galeria de fotos e retorna a imagem em base64
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true, // Habilita o base64 no retorno
    });
  
    if (!result.canceled) {
      // Chama a função `create` passando a imagem em base64
      create({
        category: 'Some category',
        description: 'Some description',
        idPhoto: result.base64, // Base64 da imagem
        location: 'Some location'
      });
    }
  }
  
  const handleCategory = () => {
    console.log({DropdownButton})

  }


  return (
    <View style={styles.container}>
      <Text style={styles.label}>Categoria</Text>
      <DropdownButton onSelectCategory={handleCategoryChange}/>

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Foto</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Abrir Camera</Text>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>

            <CameraComponent onClose={() => setModalVisible(false)} onTakeImage={handleImageTaked}></CameraComponent>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity onPress={() => setModalVisible(false)}>
        <Text>Cancelar</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Endereço</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
      />

      {erro ? <Text style={styles.error}>{erro}</Text> : null}
      <Button title="Registrar" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 10
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  input: {
    height: 54,
    width: 275,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "#999",
    paddingHorizontal: 16,
    marginBottom: 10,
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
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    backgroundColor: '#7d7d7d',
    borderWidth: 1,
    borderColor: 'white',
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
    color: 'cyan', // Cor do texto
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OcurrenceForm;
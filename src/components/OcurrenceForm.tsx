import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TextInputProps, TouchableOpacity, Modal } from 'react-native';
import { Camera } from "@/components/Camera"
import DropdownButton from '@/components/DropdownButton';

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

import {
  useOccurrenceDatabase,
  OccurrenceDatabase,
} from "@/database/useOccurrenceDatabase"

const OcurrenceForm: React.FC = () => {
  const [category, setCategory] = useState('Selecionar item');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [location, setLocation] = useState('');
  const [erro, setErro] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const validarFormulario = () => {
    if (!category || !description || !photo || !location) {
      setErro('Todos os campos são obrigatórios!');
      return false;
    }
    setErro('');
    return true;
  };

  const handleSubmit = () => {
    if (validarFormulario()) {
      console.log('Ocorrência enviada:', { category, description, photo, location });
      setCategory('');
      setDescription('');
      setPhoto('');
      setLocation('');
    }
  };

  const dropdownData = [
    { label: 'Asfalto / Calçada / Outros', value: '1' },
    { label: 'Poste / Fios / Outros', value: '2' },
    { label: 'Denúncia', value: '3' },
    { label: 'Esclarecimento', value: '4' },
    { label: 'Sugestão', value: '5' },
    { label: 'Outros...', value: '6' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Categoria</Text>
      <DropdownButton
        data={dropdownData}
        // value={category}
        // onChangeText={setCategory}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        multiline
      />

    {/* <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flex: 1, backgroundColor: 'red' }} />
      <View style={{ flex: 1, backgroundColor: 'green' }} />
    </View> */}

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

            <Camera></Camera>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TextInput
        style={styles.input}
        value={photo}
        onChangeText={setPhoto}
      />

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
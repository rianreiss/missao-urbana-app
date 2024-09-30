import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TextInputProps, TouchableOpacity, Modal } from 'react-native';
import { Camera } from "@/components/Camera"


const OcurrenceForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [erro, setErro] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const validarFormulario = () => {
    if (!title || !description || !category || !photo || !address) {
      setErro('Todos os campos são obrigatórios!');
      return false;
    }
    setErro('');
    return true;
  };

  const handleSubmit = () => {
    if (validarFormulario()) {
      console.log('Ocorrência enviada:', { title, description, category, photo, address });
      // Limpa os campos após o envio
      setTitle('');
      setDescription('');
      setCategory('');
      setPhoto('');
      setAddress('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Categoria</Text>
      <TextInput
        style={styles.input}
        value={category}
        onChangeText={setCategory}
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
            <Text style={styles.modalText}>Digite seu nome:</Text>

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
        value={address}
        onChangeText={setAddress}
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
    backgroundColor: 'white',
    borderRadius: 10,
    height: 400,
    width: 300
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
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



////////////////////////////////////////
// export function OcurrenceForm({ ...rest }: TextInputProps) {
//   return (
//     <View>
//       <TextInput
//         style={styles.input}
//         {...rest}
//       />
//       <TextInput
//         style={styles.input}
//         {...rest}
//       />
//       <TextInput
//         style={styles.input}
//         {...rest}
//       />
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   input:{
//     height: 54,
//     borderWidth: 1,
//     borderRadius: 7,
//     borderColor: "#999",
//     paddingHorizontal: 16,
//   }
// })
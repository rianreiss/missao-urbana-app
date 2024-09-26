import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TextInputProps } from 'react-native';

const OcurrenceForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState('');
  const [erro, setErro] = useState('');

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
    padding: 10,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  input: {
    height: 54,
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
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const dropdownData = [
  { label: 'Asfalto / Calçada / Outros', value: '1' },
  { label: 'Poste / Fios / Outros', value: '2' },
  { label: 'Denúncia', value: '3' },
  { label: 'Esclarecimento', value: '4' },
  { label: 'Sugestão', value: '5' },
  { label: 'Outros...', value: '6' },
];

const DropdownButton = ({ onSelectCategory }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [category, setCategory] = useState<string>('');

  return (
    <View style={styles.container}>
      <Dropdown
        // style={[styles.dropdown, !isFocus && { borderColor: '#fcbc24' }]}
        style={styles.dropdown}

        placeholderStyle={styles.textStyle}
        selectedTextStyle={styles.textStyle}

        containerStyle={styles.dropdownCointainer}

        data={dropdownData}

        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Selecionar item' : '...'}

        value={category}
        // onFocus={() => setIsFocus(true)}
        // onBlur={() => setIsFocus(false)}
        onChange={item => {
          setCategory(item.value);
          onSelectCategory(item.value); // Passa o valor para o componente pai
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default DropdownButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  dropdown: {
    width: '100%',
    height: 40,
    borderColor: "#999",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  dropdownCointainer: {
    backgroundColor: '#8c8c8c',
    color: '',
    borderWidth: 1,
    borderRadius: 7,
    borderColor: "#fcbc24",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  textStyle: {
    fontSize: 16,
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
  }
});

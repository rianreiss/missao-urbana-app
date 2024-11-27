import { View, Pressable, PressableProps, Text, TouchableOpacity, StyleSheet } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"
import { useState, useEffect } from "react"

type Props = PressableProps & {
  data: {
    id: number
    category: string
    description: string
    idPhoto: number
    location: string
  }
  onDelete: () => void
  onOpen: () => void
}

export function Occurrence({ data, onDelete, onOpen, ...rest }: Props) {
  const [categoryHandled, setCategoryHandled] = useState('');

  useEffect(() => {
    const dropdownData = [
      { label: 'Asfalto / Calçada / Outros', value: '1' },
      { label: 'Poste / Fios / Outros', value: '2' },
      { label: 'Denúncia', value: '3' },
      { label: 'Esclarecimento', value: '4' },
      { label: 'Sugestão', value: '5' },
      { label: 'Outros...', value: '6' },
    ];

    const category = dropdownData.find((item) => item.value === data.category);
    setCategoryHandled(category ? category.label : 'Categoria não encontrada');

  });

  return (
    <Pressable
      style={styles.containerOccurrencePress}
      // {{
      //   backgroundColor: "#CECECE",
      //   padding: 24,
      //   borderRadius: 5,
      //   gap: 12,
      //   flexDirection: "row",
      // }}
      {...rest}
    >
      <View style={styles.containerPreviewOccurrence}>
        <Text style={styles.title}>
          {data.id} - { categoryHandled }
        </Text>
        <Text style={styles.location}>
          {data.location}
        </Text>
      </View>

      <View style={styles.containerButtons}>
        <TouchableOpacity onPress={onDelete}>
          <MaterialIcons name="delete" size={24} color="red" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onOpen}>
          <MaterialIcons name="visibility" size={24} color="blue" />
        </TouchableOpacity>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  containerOccurrencePress: {
    backgroundColor: "#CECECE",
    width: '100%',
    height: 100,
    maxHeight: 200,
    padding: 12,
    borderRadius: 5,
    gap: 12,
    flexDirection: "row",
    // backgroundColor: '#212121',
    // flex: 1,
    // alignItems:'center',
    // paddingTop: 20,
    // paddingHorizontal: 15,
    // position: 'relative',
  },
  containerPreviewOccurrence: {
    width: '80%',
    height: '100%',
    justifyContent: 'flex-start',
    gap: 10,
    overflow: 'hidden',
    // flexDirection: "co",
    // backgroundColor: '#212121',
    // flex: 1,
    // alignItems:'center',
    // paddingTop: 20,
    // paddingHorizontal: 15,
    // position: 'relative',
  },

  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  location: {
    textAlign: 'justify'
  },

  containerTitle: {
    marginBottom: 30,
  },
  
  containerButtons: {
    width: '15%',
    height: '100%',
    marginBottom: 60,
    // backgroundColor: '#212121',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  
  buttonText: {
    color: 'black', // Cor do texto
    fontSize: 16,
    fontWeight: 'bold',
  },
  button: {
    width: 'auto',
    backgroundColor: '#fcbc24',
    paddingVertical: 10,
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
  textAlternative: {
    color: '#fcbc24',
  },

  containerLogo: {
    width: '100%',
    alignItems: 'flex-start',
    bottom: 0,
    elevation: 2,                // sombra para Android
    shadowColor: '#fff',         // sombra para iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2 ,
    shadowRadius: 8,
  },
  logo: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
    flex: 0,
    alignItems: 'flex-start'
  },
  
  footerContainer: {
    width: '100%',
    height: '5%',
    justifyContent:'center',
    alignItems:'flex-end',
    position: 'absolute',
    bottom: 0
  },
  footerText: {
    color: 'white',
    fontSize: 10,
  }
})
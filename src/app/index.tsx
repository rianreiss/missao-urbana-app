import { View, Button, StyleSheet, Text, TouchableOpacity, Image } from "react-native"
import { Link, useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Index() {
  const router = useRouter();

  const routerHandler = (view: string) => {

    switch(view) {
      case 'profile': {
        router.push("./screens/MyProfile");
        break;
      }
      case 'occurrences': {
        router.push("./screens/occurrenceList");
        break;
      }
      case 'newOccurrence': {
        router.push("./screens/occurrenceForm");
        break;
      }
      case 'news': {
        router.push("./screens/occurrenceForm");
        break;
      }
    }
    console.log(`${view} pressionado`);
  };

  return (
    <SafeAreaView style={styles.containerSafeArea}>

      <View style={styles.containerTitle}>
        <Text style={styles.title1}>Bem-vindo(a) ao</Text>
        <Text style={styles.title2}><Text style={styles.textAlternative}>Missão</Text> Urbana App</Text>
      </View>

      <View style={styles.containerButtons}>
        <TouchableOpacity style={styles.button} onPress={() => routerHandler('profile')}>
          <Text style={styles.buttonText}>Meu Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => routerHandler('occurrences')}>
          <Text style={styles.buttonText}>Minhas Ocorrências</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => routerHandler('newOccurrence')}>
          <Text style={styles.buttonText}>Nova Ocorrência</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => routerHandler('news')}>
          <Text style={styles.buttonText}>Notícias</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerLogo}>
        <Image source={require('../../assets/images/onca.png')} style={styles.logo} />
      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>© 2024 Missão Urbana App</Text>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  containerSafeArea: {
    backgroundColor: '#212121',
    flex: 1,
    alignItems:'center',
    paddingTop: 20,
    paddingHorizontal: 15,
    position: 'relative',
  },

  containerTitle: {
    marginBottom: 30,
  },
  
  containerButtons: {
    width: '100%',
    gap: 15,
    marginBottom: 60,
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
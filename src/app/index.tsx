import { View, Button, StyleSheet, Text, TouchableOpacity, Image } from "react-native"
import { Link, useRouter } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Index() {
  const router = useRouter();

  const handleButtonPress = (buttonName: string) => {
    console.log(`${buttonName} pressionado`);
  };

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
        router.push("./screens/OccurrenceForm");
        break;
      }
    }
    console.log(`${view} pressionado`);
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.spacer}></View>

      <View>
        <Text style={styles.title1}>Bem-vindo(a) ao</Text>
        <Text style={styles.title2}>Missão Urbana App</Text>
      </View>

      <View style={styles.spacer}></View>
      <View style={styles.spacer}></View>

      <View style={styles.buttonContainer}>
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

      <View style={styles.logoview}>
        <Image source={require('../../assets/images/onca.png')} style={styles.logo} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
  logoview: {
    width: '100%',
    alignItems: 'flex-start',
    paddingTop: 35
  },
  logo: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
    flex: 0,
    alignItems: 'flex-start'
  },
  container: {
    backgroundColor: '#1A1A1A',
    // backgroundColor: '#646464',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    // backgroundColor: '#f5f5f5',
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
    justifyContent: 'space-around',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  button1: {
    backgroundColor: '#fcbc24',
    // backgroundColor: '#dcac34',
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
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
  spacer: {
    margin: 10
  }
})
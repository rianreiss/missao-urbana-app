import { ScrollView, View, Button, Alert, FlatList, StyleSheet, Text, TouchableOpacity } from "react-native"
import { router, Link } from "expo-router"
import OcurrenceForm from '@/app/screens/occurrenceForm'

import { SafeAreaView } from "react-native-safe-area-context"

export default function Layout() {
  return (
    <SafeAreaView style={styles.containerSafeArea}>
      <ScrollView style={styles.container}>

        <Link href={"/"} style={styles.button}>
            <Text style={styles.buttonText}>Voltar</Text>
        </Link>

        <OcurrenceForm></OcurrenceForm>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  containerSafeArea: {
    backgroundColor: '#212121',
    // backgroundColor: '#1A1A1A',
    // backgroundColor: '#646464',
    flex: 1,
    paddingHorizontal: 15,
    paddingBottom: 15
  },
  container: {
    flexGrow: 1,
    padding: 15,
    backgroundColor: '#212121',
    borderWidth: 1,
    borderColor: "#999",
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
  button: {
    backgroundColor: '#fcbc24',
    // backgroundColor: '#dcac34',
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  spacer: {
    margin: 10
  }
})
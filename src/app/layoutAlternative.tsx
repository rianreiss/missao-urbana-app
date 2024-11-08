import React from 'react';
import { ScrollView, View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <SafeAreaView style={styles.containerSafeArea}>

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}> { title } </Text>
      </View>

      <ScrollView style={styles.container}>

        { children }

      </ScrollView>

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
    paddingHorizontal: 15,
  },
  
  titleContainer: {
    width: '100%',
    height: '8%',
    justifyContent:'center',
    alignItems:'center',
    marginTop: 15,
  },
  titleText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },

  container: {
    flexGrow: 1,
    padding: 15,
    paddingBottom: 50,
    width: '100%',
  },

  footerContainer: {
    width: '100%',
    height: '5%',
    justifyContent:'center',
    alignItems:'flex-end',
  },
  footerText: {
    color: 'white',
    fontSize: 10,
  }
})

export default Layout;
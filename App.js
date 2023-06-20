import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './Home'
import store from './redux/store'
import { Provider } from 'react-redux'


const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Text style={styles.textStyle}>App</Text>
        <Home />
      </View>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  textStyle: {
    color: 'black'
  }
})
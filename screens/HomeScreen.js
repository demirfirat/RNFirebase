import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { auth } from '../firebaseConfig'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {

    const navigation = useNavigation();
    const handleSignOut = () => {
        auth.signOut()
        .then(() => {
            navigation.replace("Login")
        })
    }
  return (
    <View style={styles.container}>
      <Text>Merhaba! {auth.currentUser?.email}</Text>
      <TouchableOpacity
      onPress={handleSignOut}
      style={styles.button}>
        <Text style={styles.buttonText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button:{
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
    },
    buttonText:{
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { useState } from 'react'
import { auth } from '../firebaseConfig'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("Home")
            }
        })
        return unsubscribe;
    }, [])
    const handleSignUp = () => {
        if(!email.trim() || !password.trim()){
            alert("Lütfen tüm alanları doldurunuz!")
            return;
        }
        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
            const user = userCredentials.user;
            console.log("Kayıt Başarılı", user.email);
            alert("Kayıt Başarılı", user.email)
        })
        .catch(error => alert(error.message))
    }
    const handleLogin = () => {
        if (!email.trim() || !password.trim()) {
            alert("Lütfen tüm alanları doldurunuz.");
            return;
        }
        auth.signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
            const user = userCredentials.user;
            console.log("Giriş Yapıldı", user.email);
            alert("Giriş Yapıldı", user.email)
        })
        .catch(error => alert(error.message))
    }
  return (
    //form girişi
    <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <View style={styles.inputContainer}> 
        <TextInput placeholder='E-posta'
         value={email} onChangeText={text =>setEmail(text)}
         style={styles.input}
          />
        <TextInput placeholder='Şifre'
         value={password} onChangeText={text => setPassword(text)}
         style={styles.input}
         secureTextEntry
          />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
        onPress={handleLogin}
        r
        style={styles.button}>
            <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={handleSignUp}
        style={[styles.button, styles.buttonOutline]}>
            <Text style={styles.buttonOutlineText}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>    
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        width: '80%',
    },
    input:{
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer:{
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    button:{
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline:{
        backgroundColor: 'white',
        marginTop: 8,
        borderColor: '#0782F9',
        borderWidth: 2,
    },
    buttonText:{
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText:{
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,
    },

})
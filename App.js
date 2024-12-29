import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { auth } from './firebaseConfig';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {
  
  if (!firebase.apps.length) {
    firebase.initializeApp();
  }
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }
  // Token'ı kaydetmek için bir fonksiyon
const saveTokenToDatabase = async (token) => {
  try {
    // Kullanıcı kimliği ile tokenı eşleştir
    const userId = auth.currentUser?.email; // Kullanıcı ID'sini burada al 
    await firestore().collection('users').doc(userId).set(
      {
        fcmToken: token,
      },
      { merge: true } // Mevcut kullanıcı verilerini güncelle
    );
    console.log('Token Firestore’a kaydedildi!');
  } catch (error) {
    console.error('Token Firestore’a kaydedilemedi:', error);
  }
};
  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('Token =', token);
      saveTokenToDatabase(token);
    } catch (error) {
      console.log('Error getting FCM token:', error);
    }
  };
  
  useEffect(() => {
requestUserPermission();
getToken();
  }, [])


  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name='Login' component={LoginScreen}/>
        <Stack.Screen options={{headerShown: false}} name='Home' component={HomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


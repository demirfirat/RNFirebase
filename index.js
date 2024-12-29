import { registerRootComponent } from 'expo';
import messaging from '@react-native-firebase/messaging';
import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);

// Headless task fonksiyonunu tanımla
async function backgroundMessageHandler(remoteMessage) {
  console.log('Message handled in the background!', remoteMessage);
  // Burada gelen mesajla ilgili istediğin işlemleri yapabilirsin.
}

// Headless task'ı kayıt et
messaging().setBackgroundMessageHandler(backgroundMessageHandler);
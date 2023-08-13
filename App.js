import React, { useState, useEffect } from 'react';
import firebase from 'firebase';  
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer'; 
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import AddItemScreen from './components/AddItemScreen';
import EditItemScreen from './components/EditItemScreen';  
import Splash from './components/Splash';
import LoginScreen from './components/LoginScreen';
import Info from './components/Info';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'; 


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyB79t6xpkoH1iJxzNYUgbjgbW2GeiOtkmA", 
  authDomain: "crud-react-native-app.firebaseapp.com",
  projectId: "crud-react-native-app",
  storageBucket: "crud-react-native-app.appspot.com",
  messagingSenderId: "2924955349",
  appId: "1:2924955349:web:9641a1c2527f587098c45c"
}; 

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} 

 
const firebaseAuth = firebase.auth(); 


const App = () => {
  
    const [carregamento, setCarregamento] = useState(true); 

     useEffect(() => { 
    setTimeout(() => {
      setCarregamento(false);
    }, 2000);
  }, []);

    if (carregamento) return <Splash />;

     return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Login" useLegacyImplementation>
        <Drawer.Screen name="Login" component={LoginScreen} options={{headerShown: false, drawerLabel: () => null,}}/>
        <Drawer.Screen name="Home" component={AddItemScreen} />
        <Drawer.Screen name="Produto" component={HomeScreen} /> 
        <Drawer.Screen name="Informações Gerais" component={Info} /> 
        <Drawer.Screen name="Edit" component={EditItemScreen} options={{headerShown: false, drawerLabel: () => null,}} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};


export default App;
export { firebase, firebaseAuth, firebaseConfig };

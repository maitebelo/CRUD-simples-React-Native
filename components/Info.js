import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { firebaseAuth } from '../App';
import firebase from 'firebase';

const Info = ({ navigation }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigation.navigate('Login');
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await firebaseAuth.signOut();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, margin: 20, }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, textAlign: "center" }}>
        Informações Gerais do App
      </Text>
      <Text style={{ textAlign: "center" }}>Usuário: {user ? user.email : 'Nenhum usuário logado'}</Text> 
      <Text style={{ fontSize: 18, fontWeight: 'bold',  margin: 20, textAlign: "center"  }}>
        Sobre Nós
      </Text>
      <Text style={{ textAlign: "center" }}>
        Bem-vindo ao nosso aplicativo de CRUD de produtos! Nosso objetivo é fornecer uma plataforma intuitiva para gerenciar produtos, permitindo que você adicione, visualize, edite e exclua itens facilmente.
      </Text>
      
      <Button onPress={handleLogout} style={{ marginTop: 20, }}>Logout</Button>
    </View>
  );
};

export default Info;

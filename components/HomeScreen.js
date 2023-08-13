import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Button, Card, Title, Paragraph, RadioButton } from 'react-native-paper';
import { firebaseAuth } from '../App';
import firebase from 'firebase';  
 
const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState('default');

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

  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('crud').onSnapshot((snapshot) => {
      const itemsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        title: doc.data().title,
        description: doc.data().description,
        price: doc.data().price,
        quantity: doc.data().quantity,
      }));
      setItems(itemsData);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (id) => {
    try {
      await firebase.firestore().collection('crud').doc(id).delete();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebaseAuth.signOut();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSortOptionChange = (value) => {
    setSelectedSortOption(value);
  };

  const sortItems = (items, sortOption) => {
    switch (sortOption) {
      case 'titleAsc':
        return items.sort((a, b) => a.title.localeCompare(b.title));
      case 'titleDesc':
        return items.sort((a, b) => b.title.localeCompare(a.title));
      case 'priceAsc':
        return items.sort((a, b) => a.price - b.price);
      case 'priceDesc':
        return items.sort((a, b) => b.price - a.price);
      case 'quantityAsc':
        return items.sort((a, b) => a.quantity - b.quantity);
      case 'quantityDesc':
        return items.sort((a, b) => b.quantity - a.quantity);
      default:
        return items;
    }
  };

  const renderCard = ({ item }) => (
    <Card key={item.id} style={{ marginBottom: 16 }}>
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>{item.description}</Paragraph>
        <Paragraph>Preço: {item.price}</Paragraph>
        <Paragraph>Quantidade: {item.quantity}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button onPress={() => navigation.navigate('Edit', { item })}>
          Editar
        </Button> 
        <Button onPress={() => handleDelete(item.id)}>Excluir</Button>
      </Card.Actions>
    </Card>
  );

  const sortedItems = sortItems(items, selectedSortOption);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>
        Lista de Produtos:
      </Text>
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <Text style={{ marginRight: 8 }}>Ordenar por:</Text>
        <RadioButton.Group onValueChange={handleSortOptionChange} value={selectedSortOption}>
          <View style={{ flexDirection: 'row' }}>
            <RadioButton.Item label="Padrão" value="default" />
            <RadioButton.Item label="Título (A-Z)" value="titleAsc" />
            <RadioButton.Item label="Título (Z-A)" value="titleDesc" />
            <RadioButton.Item label="Preço (Crescente)" value="priceAsc" />
            <RadioButton.Item label="Preço (Decrescente)" value="priceDesc" />
            <RadioButton.Item label="Quantidade (Crescente)" value="quantityAsc" />
            <RadioButton.Item label="Quantidade (Decrescente)" value="quantityDesc" />
          </View>
        </RadioButton.Group>
      </View>
      <FlatList
        data={sortedItems}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        style={{ marginBottom: 16 }}
      />
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Add')}
        style={{ marginBottom: 16 }}
      >
        Adicionar Item
      </Button>
      <Button onPress={handleLogout}>Logout</Button>
    </View>
  );
};

export default HomeScreen;

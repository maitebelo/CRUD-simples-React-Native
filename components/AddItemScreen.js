import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, TextInput as PaperTextInput } from 'react-native-paper';
import { firebase } from '../App';
 
const AddItemScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSalvar = async () => {
    try {
      if (title.length > 0 && description.length > 0 && price.length > 0 && quantity.length > 0) {
        const newItem = {
          id: firebase.firestore().collection('crud').doc().id,
          title: title,
          description: description,
          price: parseFloat(price), 
          quantity: parseInt(quantity),
        };

        await firebase.firestore().collection('crud').doc(newItem.id).set(newItem);
        navigation.navigate('Produto');
      }
    } catch (error) {
      console.error(error);
    }
  };

    const handlePriceChange = (text) => { 
    const numericValue = text.replace(/[^0-9.]/g, '');
    setPrice(numericValue);
  }; 

   const handleQuantityChange = (text) => { 
    const numericValue = text.replace(/[^0-9]/g, '');
    setQuantity(numericValue);
  };
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <PaperTextInput
        label="Título"
        value={title}
        onChangeText={setTitle}
        style={{ marginBottom: 16 }}
      />
      <PaperTextInput
        label="Descrição"
        value={description}
        onChangeText={setDescription}
        style={{ marginBottom: 16 }}
      />
      <PaperTextInput
        label="Preço"
        value={price}
        onChangeText={handlePriceChange}
        keyboardType="numeric" 
        style={{ marginBottom: 16 }}
      />
      <PaperTextInput
        label="Quantidade"
        value={quantity}
        onChangeText={handleQuantityChange} 
        keyboardType="numeric" 
        style={{ marginBottom: 16 }}
      />
      <Button mode="contained" onPress={handleSalvar}>
        Salvar
      </Button> 
    </View>
  );
};

export default AddItemScreen;

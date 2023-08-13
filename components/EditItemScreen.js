import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { Button, TextInput as PaperTextInput } from 'react-native-paper';
import { firebase } from '../App';

const EditItemScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);
  const [quantity, setQuantity] = useState(item.quantity);

  const handleUpdate = async () => {
    try {
      if (
        title.length > 0 &&
        description.length > 0 &&
        price.length > 0 &&
        quantity.length > 0
      ) {
        const updatedItem = {
          title: title,
          description: description,
          price: price,
          quantity: quantity,
        };

        await firebase
          .firestore()
          .collection('crud')
          .doc(item.id)
          .update(updatedItem);
        navigation.navigate('Produto');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePriceChange = (text) => {
    if (/^\d*\.?\d*$/.test(text)) {
      setPrice(text);
    }
  };

  const handleQuantityChange = (text) => {
    if (/^\d*$/.test(text)) {
      setQuantity(text);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16, maringTop: 20}}>
      <View  style={{ margin: 10, padding: 16 }}>
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
        <Button mode="contained" onPress={handleUpdate}>
          Atualizar
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default EditItemScreen;

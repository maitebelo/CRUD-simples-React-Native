import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function Cursos() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>App Crud Produtos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 60,
    marginTop: 5,
    textAlign: 'center',
  },
});

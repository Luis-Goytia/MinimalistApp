import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';

const EditProductScreen = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleEditProduct = () => {
    // Lógica para editar el producto en la base de datos
    alert(`Producto ${selectedProduct.name} editado con éxito!`);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar producto"
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Button title={item.name} onPress={() => setSelectedProduct(item)} />
        )}
      />
      {selectedProduct && (
        <View style={styles.editContainer}>
          <Text style={styles.text}>{selectedProduct.name}</Text>
          <TextInput
            style={styles.input}
            placeholder="Nuevo precio"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={selectedProduct.price}
            onChangeText={(text) => setSelectedProduct({ ...selectedProduct, price: text })}
          />
          <Button title="Guardar Cambios" onPress={handleEditProduct} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    color: '#fff',
    paddingHorizontal: 10,
    margin: 10,
    width: '80%',
  },
  editContainer: {
    marginTop: 20,
  },
  text: {
    color: '#fff',
  },
});

export default EditProductScreen;

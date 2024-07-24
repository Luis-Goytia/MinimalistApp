import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList , Image } from 'react-native';
import { ProductContext } from '../context/ProductContext';

const ListProductScreen = () => {
  const { products } = useContext(ProductContext);
  const [search, setSearch] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

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
        keyExtractor={(item) => item._id.toString()} // Asegúrate de que el id sea único y esté en formato string
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.text}>{item.name}</Text>
              <Text style={styles.text}>${item.price}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  input: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    color: '#fff',
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  info: {
    flex: 1,
    marginLeft: 10,
  },
  text: {
    color: '#fff',
  },
});

export default ListProductScreen;

import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Or the icon set you prefer

const HomeScreen = ({ navigation }) => {
  const logoOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [logoOpacity]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/edithlocal.png')} style={styles.logo} />
        {/* <Animated.View style={[styles.overlay, { opacity: logoOpacity }]} /> */}
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Suma')}>
        <Icon name="add-circle-outline" size={30} color="#fff" />
        <Text style={styles.text}>Suma</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Catalogo')}>
        <Icon name="book-outline" size={30} color="#fff" />
        <Text style={styles.text}>Catálogo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AgregarProducto')}>
        <Icon name="add-circle" size={30} color="#fff" />
        <Text style={styles.text}>Agregar Producto</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditarProducto')}>
        <Icon name="create-outline" size={30} color="#fff" />
        <Text style={styles.text}>Editar Producto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#fff',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    width: '80%',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
});

export default HomeScreen;

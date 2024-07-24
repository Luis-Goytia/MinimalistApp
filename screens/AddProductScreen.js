import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { ProductContext } from '../context/ProductContext'; 
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { uploadImageToSupabase } from '../utils/supabaseUtils';

const AddProductScreen = () => {
  const { products, addProduct } = useContext(ProductContext);
  const [product, setProduct] = useState({ name: '', price: '', barcode: '', type: '', imageUrl: null });
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [cameraVisible, setCameraVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setProduct({ ...product, barcode: data });
    const existingProduct = products.find(p => p.barcode === data);
    if (existingProduct) {
      Alert.alert('Producto existente', 'Este producto ya está en la lista');
      setCameraVisible(false);
      setScanned(false);
    } else {
      setCameraVisible(false);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProduct({ ...product, photo: result.assets[0].uri });
    }
  };

  const handleAddProduct = async () => {
    if (!product.name || !product.price || !product.barcode || !product.type || !product.imageUrl) {
      Alert.alert('Error', 'Por favor, complete todos los campos.');
      return;
    }

    setLoading(true);

    try {
      const imageUrl = await uploadImageToSupabase(product.imageUrl);
      if (!imageUrl) {
        Alert.alert('Error', 'Error al subir la imagen.');
        setLoading(false);
        return;
      }

      const newProduct = { ...product, imageUrl: imageUrl };

      await addProduct(newProduct);
      Alert.alert('Éxito', `Producto ${product.name} agregado con éxito!`);
      setProduct({ name: '', price: '', barcode: '', type: '', imageUrl: null });
      setCameraVisible(true);
      setScanned(false);
    } catch (error) {
      Alert.alert('Error', 'Error al agregar el producto.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {cameraVisible ? (
        <>
          <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.cameraContainer}
            barodeScannerSettings={{
              barCodeTypes: [
                "aztec", "ean13", "ean8", "qr", "pdf417", 
                "upc_e", "datamatrix", "code39", "code93", 
                "itf14", "codabar", "code128", "upc_a"
              ],
            }}
          />
          {scanned && (
            <TouchableOpacity style={styles.rescanButton} onPress={() => setScanned(false)}>
              <Icon name="scan-outline" size={24} color="#fff" />
              <Text style={styles.buttonText}>Escanear de nuevo</Text>
            </TouchableOpacity>
          )}
        </>
      ) : (
        <View style={styles.formContainer}>
          <TouchableOpacity onPress={pickImage}>
            <Image 
              source={{ uri: product.photo || 'https://via.placeholder.com/100' }} 
              style={styles.image} 
            />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            placeholderTextColor="#999"
            value={product.name}
            onChangeText={(text) => setProduct({ ...product, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Precio"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={product.price}
            onChangeText={(text) => setProduct({ ...product, price: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Tipo"
            placeholderTextColor="#999"
            value={product.type}
            onChangeText={(text) => setProduct({ ...product, type: text })}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleAddProduct}>
            <Icon name="save-outline" size={24} color="#fff" />
            <Text style={styles.buttonText}>Guardar Producto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => setCameraVisible(true)}>
            <Icon name="close-outline" size={24} color="#fff" />
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
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
    justifyContent: 'center',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    color: '#fff',
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '80%',
    borderRadius: 5,
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
    borderRadius: 10,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    justifyContent: 'center',
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
  },
  rescanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
});

export default AddProductScreen;

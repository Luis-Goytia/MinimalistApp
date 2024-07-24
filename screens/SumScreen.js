// screens/SumaScreen.js
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button , FlatList} from "react-native";
import { CameraView, Camera } from "expo-camera";

const mockProducts = {
  "7798113301611": { name: "Agua", price: 10.99 },
  "987654321098": { name: "Product 2", price: 5.49 },
  "555555555555": { name: "Product 3", price: 7.99 },
  // Add more mock products as needed
};

const SumScreen = () =>  {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    const product = mockProducts[data];
    if (product) {
      setProducts((prevProducts) => [...prevProducts, product]);
      setTotalPrice((prevTotal) => prevTotal + product.price);
    } else {
      alert(`No product found with barcode ${data}`);
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
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["aztec" , "ean13" , "ean8" , "qr" , "pdf417" , "upc_e" , "datamatrix" , "code39" , "code93" , "itf14" , "codabar" , "code128" , "upc_a"],
        }}
        style={styles.cameraContainer}
      />
      {scanned && (
        <Button title={"Agregar Producto"} onPress={() => setScanned(false)} />
      )}
       <View style={styles.listContainer}>
        <FlatList
          data={products}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <Text style={styles.text}>{item.name}</Text>
              <Text style={styles.text}>${item.price.toFixed(2)}</Text>
            </View>
          )}
        />
        <Text style={styles.totalText}>Total: ${totalPrice.toFixed(2)}</Text>
      </View>

    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#333',
    padding: 10,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
  totalText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
});


export default SumScreen;

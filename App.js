// App.js
import React from 'react';
import 'react-native-url-polyfill/auto'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ProductProvider } from './context/ProductContext';
import HomeScreen from './screens/HomeScreen';
import SumScreen from './screens/SumScreen';;
import ListProductScreen from './screens/ListProductScreen';
import AddProductScreen from './screens/AddProductScreen';
import EditProductScreen from './screens/EditProductScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ProductProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Inicio' }} />
        <Stack.Screen name="Suma" component={SumScreen} options={{ title: 'Suma' }} />
        <Stack.Screen name="Catalogo" component={ListProductScreen} options={{ title: 'Catálogo' }} />
        <Stack.Screen name="AgregarProducto" component={AddProductScreen} options={{ title: 'Agregar Producto' }} />
        <Stack.Screen name="EditarProducto" component={EditProductScreen} options={{ title: 'Editar Producto' }} /> 
      </Stack.Navigator>
    </NavigationContainer>
    </ProductProvider>
  );
}

import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.0.19:3000/api/products/')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const addProduct = async (product) => {
    axios.post('http://192.168.0.19:3000/api/products/', product)
      .then(response => setProducts([...products, response.data]))
      .catch(error => console.error('Error adding product:', error));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

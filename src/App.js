import React, { useState } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';
import { products } from './data';

function App() {
  const [productList, setProductList] = useState(products);

  const handleAddProduct = (newProduct) => {
    // Generate a unique ID for the new product
    newProduct.id = Math.max(...productList.map((p) => p.id), 0) + 1;
    setProductList([...productList, newProduct]);
  };

  const handleEditProduct = (editedProduct) => {
    setProductList((prevList) =>
      prevList.map((product) =>
        product.id === editedProduct.id ? editedProduct : product
      )
    );
  };

  const handleDeleteProduct = (productToDelete) => {
    setProductList((prevList) =>
      prevList.filter((product) => product.id !== productToDelete.id)
    );
  };

  return (
    <div className="App">
      <h1>Product Management</h1>
      <ProductForm productList={productList} onSubmit={handleAddProduct} />

      <ProductList
        products={productList}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
}

export default App;

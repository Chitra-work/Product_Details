import React, { useState } from 'react';
import ProductItem from './ProductItem';
import ProductForm from './ProductForm';

function ProductList({ products, onEdit, onDelete }) {
  const [categoryFilter, setCategoryFilter] = useState('');
  const [editProductId, setEditProductId] = useState(null);

  const handleEdit = (productId) => {
    setEditProductId(productId);
  };

  const filterProducts = () => {
    return products.filter((product) => {
      if (categoryFilter === 'All Categories') {
        return true;
      }
     
      return (
        !categoryFilter || product.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    });
  };

  return (
    <div>
      <select
        onChange={(e) => setCategoryFilter(e.target.value)}
        value={categoryFilter}>
        <option value="All Categories">All Categories</option>
        <option value="Vegetables">Vegetables</option>
        <option value="Fruits">Fruits</option>
        <option value="Snacks">Snacks</option>
      </select>
      <ul>
        {filterProducts().map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onEdit={() => handleEdit(product.id)}
            onDelete={onDelete}
          />
        ))}
      </ul>
      {editProductId !== null && (
        <ProductForm
          product={products.find((p) => p.id === editProductId)}
          onSubmit={(updatedProduct) => {
            onEdit(updatedProduct);
            setEditProductId(null);
          }}
        />
      )}
    </div>
  );
}

export default ProductList;

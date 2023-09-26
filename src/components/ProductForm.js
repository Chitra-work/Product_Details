import React, { useState, useEffect } from 'react';

function ProductForm({ product, productList, onSubmit }) {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    description: '',
    canExpire: false,
    expiryDate: '',
    category: '',
    price: '',
    isSpecial: false,
  });

  useEffect(() => {
    if (product) {
      setFormData(product);
      setIsEditing(true);
    }
  }, [product]);
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const parsedPrice = parseFloat(formData.price);
  
    if (isEditing) {
   
      onSubmit({ ...formData, price: parsedPrice });
    } else {
      
      onSubmit({
        ...formData,
        id: Math.max(...productList.map((p) => p.id), 0) + 1,
        price: parsedPrice,
      });
    }
  
    setFormData({
      description: '',
      canExpire: false,
      expiryDate: '',
      category: '',
      price: '',
      isSpecial: false,
    });
    setIsEditing(false);
  };
  
  

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />
      <label>
        Can Expire:
        <input
          type="checkbox"
          name="canExpire"
          checked={formData.canExpire}
          onChange={handleChange}
        />
      </label>
      {formData.canExpire && (
        <input
          type="date"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
        />
      )}
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />
      <label>
        Special:
        <input
          type="checkbox"
          name="isSpecial"
          checked={formData.isSpecial}
          onChange={handleChange}
        />
      </label>
      <button type="submit">{product ? 'Update' : 'Save'}</button>
    </form>
  );
}

export default ProductForm;

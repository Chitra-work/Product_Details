import React from 'react';
import './ProductItem.css';

function ProductItem({ product, onEdit, onDelete }) {
  const {
    description,
    canExpire,
    expiryDate,
    category,
    price,
    isSpecial,
  } = product;

  return (
    <li className={isSpecial ? 'special' : ''}>
      <strong>{description}</strong>
      <p>Category: {category}</p>
      <p>Price: ${typeof price === 'number' ? price.toFixed(2) : price}</p>

      <p>
        {canExpire
          ? `Expiry Date: ${new Date(expiryDate).toLocaleDateString()}`
          : 'Does not expire'}
      </p>
      <label>
        Special:
        <input type="checkbox" checked={isSpecial} readOnly />
      </label>
      <button onClick={() => onEdit(product)}>Edit</button>
      <button onClick={() => onDelete(product)}>Delete</button>
    </li>
  );
}

export default ProductItem;

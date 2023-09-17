import React from "react";
import { Product } from "./Product.js";
import "./App.css";
function ProductList({ onProductClick }) {
  const handleClick = (product) => {
    onProductClick(product);
  };
  const data = Product;
  return (
    <div className="productList">
      {data.map((product, index) => (
        <div key={index}>
          <img
            src={product.image}
            alt={product.name}
            onClick={() => handleClick(product)}
            className="imgShow"
          />
        </div>
      ))}
    </div>
  );
}

export default ProductList;

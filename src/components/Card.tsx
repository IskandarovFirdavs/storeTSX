import React from "react";
import { Product } from "../types/Product";

interface CardProps {
  product: Product;
}

export const Card: React.FC<CardProps> = ({ product }) => {
  return (
    <div className="card">
      {/* Изображение продукта */}
      <img src={product.image} alt={product.title} className="card-image" />

      {/* Название продукта */}
      <h3 className="card-title">{product.title}</h3>

      {/* Краткое описание продукта */}
      <p className="card-description">{product.description.slice(0, 100)}...</p>

      {/* Цена продукта */}
      <p className="card-price">${product.price}</p>
    </div>
  );
};

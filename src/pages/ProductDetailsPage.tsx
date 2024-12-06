import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = useSelector((state: RootState) =>
    state.products.products.find((p) => p.id === Number(id))
  );
  const navigate = useNavigate();

  if (!product) return <p>Mahsulot topilmadi</p>;

  return (
    <div>
      <button onClick={() => navigate("/products")}>Orqaga</button>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} />
      <p>{product.description}</p>
      <p>Narxi: ${product.price}</p>
    </div>
  );
};

export default ProductDetailsPage;

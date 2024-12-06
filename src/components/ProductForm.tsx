import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../features/products/productsSlice";
import { Product } from "../features/products/productsSlice";
import { useNavigate } from "react-router-dom";

interface ProductFormProps {
  initialData?: Product;
}

const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [image, setImage] = useState(initialData?.image || "");
  const [price, setPrice] = useState(initialData?.price || 0);
  const [liked, setLiked] = useState(initialData?.liked || false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: initialData?.id || Date.now(),
      title,
      description,
      image,
      price,
      liked,
    };
    dispatch(addProduct(newProduct));
    navigate("/products");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <input
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="Image URL"
      />
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        placeholder="Price"
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { Pagination } from "../components/Pagination";
import styled from "styled-components";
import {
  toggleLike,
  deleteProduct,
  setFilter,
} from "../features/products/productsSlice";
import { Link } from "react-router-dom";

// Styled components
const ProductsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
`;

const ProductCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
`;

const ProductContent = styled.div`
  padding: 20px;
  flex-grow: 1;
`;

const ProductTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
`;

const ProductDescription = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.4;
  height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LikeButton = styled.button<{ liked: boolean }>`
  background-color: ${({ liked }) => (liked ? "#ff6347" : "#ddd")};
  color: #fff;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ liked }) => (liked ? "#ff2e00" : "#bbb")};
  }
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: #fff;
  border: none;
  border-radius: 50%;
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d32f2f;
  }
`;

const FilterWrapper = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: center;
`;

const FilterButton = styled.button`
  padding: 10px 20px;
  background-color: #66cc66;
  color: white;
  border: none;
  cursor: pointer;
  margin: 0 10px;
  border-radius: 5px;

  &:hover {
    background-color: #4db84d;
  }
`;

const SearchInput = styled.input`
  padding: 12px 20px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
  font-size: 16px;
  border-radius: 25px;
  border: 1px solid #ddd;
  outline: none;
  transition: border 0.3s;

  &:focus {
    border-color: #66cc66;
  }

  &::placeholder {
    color: #aaa;
  }
`;

export const ProductsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, status, error, filter } = useSelector(
    (state: RootState) => state.products
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {}, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredProducts = products.filter((product) => {
    const isLiked = filter === "favorites" ? product.liked : true;
    return (
      (product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      isLiked
    );
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLike = (productId: number) => {
    dispatch(toggleLike(productId));
  };

  const handleDelete = (productId: number) => {
    dispatch(deleteProduct(productId));
  };

  const handleFilter = (filterType: "all" | "favorites") => {
    dispatch(setFilter(filterType));
  };

  return (
    <div>
      <SearchInput
        type="text"
        placeholder="Search for products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <FilterWrapper>
        <FilterButton onClick={() => handleFilter("all")}>All</FilterButton>
        <FilterButton onClick={() => handleFilter("favorites")}>
          Favorites
        </FilterButton>
      </FilterWrapper>

      <ProductsContainer>
        {currentProducts.map((product) => (
          <ProductCard key={product.id}>
            <ProductImage
              src={product.image || "default_image_url"}
              alt={product.title}
            />
            <ProductContent>
              <ProductTitle>{product.title}</ProductTitle>
              <ProductDescription>{product.description}</ProductDescription>
              <div>
                <LikeButton
                  liked={product.liked}
                  onClick={() => handleLike(product.id)}
                >
                  ❤️
                </LikeButton>
                <DeleteButton onClick={() => handleDelete(product.id)}>
                  🗑️
                </DeleteButton>
              </div>
            </ProductContent>
            <Link to={`/products/${product.id}`} />
          </ProductCard>
        ))}
      </ProductsContainer>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductsPage;

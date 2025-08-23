import React, { useEffect, useState } from 'react';
import { useCart } from "../context/CartContext";
import { ProductPopupProvider, useProductPopup } from "../context/ProductPopupContext";
import ProductDetailPopup from "../product/ProductDetailPopup";

function Beauty() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const { openPopup } = useProductPopup();
  useEffect(() => {
    setIsLoading(true);
    fetch('https://dummyjson.com/products')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        return res.json();
      })
      .then((data) => {
        const beauty = data.products.filter((product) =>
          product.category.toLowerCase().includes('beauty')
        );
        setFilteredProducts(beauty);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setError('Failed to load fragrance products. Please try again later.');
        setIsLoading(false);
      });
  }, []); // Empty dependency array for one-time fetch

  const handleProductClick = (product) => {
    openPopup(product);
  };
  return (

    <div className="category-section">
      <div className="container">
        <div className="category-product-box">
          <h1>Beauty Products</h1>

          {isLoading ? (
            <p className="text-center col-span-full">Loading...</p>
          ) : error ? (
            <p className="text-center col-span-full text-red-500">{error}</p>
          ) : (
            <div className="product-itemlist">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="product-box" onClick={() => handleProductClick(product)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleProductClick(product)}>
                    <div className="product-image">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-48 object-cover rounded"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/150';
                        }}
                      />
                    </div>
                    <div className="product-detail mt-2">
                      <h2 className="text-lg font-semibold truncate">{product.title}</h2>
                      <div className="price-container flex items-center space-x-2 mt-1">
                        <span className="original-price text-gray-500 line-through flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-currency-rupee"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
                          </svg>
                          {product.price}
                        </span>
                        <span className="discounted-price text-lg font-bold flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-currency-rupee"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
                          </svg>
                          {product.discountPercentage
                            ? (
                              product.price -
                              (product.price * product.discountPercentage) / 100
                            ).toFixed(2)
                            : product.price}
                        </span>
                        {product.discountPercentage && (
                          <span className="discount-tag bg-green-500 text-white text-xs px-2 py-1 rounded">
                            {product.discountPercentage}% OFF
                          </span>
                        )}
                      </div>
                      {/* Uncomment if addToCart is implemented */}
                      <button
                        className="add-to-cart mt-3 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                        onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(product);
                                }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center col-span-full">No fragrance products found</p>
              )}
            </div>
          )}
        </div>
      </div>

      <ProductDetailPopup />
    </div>

  );
}

export default function WrappedBeauty() {
  return (
    <ProductPopupProvider>
      <Beauty />
    </ProductPopupProvider>
  );
}
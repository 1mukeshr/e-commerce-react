import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { ProductPopupProvider, useProductPopup } from "../context/ProductPopupContext";
import ProductDetailPopup from "../product/ProductDetailPopup";

function Groceries() {
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
                const groceries = data.products.filter((product) =>
                    product.category.toLowerCase().includes('groceries')
                );
                setFilteredProducts(groceries);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching products:', err);
                setError('Failed to load grocery products. Please try again later.');
                setIsLoading(false);
            });
    }, []); // Empty dependency array for one-time fetch

    const handleAddToCart = (product) => {
        try {
            addToCart(product);
        } catch (err) {
            console.error('Error adding to cart:', err);
            setError('Failed to add product to cart. Please try again.');
        }
    };

    const handleProductClick = (product) => {
        openPopup(product);
    };

    return (
        <div className="category-section">
            <div className="container">
                <div className="category-product-box">
                    <h1 className="text-2xl font-bold mb-4">Grocery Products</h1>

                    {isLoading ? (
                        <p className="text-center col-span-full">Loading groceries...</p>
                    ) : error ? (
                        <p className="text-center col-span-full text-red-500">{error}</p>
                    ) : (
                        <div className="product-itemlist">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <div
                                        key={product.id}
                                        className="product-box"
                                        onClick={() => handleProductClick(product)}
                                        role="button"
                                        tabIndex={0}
                                        onKeyDown={(e) => e.key === 'Enter' && handleProductClick(product)}
                                    >
                                        <div className="product-image">
                                            <img
                                                src={product.thumbnail || 'https://via.placeholder.com/150'}
                                                alt={product.title || 'Grocery product'}
                                                className="w-full h-48 object-cover rounded"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/150';
                                                }}
                                            />
                                        </div>
                                        <div className="product-detail ">
                                            <h2>{product.title}</h2>
                                            <div className="price-container">
                                                <span className="original-price">
                                                    ₹{product.price}
                                                </span>
                                                <span className="discounted-price">
                                                    ₹
                                                    {product.discountPercentage
                                                        ? (
                                                            product.price -
                                                            (product.price * product.discountPercentage) / 100
                                                        ).toFixed(2)
                                                        : product.price}
                                                </span>
                                                {product.discountPercentage && (
                                                    <span className="discount-tag">
                                                        {product.discountPercentage}% OFF
                                                    </span>
                                                )}
                                            </div>
                                            <button
                                                className="add-to-cart"
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
                                <p className="text-center col-span-full">No grocery products found</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
            <ProductDetailPopup />
        </div>
    );
}

export default function WrappedGroceries() {
    return (
        <ProductPopupProvider>
            <Groceries />
        </ProductPopupProvider>
    );
}
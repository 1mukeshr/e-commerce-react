import React, { useState } from 'react';
import { useProductPopup } from '../context/ProductPopupContext';
import { useCart } from '../context/CartContext';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const ProductDetailPopup = () => {
    const { isPopupOpen, selectedProduct, closePopup } = useProductPopup();
    const [activeTab, setActiveTab] = useState('description');
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const { addToCart } = useCart();

    if (!isPopupOpen || !selectedProduct) return null;

    const images = selectedProduct.images?.length > 0
        ? selectedProduct.images
        : [selectedProduct.thumbnail || 'https://via.placeholder.com/150'];

    const tabs = [
        { id: 'description', label: 'Description' },
        { id: 'details', label: 'Details' },
    ];

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="close-button" onClick={closePopup}>
                   <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-x-lg"
                        viewBox="0 0 16 16"
                    >
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                    </svg>
                </button>
                <div className="popup-inner">
                    <div className="product-detail-image">
                        <Zoom>
                            <img
                                src={images[activeImageIndex]}
                                alt={`${selectedProduct.title} - Image ${activeImageIndex + 1}`}
                            />
                        </Zoom>
                        <div className="thumbnail-container">
                            {images.map((img, index) => (
                                <button
                                    key={index}
                                    className={`thumbnail ${activeImageIndex === index ? 'active' : ''}`}
                                    onClick={() => setActiveImageIndex(index)}
                                >
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${index + 1}`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="product-popup-details">
                        <h2 className="product-title">{selectedProduct.title}</h2>
                        <div className="price">
                            ${selectedProduct.price.toFixed(2)} <span>(inclusive of all taxes)</span>
                        </div>

                        <div className="tab-navigation">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="tab-content">
                            {activeTab === 'description' && (
                                <p>
                                    <strong>Description:</strong> {selectedProduct.description}
                                </p>
                            )}
                            {activeTab === 'details' && (
                                <p>
                                    <strong>Product Details:</strong>
                                    <ul>
                                        <li><strong>Category:</strong> {selectedProduct.category}</li>
                                        <li><strong>Brand:</strong> {selectedProduct.brand}</li>
                                        <li><strong>SKU:</strong> {selectedProduct.sku}</li>
                                        <li><strong>Weight:</strong> {selectedProduct.weight} kg</li>
                                        <li><strong>Dimensions:</strong> {selectedProduct.dimensions.width} x {selectedProduct.dimensions.height} x {selectedProduct.dimensions.depth} cm</li>
                                        <li><strong>Warranty:</strong> {selectedProduct.warrantyInformation}</li>
                                        <li><strong>Shipping:</strong> {selectedProduct.shippingInformation}</li>
                                        <li><strong>Stock:</strong> {selectedProduct.availabilityStatus}</li>
                                    </ul>
                                </p>
                            )}
                        </div>

                        <button className="add-to-cart" onClick={() => addToCart(selectedProduct)}>
                            Add to Cart
                        </button>

                        <div className="why-shop">
                            <div className="why-shop-item">
                                <p>
                                    <strong>Superfast Delivery</strong> - Get your order delivered to your doorstep at the earliest from dark stores near you.
                                </p>
                            </div>
                            <div className="why-shop-item">
                                <p>
                                    <strong>Best Prices & Offers</strong> - Best price destination with offers directly from the manufacturers.
                                </p>
                            </div>
                            <div className="why-shop-item">
                                <p>
                                    <strong>Wide Assortment</strong> - Choose from 5K+ products across food, personal care, household & other categories.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPopup;
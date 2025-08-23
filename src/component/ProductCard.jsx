import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { ProductPopupProvider, useProductPopup } from "../context/ProductPopupContext";
import ProductDetailPopup from "../product/ProductDetailPopup";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartPopup, setCartPopup] = useState({ visible: false, product: null }); // State for cart popup
  const { addToCart } = useCart();
  const { openPopup } = useProductPopup();

  // Fetch products on component mount
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Filter products by search query
  const handleSearch = (e) => {
    const query = e.target.value;
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Handle product click to open popup
  const handleProductClick = (product) => {
    openPopup(product);
  };

  // Handle adding product to cart with popup notification
  const handleAddToCart = (e, product) => {
    e.stopPropagation(); // Prevent triggering the product click event
    addToCart(product);
    setCartPopup({ visible: true, product }); // Show popup
    setTimeout(() => {
      setCartPopup({ visible: false, product: null }); // Hide popup after 3 seconds
    }, 3000);
  };

  return (
    <>
     
      {/* Cart Popup Notification */}
      {cartPopup.visible && (
        <div
          className="cart-popup">
          <p>
            <strong>{cartPopup.product.title}</strong> successfully added to your shopping cart!
          </p>
        </div>
      )}

      {/* Product List */}
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div
            key={product.id}
            className="product-box"
            onClick={() => handleProductClick(product)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleProductClick(product)}
            style={{
              cursor: "pointer",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              marginBottom: "10px",
            }}
          >
            <div className="product-image">
              <img
                src={product.thumbnail}
                alt={product.title}
                style={{ maxWidth: "100%", height: "auto" }}
                onError={(e) => (e.target.src = "fallback-image-url.jpg")} // Fallback image
              />
            </div>
            <div className="product-detail">
              <h2>{product.title}</h2>
              <div className="price-container">
                <span className="original-price">
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
                <span className="discounted-price">
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
                  <span className="discount-tag">
                    {product.discountPercentage}% OFF
                  </span>
                )}
              </div>
              <button
                className="add-to-cart"
                onClick={(e) => handleAddToCart(e, product)}
               
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No products found</p>
      )}

      <ProductDetailPopup />
    </>
  );
};

export default function WrappedProductCard() {
  return (
    <ProductPopupProvider>
      <ProductCard />
    </ProductPopupProvider>
  );
}
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

const CardProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchVal(query);

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSelectProduct = (title) => {
    setSearchVal(title);
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(title.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

//   // Filter products by category
//   const groceryProducts = filteredProducts.filter(
//     (product) => product.category.toLowerCase() === "groceries"
//   );
//   const fragranceProducts = filteredProducts.filter(
//     (product) => product.category.toLowerCase() === "fragrances"
//   );

  return (
    <div className="product-section">
      <div className="container">
        <div className="product-itemlist">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div className="product-box" key={product.id}>
                <div className="product-image">
                  <img
                    src={product.thumbnail || productimg}
                    alt={product.title}
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
                      </svg>{" "}
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
                      </svg>{" "}
                      {product.discountPercentage
                        ? (
                            product.price -
                            (product.price * (product.discountPercentage || 0)) /
                              100
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
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
      {/* <div className="grocery-container">
        <h1>Grocery</h1>
       
      </div>
      <div className="fregrance-con">
        <h1>Fragrance</h1>
        {fragranceProducts.length > 0 ? (
          fragranceProducts.map((product) => (
            <div className="product-box" key={product.id}>
              <div className="product-image">
                <img
                  src={product.thumbnail || productimg}
                  alt={product.title}
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
                    </svg>{" "}
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
                    </svg>{" "}
                    {product.discountPercentage
                      ? (
                          product.price -
                          (product.price * (product.discountPercentage || 0)) /
                            100
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
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No fragrance products found</p>
        )}
      </div> */}
    </div>
  );
};

export default CardProduct;
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, showCart, toggleCart } = useCart();

  // Placeholder function for quantity change (implement as per your logic)
  const handleQuantityChange = (id, quantity) => {
    if (quantity >= 0) updateQuantity(id, quantity);
  };

  

  return (
    <div className={`sidebar ${showCart ? 'active' : ''}`}>
      
      <div className="sidebar-header">
        <h2>My Cart</h2>
        <button
          onClick={toggleCart}
          className="close-btn"
          aria-label="Close cart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
      </div>
      {cartItems.length === 0 ? (
        <p className="empty-cart">
          Your cart is empty. <a href="/product">Shop now</a>
        </p>
      ) : (
        <>
        <div className="cart-inner">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <h3>{item.title} 100g</h3>
              <p>Price: ₹{item.price.toFixed(2)}</p>
              <div style={{display:'flex', columnGap:"10px", alignItems:"center", margin:"15px 0px" }}>
                <p style={{margin:"0"}}>
                Quantity:
                
              </p>
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  aria-label={`Decrease quantity of ${item.title}`}
                >
                  -
                </button>
                <span>
                {item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  aria-label={`Increase quantity of ${item.title}`}
                >
                  +
                </button>
              </div>
              

              <button
                onClick={() => removeFromCart(item.id)}
                aria-label={`Remove ${item.title} from cart`}
              >
                Remove
              </button>
            </div>
          ))}  

         
          </div>      
           <div className="sidebar-bottom">
          <Link to="/checkout"  className="proceed-btn" onClick={toggleCart}>  <span>Total: ₹{getCartTotal()}</span> Proceed to Pay</Link>
          </div>
        </>
      )}
    </div>
  );
}
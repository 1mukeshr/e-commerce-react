import React, { useState } from 'react';

export const CheckOut = () => {
  const [activeTab, setActiveTab] = useState('card'); // Default to card tab

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSubmit = (e, method) => {
    e.preventDefault();
    // Simulate form submission logic
    console.log(`Submitting ${method} payment`);
    // Add your payment processing logic here
  };

  return (
    <div className="payment-page">
    <div className="payment-container">
      <h2>Secure Payment</h2>
      <div className="payment-methods" role="tablist">
        <button
          className={`method-btn ${activeTab === 'card' ? 'active' : ''}`}
          onClick={() => handleTabChange('card')}
          role="tab"
          aria-selected={activeTab === 'card'}
          aria-controls="card-form"
        >
          Credit/Debit Card
        </button>
        <button
          className={`method-btn ${activeTab === 'paypal' ? 'active' : ''}`}
          onClick={() => handleTabChange('paypal')}
          role="tab"
          aria-selected={activeTab === 'paypal'}
          aria-controls="paypal-form"
        >
          PayPal
        </button>
        <button
          className={`method-btn ${activeTab === 'upi' ? 'active' : ''}`}
          onClick={() => handleTabChange('upi')}
          role="tab"
          aria-selected={activeTab === 'upi'}
          aria-controls="upi-form"
        >
          UPI
        </button>
      </div>

      {/* Credit/Debit Card Form */}
      <form
        id="card-form"
        className={activeTab === 'card' ? '' : 'hidden'}
        onSubmit={(e) => handleSubmit(e, 'card')}
        role="tabpanel"
      >
        <div className="form-group">
          <label htmlFor="card-number">Card Number</label>
          <input
            type="text"
            id="card-number"
            placeholder="1234 5678 9012 3456"
            maxLength="19"
            required
          />
          <span className="card-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-credit-card"
              viewBox="0 0 16 16"
            >
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z" />
              <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
            </svg>
          </span>
        </div>
        <div className="card-details">
          <div className="form-group">
            <label htmlFor="expiry">Expiry Date</label>
            <input
              type="text"
              id="expiry"
              placeholder="MM/YY"
              maxLength="5"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input
              type="text"
              id="cvv"
              placeholder="123"
              maxLength="3"
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="cardholder">Cardholder Name</label>
          <input
            type="text"
            id="cardholder"
            placeholder="Mukesh"
            required
          />
        </div>
        <button type="submit" className="pay-btn">
          Pay with Card
        </button>
      </form>

      {/* PayPal Form */}
      <form
        id="paypal-form"
        className={activeTab === 'paypal' ? '' : 'hidden'}
        onSubmit={(e) => handleSubmit(e, 'paypal')}
        role="tabpanel"
      >
        <div className="form-group">
          <label htmlFor="paypal-email">PayPal Email</label>
          <input
            type="email"
            id="paypal-email"
            placeholder="example@paypal.com"
            required
          />
        </div>
        <button type="submit" className="pay-btn">
          Pay with PayPal
        </button>
      </form>

      {/* UPI Form */}
      <form
        id="upi-form"
        className={activeTab === 'upi' ? '' : 'hidden'}
        onSubmit={(e) => handleSubmit(e, 'upi')}
        role="tabpanel"
      >
        <div className="form-group">
          <label htmlFor="upi-id">UPI ID</label>
          <input
            type="text"
            id="upi-id"
            placeholder="example@upi"
            required
          />
        </div>
        <button type="submit" className="pay-btn">
          Pay with UPI
        </button>
      </form>

      <p className="secure-text">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-lock"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4M4.5 7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7zM8 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"
          />
        </svg>{' '}
        Secured by 256-bit Encryption
      </p>
    </div>
    </div>
  );
};
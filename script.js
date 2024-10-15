import React, { useState } from 'react';
import './PrebookNowPage.css'; // Import the CSS file for styling

// Replace 'YourPaymentGateway' with the actual payment gateway you are using
import { YourPaymentGateway } from 'your-payment-gateway-sdk';

const PrebookNowPage = () => {
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    cardDetails: {
      number: '',
      expiry: '',
      cvc: ''
    }
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerDetails({
      ...customerDetails,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Tokenize payment details
      const token = await YourPaymentGateway.tokenize(customerDetails.cardDetails);
      // Process payment with the token
      await YourPaymentGateway.processPayment(token);
      // Handle successful payment
      console.log('Payment successful!');
    } catch (error) {
      // Handle errors
      console.error('Payment failed', error);
    }
  };

  return (
    <div className="prebook-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={customerDetails.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={customerDetails.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={customerDetails.cardDetails.number}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="cardExpiry"
          placeholder="Card Expiry"
          value={customerDetails.cardDetails.expiry}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="cardCVC"
          placeholder="CVC"
          value={customerDetails.cardDetails.cvc}
          onChange={handleInputChange}
        />
        <button type="submit">Pre-Book Now</button>
      </form>
    </div>
  );
};

export default PrebookNowPage;

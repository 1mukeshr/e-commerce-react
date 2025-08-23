import { createContext, useState, useContext } from 'react';

const ProductPopupContext = createContext();

export const ProductPopupProvider = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openPopup = (product) => {
    setSelectedProduct(product);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedProduct(null);
  };

  return (
    <ProductPopupContext.Provider value={{ isPopupOpen, selectedProduct, openPopup, closePopup }}>
      {children}
    </ProductPopupContext.Provider>
  );
};

export const useProductPopup = () => useContext(ProductPopupContext);
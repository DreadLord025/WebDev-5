import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [comments, setComments] = useState([]);
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Bloody X5 Pro Max",
      selected: false,
      priceInUAH: 1099,
      description: "",
      descriptionVisible: false,
    },
    {
      id: 2,
      name: "Poco F3",
      selected: false,
      priceInUAH: 7800,
      description: "",
      descriptionVisible: false,
    },
    {
      id: 3,
      name: "Redmi Buds 4 Pro",
      selected: false,
      priceInUAH: 2100,
      description: "",
      descriptionVisible: false,
    },
    {
      id: 4,
      name: "HP Omen 15",
      selected: false,
      priceInUAH: 30000,
      description: "",
      descriptionVisible: false,
    },
  ]);

  const [commentText, setCommentText] = useState("");
  const [exchangeRate] = useState(0.0274);
  const [totalUSD, setTotalUSD] = useState(0);
  const [productDescription, setProductDescription] = useState("");

  return (
    <AppContext.Provider
      value={{
        selectedProducts,
        setSelectedProducts,
        comments,
        setComments,
        products,
        setProducts,
        commentText,
        setCommentText,
        exchangeRate,
        totalUSD,
        setTotalUSD,
        productDescription,
        setProductDescription,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
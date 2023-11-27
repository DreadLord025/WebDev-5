// BodyComponent.js
import React, { useEffect } from "react";
import { useAppContext } from "../AppContext";

function BodyComponent() {
  const {
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
  } = useAppContext();

  const selectedProductsCount = selectedProducts.length;

  useEffect(() => {
    calculateTotalUSD();
  }, [selectedProducts, exchangeRate]);

  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.includes(productId)
        ? prevSelectedProducts.filter((id) => id !== productId)
        : [...prevSelectedProducts, productId]
    );
  };

  const handleAddComment = () => {
    if (commentText.trim() !== "") {
      const selectedProductsData = products.filter(
        (product) => selectedProducts.includes(product.id)
      );

      selectedProductsData.forEach((product) => {
        if (!product.comments) {
          product.comments = [];
        }
        product.comments.push(commentText);
      });

      setComments((prevComments) => [...prevComments, commentText]);
      setCommentText("");

      if (selectedProducts.length === 0) {
        alert("Выберите товар для добавления комментария.");
        return;
      } else {
        alert(`Ваш відгук: "${commentText}" додано успішно!`);
      }
    }
  };

  const calculateTotalUSD = () => {
    const selectedProductsData = products.filter(
      (product) => selectedProducts.includes(product.id)
    );
    const totalUSD = selectedProductsData.reduce(
      (accumulator, product) =>
        accumulator + product.priceInUAH * exchangeRate,
      0
    );
    setTotalUSD(totalUSD.toFixed(2));
  };

  const handleProductDescriptionChange = (event) => {
    setProductDescription(event.target.value);
  };

  const handleShowProductDescription = (productId) => {
    const updatedProducts = [...products];
    const selectedProduct = updatedProducts.find(
      (product) => product.id === productId
    );
    if (selectedProduct) {
      selectedProduct.descriptionVisible = !selectedProduct.descriptionVisible;
    }
    setProducts(updatedProducts);
  };

  const handleAddDescription = () => {
    const selectedProductsData = products.filter(
      (product) => selectedProducts.includes(product.id)
    );

    if (selectedProductsData.length === 0) {
      alert("Виберіть товар для додавання опису!");
      return;
    }

    selectedProductsData.forEach((selectedProduct) => {
      selectedProduct.description = productDescription;
    });

    setProductDescription("");
  };

  return (
    <div className="ProductList">
      <div className="CountProducts">
        <div className="info">
          <text>{selectedProductsCount} товарів обрано</text>
          {totalUSD > 0 && (
            <text>Загальна сума в доларах: ${totalUSD} USD</text>
          )}
        </div>
      </div>
      {products.map((product) => (
        <li key={product.id}>
          <label className="ProductSale">
            <input
              type="checkbox"
              checked={selectedProducts.includes(product.id)}
              onChange={() => handleCheckboxChange(product.id)}
            />
            {product.name} - {product.priceInUAH} гривень
            <button
              className="buttonProduct"
              onClick={() => handleShowProductDescription(product.id)}
            >
              {product.descriptionVisible
                ? "Скрыть описание"
                : "Показать описание"}
            </button>
          </label>
          {product.descriptionVisible && product.description && (
            <div className="ProductDescription">{product.description}</div>
          )}
        </li>
      ))}
      <div className="commentarSend">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Ваш коментар..."
        />
        <button onClick={handleAddComment}>Додати коментар</button>
      </div>
      <div className="commentsReceive">
        <div className="descriptionSend">
          <textarea
            value={productDescription}
            onChange={handleProductDescriptionChange}
            placeholder="Детальний опис товару..."
          />
          <button onClick={handleAddDescription}>Додати опис</button>
        </div>
        <h3>Коментарі:</h3>
        {products.map(
          (product) =>
            product.comments &&
            product.comments.length > 0 &&
            selectedProducts.includes(product.id) && (
              <div key={product.id}>
                <h4>{product.name}:</h4>
                {product.comments.map((comment, index) => (
                  <div className="commentText" key={index}>
                    {comment}
                  </div>
                ))}
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default BodyComponent;

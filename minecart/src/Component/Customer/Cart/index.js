import React, { useEffect, useState } from "react";
import Header from "../Dashboard/header";

const Cart = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    setProducts(
      await fetch("https://fakestoreapi.com/products").then((res) => res.json())
    );
  };

  useEffect(() => {
    getProducts();
  }, []);

  console.log("afsfsfsdfs======", products);

  return (
    <div>
      <Header />
    </div>
  );
};

export default Cart;

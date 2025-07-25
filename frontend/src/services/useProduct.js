// src/services/useProduct.js
import { useState, useEffect } from "react";
import axios from "axios";

const useProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true); // optional
  const [error, setError] = useState(null); // optional

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/items")
      .then((response) => {
        setAllProducts(response.data.data); // adjust if your API format is different
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  return { allProducts, loading, error };
};

export default useProducts;

import { useState, useEffect } from 'react';
import axios from 'axios';

const useProducts = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/items')
      .then((response) => {
        const productsWithImages = (response.data.data || []).map(product => ({
          ...product,
          image: product.image ? `http://127.0.0.1:8000/${product.image}` : null,
          farmer: {
            ...product.farmer,
            avatar: product.farmer?.avatar ? `http://127.0.0.1:8000/${product.farmer.avatar}` : null
          }
        }));
        setAllProducts(productsWithImages);
        setProvinces(response.data.provinces || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  return { allProducts, provinces, loading, error };
};

export default useProducts;
import { useState, useEffect } from "react";
import axios from "axios";

const useProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    axios
      .get("http://127.0.0.1:8000/api/items")
      .then((response) => {
        if (mounted) {
          console.log("API Response:", response.data);
          const products = Array.isArray(response.data) ? response.data : [];
          const productsWithImages = products.map((product) => {
            const rawImage = product.image || null;
            const mappedImage = rawImage?.startsWith("http")
              ? rawImage
              : rawImage
              ? `http://127.0.0.1:8000/storage/${rawImage}`
              : "/placeholder.svg";
            return {
              ...product,
              image: mappedImage,
              farmer: {
                ...product.user,
                name: product.user?.name || "Unknown",
                nameKh: product.user?.name_kh || null,
                address: product.user?.address || "N/A",
                phone: product.user?.phone || "N/A",
                email: product.user?.email || "N/A",
                rating: product.user?.rating || 0,
                avatar: product.user?.avatar
                  ? product.user.avatar.startsWith("http")
                    ? product.user.avatar
                    : `http://127.0.0.1:8000/storage/${product.user.avatar}`
                  : "/placeholder.svg",
              },
              category: {
                ...product.category,
                name: product.category?.name || "Unknown",
              },
              description: product.description || "No description available",
              currency: product.currency || "$",
              rating: product.rating || 0,
              reviews: product.reviews || 0,
              isPopular: product.isPopular || false,
              reviewsData: product.reviewsData || [],
            };
          });
          setAllProducts(productsWithImages);
          setProvinces(response.data.provinces || [{ id: 1, name: "Unknown Province" }]);
          setLoading(false);
        }
      })
      .catch((error) => {
        if (mounted) {
          console.error("Error fetching products:", error.response || error.message);
          setError(error.message || "Failed to fetch products");
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  return { allProducts, provinces, loading, error };
};

export default useProduct;
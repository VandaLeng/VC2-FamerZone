import { useState, useEffect } from "react";
import axios from "axios";

const useProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [provinces, setProvinces] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/items")
      .then((response) => {
        const productsWithImages = (response.data.data || []).map((product) => {
          // Check if the image already contains the base URL
          const rawImage = product.image || null;
          const mappedImage = rawImage.startsWith("http")
            ? rawImage // Use as-is if it’s a full URL
            : rawImage
            ? `http://127.0.0.1:8000/storage/${rawImage}` // Add base URL if relative
            : "/placeholder.svg"; // Fallback
          console.log("Product ID:", product.id, "Raw Image:", rawImage, "Mapped URL:", mappedImage);
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
                ? (product.user.avatar.startsWith("http")
                    ? product.user.avatar
                    : `http://127.0.0.1:8000/storage/${product.user.avatar}`)
                : "/placeholder.svg",
            },
            category: {
              ...product.category,
              name: product.category?.name || "Unknown",
            },
          };
        });
        setAllProducts(productsWithImages);
        setProvinces(response.data.provinces || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  return { allProducts, provinces, loading, error };
};

export default useProduct;
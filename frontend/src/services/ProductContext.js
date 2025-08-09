import { createContext, useState, useCallback, useEffect } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const fetchProducts = useCallback(async() => {
        try {
            const response = await fetch('http://localhost:8000/api/items');
            const data = await response.json();
            if (data.success) {
                setProducts(data.data);
            } else {
                console.error('Failed to fetch products:', data.message);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const addProduct = useCallback(async(product) => {
        try {
            const formData = new FormData();
            for (const key in product) {
                if (key === 'user') {
                    formData.append('user_id', product.user_id);
                    formData.append('user_name', product.user.name);
                    formData.append('user_phone', product.user.phone);
                    formData.append('user_avatar', product.user.avatar);
                    formData.append('user_rating', product.user.rating);
                } else if (key !== 'image_url') {
                    formData.append(key, product[key]);
                }
            }
            if (product.image) {
                formData.append('image', product.image);
            }

            const response = await fetch('http://localhost:8000/api/items', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                setProducts((prev) => [...prev, data.data]);
                window.dispatchEvent(new CustomEvent('productUpdated', { detail: { action: 'created', product: data.data } }));
            } else {
                throw new Error(data.message || 'Failed to add product');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            throw error;
        }
    }, []);

    const updateProduct = useCallback(async(productId, updatedProduct) => {
        try {
            const formData = new FormData();
            for (const key in updatedProduct) {
                if (key === 'user') {
                    formData.append('user_id', updatedProduct.user_id);
                    formData.append('user_name', updatedProduct.user.name);
                    formData.append('user_phone', updatedProduct.user.phone);
                    formData.append('user_avatar', updatedProduct.user.avatar);
                    formData.append('user_rating', updatedProduct.user.rating);
                } else if (key !== 'image_url') {
                    formData.append(key, updatedProduct[key]);
                }
            }
            if (updatedProduct.image) {
                formData.append('image', updatedProduct.image);
            }

            const response = await fetch(`http://localhost:8000/api/items/${productId}`, {
                method: 'PUT',
                body: formData,
            });
            const data = await response.json();
            if (data.success) {
                setProducts((prev) =>
                    prev.map((p) => (p.id === productId ? data.data : p))
                );
                window.dispatchEvent(new CustomEvent('productUpdated', { detail: { action: 'updated', product: data.data } }));
            } else {
                throw new Error(data.message || 'Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    }, []);

    const deleteProduct = useCallback(async(productId) => {
        try {
            const response = await fetch(`http://localhost:8000/api/items/${productId}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (data.success) {
                setProducts((prev) => prev.filter((p) => p.id !== productId));
                window.dispatchEvent(new CustomEvent('productUpdated', { detail: { action: 'deleted', productId } }));
            } else {
                throw new Error(data.message || 'Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }, []);

    return ( <
        ProductContext.Provider value = {
            { products, addProduct, updateProduct, deleteProduct, fetchProducts } } > { children } <
        /ProductContext.Provider>
    );
};
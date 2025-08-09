import { createContext, useState, useCallback } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([{
        id: '1',
        name: 'Sample Product',
        category_id: '1',
        province_id: 'phnom-penh',
        price: 10.00,
        stock: 100,
        unit: 'kg',
        description: 'A sample product for testing.',
        image_url: '/placeholder.svg?height=300&width=300',
        user_id: '1',
        user: {
            name: 'Sample Farmer',
            phone: '123456789',
            avatar: '/placeholder.svg?height=100&width=100',
            rating: 4.5
        },
        latitude: 11.5564,
        longitude: 104.9282,
        rating: 4.5,
        is_popular: true,
        created_at: new Date().toISOString()
    }]);

    const addProduct = useCallback((product) => {
        setProducts((prev) => {
            const newList = [];
            for (let i = 0; i < prev.length; i++) {
                newList.push(prev[i]);
            }

            const newProduct = {
                id: String(Date.now()),
                name: product.name,
                category_id: product.category_id,
                province_id: product.province_id,
                price: product.price,
                stock: product.stock,
                unit: product.unit,
                description: product.description,
                image_url: product.image_url,
                user_id: product.user_id,
                latitude: product.latitude,
                longitude: product.longitude,
                rating: product.rating ? product.rating : 4.5,
                is_popular: product.is_popular ? product.is_popular : false,
                created_at: new Date().toISOString(),
                user: {
                    name: product.user && product.user.name ? product.user.name : 'Unknown Farmer',
                    phone: product.user && product.user.phone ? product.user.phone : 'N/A',
                    avatar: product.user && product.user.avatar ? product.user.avatar : '/placeholder.svg',
                    rating: product.user && product.user.rating ? product.user.rating : 4.5
                }
            };

            newList.push(newProduct);
            return newList;
        });
    }, []);

    const updateProduct = useCallback((productId, updatedProduct) => {
        setProducts((prev) => {
            const updatedList = [];
            for (let i = 0; i < prev.length; i++) {
                if (prev[i].id === productId) {
                    const updatedItem = {};
                    for (const key in prev[i]) {
                        updatedItem[key] = prev[i][key];
                    }
                    for (const key in updatedProduct) {
                        updatedItem[key] = updatedProduct[key];
                    }
                    updatedItem.updated_at = new Date().toISOString();
                    updatedList.push(updatedItem);
                } else {
                    updatedList.push(prev[i]);
                }
            }
            return updatedList;
        });
    }, []);

    const deleteProduct = useCallback((productId) => {
        setProducts((prev) => {
            const filteredList = [];
            for (let i = 0; i < prev.length; i++) {
                if (prev[i].id !== productId) {
                    filteredList.push(prev[i]);
                }
            }
            return filteredList;
        });
    }, []);

    return ( <
        ProductContext.Provider value = {
            { products, addProduct, updateProduct, deleteProduct }
        } > { children } <
        /ProductContext.Provider>
    );
};
import WebService from './WebService';

const ProductService = {
    getProducts: async (queries) => {
        const response = await WebService.get(`/products`, queries);
        return await response.json();
    },
    getProductsByCategory: async (category) => {
        const response = await WebService.get(`/products/category/${category}`);
        return await response.json();
    },
    getProductById: async (productId) => {
        const response = await WebService.get(`/products/${productId}`);
        return await response.json();
    },
    addCustomProduct: async (productId, body) => {
        const response = await WebService.postForm(`/${productId}/custom-products`, body);
        return await response.json();
    },
    addToCart: async (productId, quantity) => {
        const body = { customProductId: productId, quantity: 1 };
        console.log(body);
        const response = await WebService.postJson(`/carts/add-to-cart`, body);
        return response;
    },
    viewCart: async () => {
        const response = await WebService.get(`/carts/view-cart`);
        const { data } = response;
        console.log(data);
        return response.json();
    },
    setQuantity: async (productId, quantity) => {
        const response = await WebService.putJson(
            `/carts/update-item?customProductId=${productId}&quantity=${quantity}`,
            null,
        );
        return response.json();
    },
    deleteLineItem: async (productId) => {
        const response = await WebService.putJson(`/carts/update-item?customProductId=${productId}&quantity=0`, null);
        return response.json();
    },
};

export default ProductService;

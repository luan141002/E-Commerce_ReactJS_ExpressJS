import WebService from './WebService';

const OrderService = {
    placeOrder: async () => {
        const response = await WebService.postJson(`/carts/order`, null);
        return await response.json();
    },
    getUserInfo: async () => {
        const response = await WebService.get(`/users`);
        return await response.json();
    },
    getOrderById: async (orderId) => {
        const response = await WebService.get(`/orders/${orderId}`);
        return await response.json();
    },
};

export default OrderService;

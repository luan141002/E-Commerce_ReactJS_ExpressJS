import WebService from './WebService';

const AdminService = {
    checkAdmin: async () => {
        let isAdmin = false;
        try {
            const response = await WebService.get(`/forAdmin`);
            isAdmin = true;
        } catch (err) {
            isAdmin = false;
        }
        return isAdmin;
        // return await response.json();
    },
    getUsers: async () => {
        const response = await WebService.get(`/users`);
        return response.json();
        // return await response.json();
    },
    getProducts: async () => {
        const response = await WebService.get(`/products?limit=50`);
        return response.json();
        // return await response.json();
    },
    getOrders: async () => {
        const response = await WebService.get(`/orders`);
        return response.json();
        // return await response.json();
    },
    deleteUser: async (userName) => {
        const response = await WebService.delete(`/${userName}`);
        return response;
        // return await response.json();
    },
    getOrderStatistic: async () => {
        const response = await WebService.get(`/orders/statistic`);
        return response.json();
    },
    shippedOrder: async (orderId) => {
        const response = await WebService.post(`/orders/${orderId}/shipped`);
        return response;
    },
    reviveUser: async (userName) => {
        const response = await WebService.post(`/${userName}/revive`);
        return response;
        // return await response.json();
    },
};

export default AdminService;

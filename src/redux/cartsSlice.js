import { createSlice } from '@reduxjs/toolkit';

const INITIAL_CART = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const EMPTY_ACCOUNT = {
    memberId: null,
    firstName: null,
    lastName: null,
    email: null,
    id: null,
    roles: [],
    hasProgram: false,
    avatar: '',
};

const cartsSlices = createSlice({
    name: 'cart',
    initialState: INITIAL_CART,
    reducers: {
        addToCart: (state, action) => {
            const { id, name, quantity, image, price } = action?.payload;
            state = [...state, { id: id, name: name, quantity: quantity, image: image, price: price }];
            console.log(state);
            localStorage.setItem('cart', JSON.stringify(state));
        },
        deleteCart: (state, action) => {
            const { id } = action?.payload;
            state = state.filter((item) => item !== id);
            localStorage.setItem('cart', JSON.stringify(state));
        },
        editCart: (state, action) => {
            const { id, quantity } = action?.payload;
            const item = state.find((item) => item.id === id);
            item.quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(state));
        },

        // checkAccountRole: (state, action) => {
        //     if (role.includes('.')) {
        //         const [eKind, eRole] = role.split(/\./);
        //         return (
        //             account.kind.toLowerCase() === eKind &&
        //             account.roles.some((e) => e.toLowerCase() === eRole)
        //         );
        //     } else {
        //         return account.kind.toLowerCase() === role;
        //     }
        // },
        // checkAccount: (state, action) => {
        //     if (typeof roleOrRoles === 'admin') {
        //         return checkAccountRole(account, roleOrRoles);
        //     } else {
        //         return roleOrRoles.some((e) => checkAccountRole(account, e));
        //     }
        // },
    },
});
export default cartsSlices;

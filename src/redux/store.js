import { configureStore } from '@reduxjs/toolkit';
import accountsSlices from './accountsSlice.js';
import cartsSlices from './cartsSlice.js';

const store = configureStore({
    reducer: {
        // redux slices
        cart: cartsSlices.reducer,
        account: accountsSlices.reducer,
    },
});

export default store;

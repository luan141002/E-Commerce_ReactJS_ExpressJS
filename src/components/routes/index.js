// file này để dễ dàng kiểm soát route có trong hệ thống

// pages
import Home from '../../pages/Home';
import About from '../../pages/About/index.js';
import Contact from '../../pages/Contact';
import Products from '../../pages/Products';
import Login from '../../pages/Login';
import RegisterPage from '../../pages/Register';
import ProductDetails from '../../pages/ProductDetails';
import Design from '../../pages/Design';
import CheckoutPage from '../../pages/Checkout/index.js';
import CartPage from '../../pages/CartPage/index.js';
import CreditCard from '../CreditCard/index.js';
import OTPVerification from '../../pages/OTPVerification/index.js';
import Table from '../Table/index.js';
import Dashboard from '../../pages/DashBoard';

// Layouts
import DefaultLayout from '../Layout/defaultLayout';
import AdminLayout from '../Layout/AdminLayout/AdminLayout.js';

const publicRoutes = [
    {
        path: '/homepage',
        component: Home,
        layout: DefaultLayout,
    },
    {
        path: '/products',
        component: Products,
        layout: DefaultLayout,
    },
    {
        path: '/products/:productId',
        component: ProductDetails,
        layout: DefaultLayout,
    },
    {
        path: '/about',
        component: About,
        layout: null,
    },
    {
        path: '/contact',
        component: Contact,
        layout: DefaultLayout,
    },
    {
        path: '/',
        component: Login,
        layout: null,
    },
    {
        path: '/register',
        component: RegisterPage,
        layout: null,
    },
    {
        path: '/design/:productId',
        component: Design,
        layout: DefaultLayout,
    },
    {
        path: '/checkout',
        component: CheckoutPage,
        layout: DefaultLayout,
    },
    {
        path: '/cart',
        component: CartPage,
        layout: null,
    },
    {
        path: '/credit-card',
        component: CreditCard,
        layout: null,
    },
    {
        path: '/otp/:email',
        component: OTPVerification,
        layout: null,
    },
    {
        path: '/admin/users',
        component: Table,
        layout: AdminLayout,
        type: 'users',
    },
    {
        path: '/admin/products',
        component: Table,
        layout: AdminLayout,
        type: 'products',
    },
    {
        path: '/admin/orders',
        component: Table,
        layout: AdminLayout,
        type: 'orders',
    },
    {
        path: '/dashboard',
        component: Dashboard,
        layout: AdminLayout,
    },
];
const privateRoutes = [
    {
        path: '/admin',
        component: '',
    },
    {
        path: '/seller',
        component: '',
    },
];

export { publicRoutes, privateRoutes };

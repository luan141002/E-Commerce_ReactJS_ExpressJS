// file này để dễ dàng kiểm soát route có trong hệ thống

// pages
import Home from '../../pages/Home';
import About from '../../pages/About';
import Contact from '../../pages/Contact';
import Products from '../../pages/Products';
import ProductDetails from '../../pages/ProductDetails';

// Layouts
import DefaultLayout from '../Layout/defaultLayout';

const publicRoutes = [
    {
        path: '/',
        component: Home,
        layout: DefaultLayout,
    },
    {
        path: '/products',
        component: Products,
        layout: DefaultLayout,
    },
    {
        path: '/products/:id',
        component: ProductDetails,
        layout: DefaultLayout,
    },
    {
        path: '/about',
        component: About,
        layout: DefaultLayout,
    },
    {
        path: '/contact',
        component: Contact,
        layout: DefaultLayout,
    },
    {
        path: '/search',
        component: '',
        layout: null,
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

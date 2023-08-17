// file này để dễ dàng kiểm soát route có trong hệ thống

// pages
import Home from '../../pages/Home';
import About from '../../pages/About';
import Contact from '../../pages/Contact';
import Products from '../../pages/Products';
import ProductDetails from '../../pages/ProductDetails';

// Layouts
import defaultLayout from '../Layout/defaultLayout';

const publicRoutes = [
    {
        path: '/',
        component: Home,
        layout: defaultLayout,
    },
    {
        path: '/products',
        component: Products,
        layout: defaultLayout,
    },
    {
        path: '/products/:productid',
        component: ProductDetails,
        layout: '',
    },
    {
        path: '/about',
        component: About,
        layout: defaultLayout,
    },
    {
        path: '/contact',
        component: Contact,
        layout: defaultLayout,
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

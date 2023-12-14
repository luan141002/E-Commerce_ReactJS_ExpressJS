import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faCircle } from '@fortawesome/free-solid-svg-icons';
import { useSpring, animated } from 'react-spring';
import ProductCard from '../../components/Product';
import ProductService from '../../services/ProductService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './home.scss';
const Home = () => {
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    const [moreButton, setMoreButton] = useState(false);

    const [products, setProducts] = useState();

    const backgroundImages = [
        'https://img.ws.mms.shopee.vn/vn-11134210-7qukw-lih5tbrcplho9b',
        'https://vcdn-giaitri.vnecdn.net/2022/04/29/image001-2296-1651230581.jpg',
        'https://icdn.dantri.com.vn/thumb_w/680/2022/07/04/1656907628444levents-l-dantridocx-1656921163686.png',
        'https://tq4.mediacdn.vn/pr/2022/photo1656471307625-16564713077131202000349-63792200649093.jpg',
    ];
    const currentBackground = backgroundImages[backgroundIndex];
    useEffect(() => {
        // Thiết lập một timeout sau 2 giây để thay đổi nền
        const timer = setTimeout(() => {
            setBackgroundIndex((backgroundIndex + 1) % backgroundImages.length);
        }, 2000);

        // Xóa timeout khi component unmount hoặc khi backgroundIndex thay đổi
        return () => clearTimeout(timer);
    }, [backgroundIndex, backgroundImages]);

    // animation for submenu of subnavbar
    const buttonAnimation = useSpring({
        from: {
            transform: 'translateY(10%)',
        },
        to: {},
        config: {
            duration: 200, // Adjust this value for faster animation
            easings: 'easeInCubic',
        },
    });

    const loadPage = async () => {
        try {
            const products = await ProductService.getProducts({ page: 0, limit: 8, searchKey: '' });
            setProducts(products);
            console.log(products);
        } catch (err) {
            toast.error('Load failed', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    useEffect(() => {
        loadPage();
    }, []);
    return (
        <div className="w-full min-h-min">
            {/* Thumbnail */}
            <div
                className="w-full h-[750px] flex items-end justify-center bg-no-repeat bg-cover bg-center "
                style={{
                    backgroundImage: `url(${currentBackground})`,
                }}
            >
                {backgroundImages.map((image, index) => {
                    return (
                        <button
                            key={index}
                            className="mb-[10px] mr-[5px]"
                            onClick={() => {
                                setBackgroundIndex(index);
                            }}
                        >
                            <FontAwesomeIcon icon={faCircle} />
                        </button>
                    );
                })}
            </div>
            {/* Products  */}
            <div className="flex flex-col w-full ">
                <div className="py-5 my-6 text-center text-2xl leading-7 font-semibold">NEW ARRIVAL</div>
                <div className=" grid grid-cols-4">
                    {products?.map((product, index) => {
                        return (
                            <div className="" key={index}>
                                <ProductCard product={product} />
                            </div>
                        );
                    })}
                </div>
                <animated.button className="fifth flex self-center justify-center w-[250px] border text-gray-700  py-2 my-6 text-sm leading-4 font-thin">
                    See More
                </animated.button>
            </div>
            {/* Collections */}
            <div className="w-full h-fit">
                <div className="py-5 my-6 text-center text-xl leading-7 font-semibold">NEW COLLECTIONS</div>
                <div className="flex justify-around">
                    <div
                        className="w-[48%] h-[300px] flex justify-center bg-cover bg-center "
                        style={{
                            backgroundImage: 'url("https://levents.asia/wp-content/uploads/2022/12/Desktop-3-100.jpg")',
                        }}
                    >
                        <animated.button className="collections-thumbnail bg-white flex self-end justify-center w-[250px]  text-gray-700  py-2 my-6 text-sm leading-4 font-thin">
                            See More
                        </animated.button>
                    </div>
                    <div
                        className="w-[48%] h-[300px] flex justify-center bg-cover bg-center"
                        style={{
                            backgroundImage:
                                'url("https://levents.asia/wp-content/uploads/2023/02/3anni3D-1920x988.png")',
                        }}
                    >
                        <animated.button className="collections-thumbnail bg-white flex self-end justify-center w-[250px]  text-gray-700  py-2 my-6 text-sm leading-4 font-thin">
                            See More
                        </animated.button>
                    </div>
                </div>
                <div className="flex justify-around mt-3">
                    <div
                        className="w-[33%] h-[300px] flex justify-center bg-cover bg-center"
                        style={{
                            backgroundImage:
                                'url("https://levents.asia/wp-content/uploads/2022/07/homepage-ngang-4-1920x988.jpg")',
                        }}
                    >
                        <animated.button className="collections-thumbnail bg-white flex self-end justify-center w-[250px]  text-gray-700  py-2 my-6 text-sm leading-4 font-thin">
                            See More
                        </animated.button>
                    </div>
                    <div
                        className="w-[33%] h-[300px] flex justify-center bg-cover bg-center"
                        style={{
                            backgroundImage:
                                'url("https://levents.asia/wp-content/uploads/2022/07/196535439_1222462741549191_8477404675761457200_n-1920x988.jpeg")',
                        }}
                    >
                        <animated.button className="collections-thumbnail bg-white flex self-end justify-center w-[250px]  text-gray-700  py-2 my-6 text-sm leading-4 font-thin">
                            See More
                        </animated.button>
                    </div>
                    <div
                        className="w-[33%] h-[300px] flex justify-center bg-cover bg-center"
                        style={{
                            backgroundImage:
                                'url("https://levents.asia/wp-content/uploads/2022/07/collection-animal-banner.jpg")',
                        }}
                    >
                        <animated.button className="collections-thumbnail bg-white flex self-end justify-center w-[250px]  text-gray-700  py-2 my-6 text-sm leading-4 font-thin">
                            See More
                        </animated.button>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Home;

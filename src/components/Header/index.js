import { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCartShopping,
    faUser,
    faChevronDown,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import { easings } from '@react-spring/web';
import './header.css';

const Header = () => {
    // navbar and subNavbar content
    const collections = ['ITHINKIDO', 'ONE PIECE', 'WannaOne', 'colleciton 4'];
    const subNavBar = [
        { colName: 'About Us', link: '/' },
        { colName: 'Cửa hàng', link: '/products', subCol: [1, 2, 3, 4, 5] },
        { colName: 'Giảm giá', link: '/' },
        { colName: 'Bộ sưu tập', link: '/' },
        { colName: 'Mix and match', link: '/' },
        { colName: 'Bài viết', link: '/', subCol: [1, 2, 3, 4, 5] },
        { colName: 'Liên hệ', link: '/' },
        {
            colName: 'Customer Service',
            link: '/',
            subCol: [1, 2, 3, 4, 5],
        },
        { colName: 'Tuyển dụng', link: '/' },
    ];

    // Menu

    // Submenu animation
    const [toggle, setToggle] = useState(0);
    const [openMenus, setOpenMenus] = useState([
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
    ]);
    const [subNavBarToggle, setSubNavBarToggle] = useState(false);
    // decide which one will merge
    const toggleMenu = (index) => {
        setOpenMenus((prevOpenMenus) => {
            const updatedOpenMenus = [...prevOpenMenus];
            updatedOpenMenus.forEach((openMenus, newIndex) => {
                if (newIndex !== index) {
                    updatedOpenMenus[newIndex] = false;
                }
            });
            updatedOpenMenus[index] = !updatedOpenMenus[index];
            return updatedOpenMenus;
        });
    };
    const subMenuLeave = () => {
        setOpenMenus((prevOpenMenus) => {
            const updatedOpenMenus = [...prevOpenMenus];
            updatedOpenMenus.forEach((openMenus, newIndex) => {
                updatedOpenMenus[newIndex] = false;
            });
            return updatedOpenMenus;
        });
    };

    // animation scrolling for sub-navbar
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 150) {
                setSubNavBarToggle(true);
            } else {
                setSubNavBarToggle(false);
            }
        });
    }, []);
    // animation for submenu of subnavbar
    const animationProps = useSpring({
        from: {
            opacity: 0,
            transform: 'translateY(10%)',
        },
        to: {
            opacity: openMenus[toggle] ? 1 : 0,
            transform: openMenus[toggle] ? 'translateY(0%)' : 'translateY(10%)',
        },
        config: {
            duration: 200, // Adjust this value for faster animation
            easings: 'easeInCubic',
        },
    });
    // animation for  subnavbar
    const subNavbarAnimation = useSpring({
        // opacity: subNavBarToggle ? 0 : 1,
        // transform: subNavBarToggle ? 'translateY(-100%)' : 'translateY(0%) ',
        // duration: 2000,
        from: {
            opacity: 1,
            backgroundColor: 'white',
            transform: 'translateY(-120%)',
            height: 'fitContent',
        },
        to: {
            opacity: subNavBarToggle ? 0 : 1,
            transform: subNavBarToggle
                ? 'translateY(-100%)'
                : 'translateY(0%) ',
            height: '',
        },
        config: {
            duration: 300, // Adjust this value for faster animation
            easings: 'easeInCubic',
        },
    });

    return (
        <div id='container' className='w-full fixed bg-white z-20 h-[90px]  '>
            <div class='bg-white shadow-md z-0 w-full border-y border-gray-400 dark:bg-gray-900   '>
                <div class='w-[95%]  flex flex-wrap items-center justify-between mx-auto p-4 h-[90px] max-w-screen-xl'>
                    <a href='https://flowbite.com/' class='flex items-center'>
                        <img
                            src='https://flowbite.com/docs/images/logo.svg'
                            class='h-8 mr-3'
                            alt='Flowbite Logo'
                        />
                        <div className='flex flex-col'>
                            <span class='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
                                Luan's shop
                            </span>
                            <p className='text-gray-500 text-xs '>
                                skincare and clinic
                            </p>
                        </div>
                    </a>
                    <div className='flex flex-col w-[40%] box-border'>
                        <div className='flex space-x-3 px-[3px]'>
                            {collections.map((collection, index) => (
                                <label
                                    key={index}
                                    className='font-bold text-gray-500 text-xs'>
                                    {collection}
                                </label>
                            ))}
                        </div>
                        <div class='relative hidden md:block w-full h-[60%] '>
                            <div class='absolute h-[100%] w-[10%] right-0 flex justify-center items-center hover:bg-black hover:text-white  '>
                                <svg
                                    class='w-4 h-[100%] text-base text-black hover:text-white dark:text-gray-400 self-center'
                                    aria-hidden='true'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 20 20'>
                                    <path
                                        stroke='currentColor'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        stroke-width='2'
                                        d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                                    />
                                </svg>
                            </div>
                            <input
                                type='text'
                                id='search-navbar'
                                class='block w-full p-2 pl-3 text-sm bg-white text-gray-900 border border-gray-300   focus:border-black dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-black dark:focus:border-black'
                                placeholder='Search...'
                            />
                        </div>
                    </div>

                    <div>
                        <ul class='flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
                            <li>
                                <a
                                    href='#'
                                    class='block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent md:text-black md:p-0 md:dark:text-blue-500'
                                    aria-current='page'>
                                    <FontAwesomeIcon icon={faUser} />
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    class='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>
                                    <FontAwesomeIcon icon={faCartShopping} />
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    class='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'>
                                    <img
                                        className='w-[35px] h-[25px]'
                                        src='https://cdn.pixabay.com/photo/2013/07/13/14/18/vietnam-162460_1280.png'
                                        alt='vi'
                                    />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {
                <animated.div
                    className='border-b py-3 px-5 sticky border-gray-400  duration-1000 bg-white '
                    style={subNavbarAnimation}>
                    <ul className='flex justify-between bg-white border-gray-400 '>
                        {subNavBar.map((Topic, index) => {
                            if (!Topic.subCol) {
                                return (
                                    <li
                                        key={index}
                                        onMouseOver={() => {
                                            subMenuLeave();
                                        }}
                                        className='font-light w-[12%]  text-center'>
                                        <Link to={Topic.link}>
                                            {Topic.colName}
                                        </Link>
                                    </li>
                                );
                            } else {
                                return (
                                    // css : relative => absolute => relative : tách  nút ra và gắn định nền để tách cái sau bằng relative để k dính thanh nav bar
                                    <li
                                        key={index}
                                        className='w-[12%] text-center relative'
                                        onMouseOver={() => {
                                            toggleMenu(index);
                                            setToggle(index);
                                        }}
                                        onMouseLeave={() => {
                                            // subMenuLeave();
                                        }}>
                                        <button
                                            id='dropdownDefaultButton'
                                            data-dropdown-toggle='dropdown'
                                            data-dropdown-trigger='hover'
                                            key={index}
                                            name='dropdownButton'
                                            className='font-light '>
                                            <Link to={Topic.link}>
                                                {Topic.colName}
                                            </Link>{' '}
                                            <FontAwesomeIcon
                                                icon={faChevronDown}
                                            />
                                        </button>
                                        {/* <!-- Dropdown menu --> */}
                                        {openMenus[index] && (
                                            <animated.div
                                                id='dropdown'
                                                name='dropdownMenu'
                                                onMouseOver={() => {
                                                    toggleMenu(index);
                                                }}
                                                onMouseLeave={() => {
                                                    subMenuLeave();
                                                }}
                                                style={animationProps}
                                                class='z-10 font-normal mt-4
                                            absolute bg-white transition-transform duration-1000 divide-y
                                            divide-gray-100  shadow
                                            w-full dark:bg-gray-700
                                            dark:divide-gray-600'>
                                                <ul
                                                    class='py-2 text-sm text-gray-700 dark:text-gray-400 relative'
                                                    aria-labelledby='dropdownDefaultButton'>
                                                    {Topic.subCol.map(
                                                        (row, indexNew) => {
                                                            return (
                                                                <li
                                                                    key={
                                                                        indexNew
                                                                    }>
                                                                    <a
                                                                        href='#'
                                                                        class='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>
                                                                        hihi
                                                                    </a>
                                                                </li>
                                                            );
                                                        }
                                                    )}
                                                </ul>
                                            </animated.div>
                                        )}
                                    </li>
                                );
                            }
                        })}
                    </ul>
                </animated.div>
            }
        </div>
    );
};

export default Header;

import React, { useState, useRef, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { products } from '../../services/lib.js';

const ProductDetailPage = () => {
    const product = useRef(products[0]);
    const [pickColor, setPickColor] = useState(0);
    const [mainPicture, setMainPicture] = useState(
        product.current.proImage[0].frontSide
    );
    const [currentColor, setCurrentColor] = useState(
        product.current.proImage[0]
    );
    return (
        <div>
            <section class='overflow-hidden bg-white py-11 font-poppins dark:bg-gray-800'>
                <div class='max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6'>
                    <div class='flex flex-wrap -mx-4'>
                        <div class='w-full px-4 md:w-1/2 '>
                            <div class='flex justify-between top-0 z-10 overflow-hidden '>
                                <div class='flex-col space-y-4 md:flex lg:w-[15%]'>
                                    <div class='lg:w-full  sm:w-1/4'>
                                        <a
                                            href='#'
                                            class='block border  dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300'>
                                            <img
                                                src={currentColor.frontSide}
                                                alt=''
                                                class='object-cover w-full lg:h-20'
                                            />
                                        </a>
                                    </div>
                                    <div class='lg:w-full  sm:w-1/4'>
                                        <a
                                            href='#'
                                            class='block border  dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300'>
                                            <img
                                                src={currentColor.backSide}
                                                alt=''
                                                class='object-cover w-full lg:h-20'
                                            />
                                        </a>
                                    </div>
                                    <div class='lg:w-full  sm:w-1/4'>
                                        <a
                                            href='#'
                                            class='block border border-transparent dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300'>
                                            <img
                                                src={currentColor.frontCollar}
                                                alt=''
                                                class='object-cover w-full lg:h-20'
                                            />
                                        </a>
                                    </div>
                                    <div class='lg:w-full sm:w-1/4'>
                                        <a
                                            href='#'
                                            class='block border border-transparent dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300'>
                                            <img
                                                src={currentColor.backCollar}
                                                alt=''
                                                class='object-cover w-full lg:h-20'
                                            />
                                        </a>
                                    </div>
                                    <div class='lg:w-full  sm:w-1/4'>
                                        <a
                                            href='#'
                                            class='block border border-transparent dark:border-transparent dark:hover:border-blue-300 hover:border-blue-300'>
                                            <img
                                                src={
                                                    currentColor.materialQuality
                                                }
                                                alt=''
                                                class='object-cover w-full lg:h-20'
                                            />
                                        </a>
                                    </div>
                                </div>
                                <div class='relative mb-6 lg:mb-4 lg:h-1/4 lg:w-[80%] '>
                                    <img
                                        src={mainPicture}
                                        alt=''
                                        class='object-cover w-full lg:h-full '
                                    />
                                </div>
                            </div>
                        </div>
                        <div class='w-full px-4 md:w-1/2 '>
                            <div class='lg:pl-20'>
                                <div class='mb-6 '>
                                    <h2 class='max-w-xl mt-2 mb-6 text-xl font-bold dark:text-gray-400 md:text-4xl'>
                                        {product.current.proName}
                                    </h2>
                                    <div class='flex items-center mb-6'>
                                        <ul class='flex mr-2'>
                                            <li>
                                                <a href='#'>
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        width='16'
                                                        height='16'
                                                        fill='currentColor'
                                                        class='w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star '
                                                        viewBox='0 0 16 16'>
                                                        <path d='M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z' />
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a href='#'>
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        width='16'
                                                        height='16'
                                                        fill='currentColor'
                                                        class='w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star '
                                                        viewBox='0 0 16 16'>
                                                        <path d='M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z' />
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a href='#'>
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        width='16'
                                                        height='16'
                                                        fill='currentColor'
                                                        class='w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star '
                                                        viewBox='0 0 16 16'>
                                                        <path d='M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z' />
                                                    </svg>
                                                </a>
                                            </li>
                                            <li>
                                                <a href='#'>
                                                    <svg
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        width='16'
                                                        height='16'
                                                        fill='currentColor'
                                                        class='w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star '
                                                        viewBox='0 0 16 16'>
                                                        <path d='M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z' />
                                                    </svg>
                                                </a>
                                            </li>
                                        </ul>
                                        <p class='text-xs dark:text-gray-400 '>
                                            (2 customer reviews)
                                        </p>
                                    </div>
                                    <p class='max-w-md mb-6 text-gray-700 dark:text-gray-400'>
                                        Lorem ispum dor amet Lorem ispum dor
                                        amet Lorem ispum dor amet Lorem ispum
                                        dor amet Lorem ispum dor amet Lorem
                                        ispum dor amet Lorem ispum dor amet
                                        Lorem ispum dor amet
                                    </p>
                                    <p class='inline-block mb-2 text-2xl font-bold text-gray-700 dark:text-gray-400 '>
                                        <span>${product.current.proPrice}</span>
                                        <span class='text-lg font-semibold text-gray-500 line-through dark:text-gray-400'>
                                            ${product.current.proPrice}
                                        </span>
                                    </p>
                                </div>
                                <div class='flex items-center mb-6'>
                                    <h2 class='w-16 mr-6 text-xl text-gray-600 font-middle dark:text-gray-400'>
                                        Colors:
                                    </h2>
                                    <div class='flex flex-wrap -mx-2 -mb-2'>
                                        {/* <button class='p-1 mb-2 mr-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400 '>
                                            <div class='w-6 h-6 bg-cyan-300'></div>
                                        </button>
                                        <button class='p-1 mb-2 mr-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400'>
                                            <div class='w-6 h-6 bg-green-300 '></div>
                                        </button>
                                        <button class='p-1 mb-2 border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400'>
                                            <div class='w-6 h-6 bg-red-200 '></div>
                                        </button> */}
                                        {product?.current.proImage.map(
                                            (proClass, index) => (
                                                <div className='w-4 h-4  mb-[5px] mr-[5px]'>
                                                    <img
                                                        className='w-4 h-4 mb-[5px] border border-transparent hover:border-blue-400 dark:border-gray-800 dark:hover:border-gray-400'
                                                        onClick={() => {
                                                            setPickColor(index);
                                                        }}
                                                        style={{
                                                            border:
                                                                pickColor ===
                                                                index
                                                                    ? '2px solid gray'
                                                                    : '',
                                                        }}
                                                        src={proClass.color}
                                                        alt=''
                                                    />
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                                <div class='flex items-center mb-6'>
                                    <h2 class='w-16 text-xl font-middle text-gray-600 dark:text-gray-400'>
                                        Size:
                                    </h2>
                                    <div class='flex flex-wrap space-x-2 -mx-2 -mb-2'>
                                        <button class='py-1 mb-2 mr-1 border  text-gray-400 w-11 hover:border-gray-600 dark:border-gray-600 hover:text-gray-600 dark:hover:border-gray-600 dark:text-gray-400'>
                                            XL
                                        </button>
                                        <button class='py-1 mb-2 mr-1 border text-gray-400  w-11 hover:border-gray-600 hover:text-gray-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400'>
                                            S
                                        </button>
                                        <button class='py-1 mb-2 mr-1 border text-gray-400 w-11 hover:border-gray-600 hover:text-gray-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400'>
                                            M
                                        </button>
                                        <button class='py-1 mb-2 mr-1 border text-gray-400 w-11 hover:border-gray-600 hover:text-gray-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400'>
                                            XS
                                        </button>
                                    </div>
                                </div>
                                <div class='w-32 mb-6 '>
                                    <label
                                        for=''
                                        class='w-full text-xl font-semibold text-gray-700 dark:text-gray-400'>
                                        Quantity
                                    </label>
                                    <div class='relative flex flex-row w-full h-10 mt-4 bg-transparent rounded-lg'>
                                        <button class='w-20 h-full text-gray-600 bg-gray-300 rounded-l outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 hover:text-gray-700 dark:bg-gray-900 hover:bg-gray-400'>
                                            <span class='m-auto text-2xl font-thin'>
                                                -
                                            </span>
                                        </button>
                                        <input
                                            type='number'
                                            class='flex items-center w-full font-semibold text-center text-gray-700 placeholder-gray-700 bg-gray-300 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black'
                                            placeholder='1'
                                        />
                                        <button class='w-20 h-full text-gray-600 bg-gray-300 rounded-r outline-none cursor-pointer dark:hover:bg-gray-700 dark:text-gray-400 dark:bg-gray-900 hover:text-gray-700 hover:bg-gray-400'>
                                            <span class='m-auto text-2xl font-thin'>
                                                +
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div class='flex flex-wrap items-center -mx-4 '>
                                    <div class='w-full px-4 mb-4 lg:w-1/2 lg:mb-0'>
                                        <animated.button className='fifth flex self-center justify-center w-[250px] border text-gray-700  py-2 my-6 text-sm leading-4 font-thin'>
                                            Add to cart
                                        </animated.button>
                                    </div>
                                    <div class='w-full px-4 mb-4 lg:mb-0 lg:w-1/2'>
                                        <button class='rounded-full ml-4 w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4'>
                                            <svg
                                                fill='currentColor'
                                                stroke-linecap='round'
                                                stroke-linejoin='round'
                                                stroke-width='2'
                                                class='w-5 h-5'
                                                viewBox='0 0 24 24'>
                                                <path d='M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z'></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductDetailPage;

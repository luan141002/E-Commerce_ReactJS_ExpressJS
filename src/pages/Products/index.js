import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import ProductCard from '../../components/Product';
import { products } from '../../services/lib.js';

import './product.scss';
function ProductList() {
    const [productList, setProductList] = useState(products);
    const [listNumber, setlistNumber] = useState(0);
    function seeMore() {
        for (var i = 0; i < listNumber + 1; i++) {
            setProductList([...ProductList, ...products]);
        }
        setlistNumber(listNumber + 1);
    }

    return (
        <div className='w-full h-fit bg-white mt-16 font-light leading-4 px-[1.5rem] space-y-10'>
            <div className='w-full'>
                <label className='hover:font-normal'>
                    {' '}
                    Home / <span className='font-normal '>Shopping</span>{' '}
                </label>
            </div>
            <div className='w-full flex justify-between h-fit items-center'>
                <div className='flex space-x-2 items-center'>
                    <FontAwesomeIcon icon={faFilter} />
                    <label>Filter</label>
                </div>
                <div className='flex space-x-2 items-center'>
                    <label>Filter by</label>
                    <select
                        id='filterFactor'
                        className='px-[20px] py-[5px] bg-white border border-gray-400'>
                        <option value=''>From lowest to highest price</option>
                        <option value=''>From highest to lowest price</option>
                        <option value=''>Best seller</option>
                    </select>
                </div>
            </div>
            {/* Products  */}
            <div className='flex flex-col w-full '>
                <div className=' grid grid-cols-4 '>
                    {productList.map((product, index) => {
                        return (
                            <div className='mt-[5px]' key={index}>
                                <ProductCard product={product} />
                            </div>
                        );
                    })}
                </div>
                <button
                    className='fifth flex self-center justify-center w-[250px] border text-gray-700  py-2 my-12 text-sm leading-4 font-thin'
                    onClick={() => seeMore()}>
                    See More
                </button>
            </div>
            <img
                className='w-full'
                src='https://levents.asia/wp-content/uploads/2023/03/1920x760-1920x988.png'
                alt='panel'
            />
        </div>
    );
}

export default ProductList;

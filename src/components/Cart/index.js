import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductCart from '../ProductCart';
import ProductService from '../../services/ProductService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Cart = ({ setShowCart }) => {
    const navigate = useNavigate();

    const [carts, setCarts] = useState();
    const [totalPrice, setTotalPrice] = useState(0);

    const [reloadCart, setReloadCart] = useState(0);

    useMemo(() => {
        async function fetchMyAPI() {
            try {
                const cartList = await ProductService.viewCart();

                setCarts(cartList.cartItem);
                const totalBillPrice = cartList?.cartItem?.reduce((accumulator, currentItem) => {
                    console.log(currentItem);
                    return accumulator + currentItem.totalPrice;
                }, 0);
                setTotalPrice(totalBillPrice);
            } catch (err) {
                // toast.error('Load cart failed', {
                //     position: toast.POSITION.TOP_RIGHT,
                // });
            }
        }
        fetchMyAPI();
    }, [reloadCart]);
    console.log(carts);
    return (
        <div
            className="absolute top-12 right-2 z-50 round-lg"
            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return;
                }
                setShowCart(false);
            }}
        >
            <div class="mx-auto mt-8 max-w-2xl md:mt-12">
                <div class="bg-white shadow">
                    <div class="px-4 py-6 sm:px-8 sm:py-10">
                        <div class="flow-root">
                            <ul class="-my-8">
                                {carts?.map((lineItem) => {
                                    return <ProductCart lineItem={lineItem} setReloadCart={setReloadCart} />;
                                })}
                            </ul>
                        </div>

                        <div class="mt-6 border-t border-b py-2">
                            <div class="flex items-center justify-between">
                                <p class="text-sm text-gray-400">Subtotal</p>
                                <p class="text-lg font-semibold text-gray-900">{totalPrice}vnđ</p>
                            </div>
                            <div class="flex items-center justify-between">
                                <p class="text-sm text-gray-400">Shipping</p>
                                <p class="text-lg font-semibold text-gray-900">30000vnđ</p>
                            </div>
                        </div>
                        <div class="mt-6 flex items-center justify-between">
                            <p class="text-sm font-medium text-gray-900">Total</p>
                            <p class="text-2xl font-semibold text-gray-900">
                                <span class="text-xs font-normal text-gray-400">VND</span> {totalPrice + 30000}vnđ
                            </p>
                        </div>

                        <div
                            class="mt-6 text-center"
                            onClick={() => {
                                navigate('/checkout');
                            }}
                        >
                            <button
                                type="button"
                                class="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                            >
                                Checkout
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="group-hover:ml-8 ml-4 h-6 w-6 transition-all"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                >
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Cart;

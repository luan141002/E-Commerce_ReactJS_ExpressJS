import React, { useEffect, useState, useMemo } from 'react';
import ProductService from '../../services/ProductService';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductCart = ({ lineItem, setReloadCart }) => {
    const [quantity, setQuantity] = useState(lineItem?.quantity);
    const [quantityFlag, setQuantityFlag] = useState(0);
    console.log(lineItem.customProduct.id);

    async function handleChangeQuantity(lineItemId, quantity) {
        await ProductService.setQuantity(lineItemId, quantity);
    }
    return (
        <div class="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
            <div class="shrink-0">
                <img
                    class="h-24 w-24 max-w-full rounded-lg object-cover"
                    src={lineItem?.customProduct?.customImages[0]?.link}
                    alt=""
                />
            </div>

            <div class="relative flex flex-1 flex-col justify-between">
                <div class="sm:col-gap-5 sm:grid sm:grid-cols-2">
                    <div class="pr-8 sm:pr-5">
                        <p class="text-base font-semibold text-gray-900">
                            Customized {lineItem?.customProduct?.productEntity?.productName}
                        </p>
                        <p class="text-base font-semibold text-gray-900">
                            {lineItem?.customProduct?.productEntity?.category?.name}
                        </p>
                        <p class="mx-0 mt-1 mb-0 text-sm text-gray-400">x{lineItem?.quantity}</p>
                    </div>

                    <div class="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                        <p class="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                            {lineItem?.totalPrice}vnđ
                        </p>

                        <div class="sm:order-1">
                            <div class="mx-auto flex h-8 items-stretch text-gray-600">
                                <button
                                    class="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                    onClick={() => {
                                        try {
                                            handleChangeQuantity(lineItem.customProduct.id, quantity - 1);
                                            setQuantity((state) => state - 1);
                                            setReloadCart((state) => state + 1);
                                        } catch (err) {
                                            toast.error('Removed this Item from cart', {
                                                position: toast.POSITION.TOP_RIGHT,
                                            });
                                        }
                                    }}
                                >
                                    -
                                </button>
                                <div class="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">
                                    {quantity}
                                </div>
                                <button
                                    class="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white"
                                    onClick={async () => {
                                        try {
                                            await handleChangeQuantity(lineItem.customProduct.id, quantity + 1);
                                            setQuantity((state) => state + 1);
                                            setReloadCart((state) => state + 1);
                                        } catch (err) {
                                            toast.error('add quantity  failed', {
                                                position: toast.POSITION.TOP_RIGHT,
                                            });
                                        }
                                    }}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    class="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto"
                    onClick={async () => {
                        try {
                            await handleChangeQuantity(lineItem.customProduct.id, 0);
                            setReloadCart((state) => state + 1);
                        } catch (err) {
                            toast.error('Delete Item failed', {
                                position: toast.POSITION.TOP_RIGHT,
                            });
                        }
                    }}
                >
                    <button
                        type="button"
                        class="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900"
                    >
                        <svg
                            class="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"
                                class=""
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCart;

import React, { useState, useEffect } from 'react';
import OrderService from '../../services/OrderService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderDetails = ({ orderId, setOpenOrderDetails }) => {
    const [order, setOrder] = useState();
    useEffect(() => {
        async function fetchMyAPI() {
            try {
                const order = await OrderService.getOrderById(orderId);
                setOrder(order);
                console.log(order);
            } catch (err) {
                toast.error('Load Order failed', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        }
        fetchMyAPI();
    }, []);
    return (
        <div
            class="fixed right-0 left-0 top-0 bottom-0 px-2 scrollbar-hide py-4 overflow-scroll z-50
            justify-center items-center flex bg-[#00000080] "
            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return;
                }
                setOpenOrderDetails(false);
            }}
        >
            <div
                className=" max-h-[95vh]
                bg-white text-black font-bold shadow-md shadow-[#364e7e1a]
                max-w-6xl mx-auto w-full  p-4  rounded-xl space-y-3"
            >
                <div className="flex justify-around">
                    <div className="w-[50%]">
                        <label className="text-[30px] font-semibold capitalize">Order Detail</label>
                        <div class="sm:col-span-2 ">
                            <label for="last-name" class="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <div class="mt-1">
                                <input
                                    type="text"
                                    id="fullName"
                                    class="block w-full py-3 px-4 border  border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={order?.orderFullName}
                                />
                            </div>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="address" class="block text-sm font-medium text-gray-700">
                                Address
                            </label>
                            <div class="mt-1">
                                <input
                                    type="text"
                                    id="address"
                                    autocomplete="street-address"
                                    class="block w-full border-gray-300 border py-3 px-4 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={order?.orderFullAddress}
                                />
                            </div>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="phone" class="block text-sm font-medium text-gray-700">
                                Phone
                            </label>
                            <div class="mt-1">
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    class="block w-full border-gray-300 border py-3 px-4 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={order?.orderContactNumber}
                                />
                            </div>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="status" class="block text-sm font-medium text-gray-700">
                                Status
                            </label>
                            <div class="mt-1">
                                <input
                                    type="text"
                                    name="phone"
                                    id="status"
                                    autocomplete="tel"
                                    class="block w-full border-gray-300 py-3 border px-4 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={order?.orderStatus}
                                />
                            </div>
                        </div>
                        <div class="sm:col-span-2">
                            <label for="status" class="block text-sm font-medium text-gray-700">
                                Payment Status
                            </label>
                            <div class="mt-1">
                                <input
                                    type="text"
                                    name="phone"
                                    id="status"
                                    autocomplete="tel"
                                    class="block w-full border-gray-300 py-3 border px-4 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    value={'PAID'}
                                />
                            </div>
                        </div>
                    </div>
                    <img src={order?.customProductEntity?.customImages[0]?.link} className="w-[40%] h-[400px] " />
                </div>
                <div className="full p-6 items-center">
                    <div class="sm:col-span-2 ">
                        <label for="status" class="block text-sm font-medium text-gray-700">
                            Payment Method
                        </label>
                        <div class="mt-1">
                            <input
                                type="text"
                                name="phone"
                                id="status"
                                autocomplete="tel"
                                class="block w-full border-gray-300 py-3 border px-4 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={'Paypal'}
                            />
                        </div>
                    </div>
                    <div class="sm:col-span-2">
                        <label for="status" class="block text-sm font-medium text-gray-700">
                            Quantity
                        </label>
                        <div class="mt-1">
                            <input
                                type="text"
                                name="phone"
                                id="status"
                                autocomplete="tel"
                                class="block w-full border-gray-300 py-3 border px-4 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={order?.quantity}
                            />
                        </div>
                    </div>
                    <div class="sm:col-span-2">
                        <label for="status" class="block text-sm font-medium text-gray-700">
                            Order Amount
                        </label>
                        <div class="mt-1">
                            <input
                                type="text"
                                name="phone"
                                id="status"
                                autocomplete="tel"
                                class="block w-full border-gray-300 py-3 border px-4 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={order?.orderAmount}
                            />
                        </div>
                    </div>
                    <div class="sm:col-span-2">
                        <label for="status" class="block text-sm font-medium text-gray-700">
                            Created Date
                        </label>
                        <div class="mt-1">
                            <input
                                type="text"
                                name="phone"
                                id="status"
                                autocomplete="tel"
                                class="block w-full border-gray-300 py-3 px-4 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={order?.createdDate}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default OrderDetails;

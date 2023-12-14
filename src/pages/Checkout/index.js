import React, { useEffect, useMemo, useState } from 'react';
import ProductCart from '../../components/ProductCart';
import Paypal from '../../components/Paypal';
import { faL } from '@fortawesome/free-solid-svg-icons';
import ProductService from '../../services/ProductService';
import { useStyleRegister } from 'antd/es/theme/internal';
import { useForm } from 'react-hook-form';
import OrderService from '../../services/OrderService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm();
    const navigate = useNavigate();

    const [cartProductList, setCartProductList] = useState();
    const [selectedOption, setSelectedOption] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(false);

    const [totalPrice, setTotalPrice] = useState(0);
    const [billPrice, setBillPrice] = useState(0);

    const [deliveryMethod, setDeliveryMethod] = useState('Standard');

    const handleDeliveryMethodChange = (event) => {
        setDeliveryMethod(event.target.value);
    };

    useMemo(() => {
        console.log(paymentStatus);
    }, [paymentStatus]);

    useEffect(() => {
        async function fetchMyAPI() {
            const cartList = await ProductService.viewCart();

            setCartProductList(cartList.cartItem);
            const totalBillPrice = cartList?.cartItem?.reduce((accumulator, currentItem) => {
                console.log(currentItem);
                return accumulator + currentItem.totalPrice;
            }, 0);
            setTotalPrice(totalBillPrice);
            setBillPrice(totalBillPrice + 30000 + totalPrice * (10 / 100));
        }
        fetchMyAPI();
    }, []);

    const handleRadioButtonChange = (event) => {
        const value = event.target.value;
        setSelectedOption(value);
        console.log(`Selected option: ${value}`);
    };

    const changeFieldNameInList = (list, oldFieldName, newFieldName) => {
        return list.map((item, i) => {
            const newItem = { ...item };
            newItem[newFieldName] = newItem[oldFieldName];
            delete newItem[oldFieldName];
            return newItem;
        });
    };
    const onSubmit = (data) => {
        data['orderAmount'] = billPrice;
        data['orderProductQuantityList'] = changeFieldNameInList(cartProductList, 'id', 'customProductId');
        console.log(data);
        // Gửi dữ liệu form đi ở đây
    };
    return (
        <div>
            <main class="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
                <div class="max-w-2xl mx-auto lg:max-w-none">
                    <form class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <h1 class="text-2xl font-medium text-gray-900">Shipping information</h1>
                            <div class="  pt-10">
                                <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                    {/* <div class="sm:col-span-2">
                                        <label for="last-name" class="block text-sm font-medium text-gray-700">
                                            Full Name
                                        </label>
                                        <div class="mt-1">
                                            <input
                                                type="text"
                                                id="fullName"
                                                class="block w-full py-3 px-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                {...register('fullName', {
                                                    required: 'Full Name is required',
                                                })}
                                                value={user?.userFirstName + ' ' + user?.userLastName}
                                            />
                                            {errors?.fullName && (
                                                <p className="text-red-500 text-xs mt-1">{errors?.fullName?.message}</p>
                                            )}
                                        </div>
                                    </div> */}

                                    {/* <div class="sm:col-span-2">
                                        <label for="address" class="block text-sm font-medium text-gray-700">
                                            Address
                                        </label>
                                        <div class="mt-1">
                                            <input
                                                type="text"
                                                id="address"
                                                autocomplete="street-address"
                                                class="block w-full border-gray-300 py-3 px-4 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                {...register('fullAddress', {
                                                    required: 'Order Address is required',
                                                })}
                                                value={user?.address}
                                            />
                                            {errors?.fullAddress && <p>{errors?.fullAddress?.message}</p>}
                                        </div>
                                    </div> */}

                                    {/* <div class="sm:col-span-2">
                                        <label for="apartment" class="block text-sm font-medium text-gray-700">
                                            Apartment, suite, etc.
                                        </label>
                                        <div class="mt-1">
                                            <input
                                                type="text"
                                                name="apartment"
                                                id="apartment"
                                                class="block w-full border-gray-300 py-3 px-4 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label for="city" class="block text-sm font-medium text-gray-700">
                                            City
                                        </label>
                                        <div class="mt-1">
                                            <input
                                                type="text"
                                                name="city"
                                                id="city"
                                                autocomplete="address-level2"
                                                class="block w-full border-gray-300 py-3 px-4 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label for="country" class="block text-sm font-medium text-gray-700">
                                            Country
                                        </label>
                                        <div class="mt-1">
                                            <select
                                                id="country"
                                                name="country"
                                                autocomplete="country-name"
                                                class="block w-full border-gray-300 py-3 px-4 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            >
                                                <option>United States</option>
                                                <option>Canada</option>
                                                <option>Mexico</option>
                                            </select>
                                        </div>
                                    </div> */}

                                    {/* <div class="sm:col-span-2">
                                        <label for="phone" class="block text-sm font-medium text-gray-700">
                                            Phone
                                        </label>
                                        <div class="mt-1">
                                            <input
                                                type="number"
                                                name="phone"
                                                id="phone"
                                                autocomplete="tel"
                                                class="block w-full border-gray-300 py-3 px-4 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                {...register('contactNumbe', {
                                                    required: 'Contact Number is required',
                                                })}
                                                value={user?.contactNumber}
                                            />
                                            {errors?.contactNumbe && <p>{errors?.contactNumbe?.message}</p>}
                                        </div>
                                    </div> */}
                                </div>
                            </div>

                            <div class="mt-10 border-t border-gray-200 pt-10">
                                <fieldset>
                                    <legend className="text-lg font-medium text-gray-900">Delivery method</legend>

                                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                                        <label
                                            className={`relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none ${
                                                deliveryMethod === 'Standard' ? 'ring-2 ring-indigo-500' : ''
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="delivery-method"
                                                value="Standard"
                                                className="sr-only"
                                                checked={deliveryMethod === 'Standard'}
                                                onChange={handleDeliveryMethodChange}
                                            />
                                            <div className="flex-1 flex">
                                                <div className="flex flex-col">
                                                    <span className="block text-sm font-medium text-gray-900">
                                                        Standard
                                                    </span>
                                                    <span className="mt-1 flex items-center text-sm text-gray-500">
                                                        4–10 business days
                                                    </span>
                                                    <span className="mt-6 text-sm font-medium text-gray-900">
                                                        $5.00
                                                    </span>
                                                </div>
                                            </div>
                                            <svg
                                                className="h-5 w-5 text-indigo-600"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <div
                                                className="absolute -inset-px rounded-lg border-2 pointer-events-none"
                                                aria-hidden="true"
                                            ></div>
                                        </label>

                                        <label
                                            className={`relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none ${
                                                deliveryMethod === 'Express' ? 'ring-2 ring-indigo-500' : ''
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name="delivery-method"
                                                value="Express"
                                                className="sr-only py-3 px-4"
                                                checked={deliveryMethod === 'Express'}
                                                onChange={handleDeliveryMethodChange}
                                            />
                                            <div className="flex-1 flex">
                                                <div className="flex flex-col">
                                                    <span className="block text-sm font-medium text-gray-900">
                                                        Express
                                                    </span>
                                                    <span className="mt-1 flex items-center text-sm text-gray-500">
                                                        2–5 business days
                                                    </span>
                                                    <span className="mt-6 text-sm font-medium text-gray-900">
                                                        $16.00
                                                    </span>
                                                </div>
                                            </div>
                                            <svg
                                                className="h-5 w-5 text-indigo-600"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <div
                                                className="absolute -inset-px rounded-lg border-2 pointer-events-none"
                                                aria-hidden="true"
                                            ></div>
                                        </label>
                                    </div>
                                </fieldset>
                            </div>

                            {/* <!-- Payment --> */}
                            <div class="mt-10 border-t border-gray-200 pt-10">
                                <h2 class="text-lg font-medium text-gray-900">Payment</h2>

                                {/* <fieldset class="mt-4">
                                    <legend class="sr-only">Payment type</legend>
                                    <div class="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                                        <div class="flex items-center">
                                            <input
                                                id="paypal"
                                                value="paypal"
                                                name="payment-type"
                                                checked={selectedOption === 'paypal'}
                                                onChange={handleRadioButtonChange}
                                                type="radio"
                                                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                            />
                                            <label for="paypal" class="ml-3 block text-sm font-medium text-gray-700">
                                                {' '}
                                                PayPal{' '}
                                            </label>
                                        </div>
                                    </div>
                                </fieldset> */}
                                <div>
                                    <Paypal setBillPrice={setBillPrice} billPrice={billPrice} />
                                </div>
                            </div>
                        </div>

                        {/* <!-- Order summary --> */}
                        <div class="mt-10 lg:mt-0">
                            <h2 class="text-lg font-medium text-gray-900">Order summary</h2>

                            <div class="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                                <h3 class="sr-only">Items in your cart</h3>
                                <ul class="-my-3 px-3 py-5">
                                    {cartProductList?.map((lineItem, index) => (
                                        <ProductCart lineItem={lineItem} />
                                    ))}
                                </ul>
                                <dl class="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                                    <div class="flex items-center justify-between">
                                        <dt class="text-sm">Subtotal</dt>
                                        <dd class="text-sm font-medium text-gray-900">{totalPrice}vnđ</dd>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <dt class="text-sm">Shipping</dt>
                                        <dd class="text-sm font-medium text-gray-900">30000vnđ</dd>
                                    </div>
                                    <div class="flex items-center justify-between">
                                        <dt class="text-sm">Taxes</dt>
                                        <dd class="text-sm font-medium text-gray-900">{(totalPrice * 10) / 100}vnđ</dd>
                                    </div>
                                    <div class="flex items-center justify-between border-t border-gray-200 pt-6">
                                        <dt class="text-base font-medium">Total</dt>
                                        <dd class="text-base font-medium text-gray-900">{billPrice}vnđ</dd>
                                    </div>
                                </dl>

                                <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
                                    <button
                                        type="submit"
                                        disabled={billPrice > 0}
                                        onClick={async () => {
                                            try {
                                                if (billPrice === 0) {
                                                    await OrderService.placeOrder();
                                                    toast.success('Place order successfully', {
                                                        position: toast.POSITION.TOP_RIGHT,
                                                    });
                                                    navigate('/homepage');
                                                }
                                            } catch (err) {
                                                toast.error('Place order failed', {
                                                    position: toast.POSITION.TOP_RIGHT,
                                                });
                                            }
                                        }}
                                        class="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                                    >
                                        Confirm order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
            <ToastContainer />
        </div>
    );
};

export default CheckoutPage;

// const loadPage = () => {
//     const lineItems = [
//         {
//             image: 'data:image/jpeg;base64,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',
//             name: 'Nike Air Max 2019',
//             size: '36EU - 4US',
//             price: 259.0,
//         },
//         {
//             image: 'data:image/jpeg;base64,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',
//             name: 'Nike Air Max 2019',
//             size: '36EU - 4US',
//             price: 259.0,
//         },
//         {
//             image: 'data:image/jpeg;base64,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',
//             name: 'Nike Air Max 2019',
//             size: '36EU - 4US',
//             price: 259.0,
//         },
//     ];
//     setCartProductList(lineItems);
// };

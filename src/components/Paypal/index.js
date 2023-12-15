import React, { useRef, useEffect } from 'react';

const Paypal = ({ setBillPrice, billPrice }) => {
    const paypal = useRef();
    const i = billPrice.toFixed(2) || 45.45;
    console.log(billPrice);
    useEffect(() => {
        window.paypal
            .Buttons({
                createOrder: (data, actions, err) => {
                    return actions.order.create({
                        intent: 'CAPTURE',
                        purchase_units: [
                            {
                                description: 'Cool Looking tShirt',
                                amount: {
                                    currency_code: 'USD',
                                    value: i,
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log(order);
                    setBillPrice(0);
                },
                onError: (err) => {
                    console.log(err);
                },
            })
            .render(paypal.current);
    }, []);
    return <div ref={paypal}></div>;
};

export default Paypal;

// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// // import PayPalCheckoutButton from './PayPalCheckoutButton';
// import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
// import { useDispatch, useSelector } from 'react-redux';
// // // Separate UI components for each payment method

// export default function PayPalMethod({ billPrice }) {
//     const navigate = useNavigate();
//     // creates a paypal order
//     const createOrder = (data, actions) => {
//         return actions.order.create({
//             purchase_units: [
//                 {
//                     amount: {
//                         currency_code: 'USD',
//                         value: billPrice,
//                     },

//                     owner: user._id,

//                     totalAmount: billPrice,
//                     paymentMethod: 'paypal',
//                     shippingFee: 2,
//                     status: 'processing',
//                 },
//             ],
//         });
//     };
//     // check Approval
//     const onApprove = async (data, actions) => {
//         const order = await actions.order.capture();
//         handleSubmitOrder();
//     };
//     //capture likely error
//     const onError = (data, actions) => {
//         console.error('An error occurred with the PayPal payment:', data);
//         // Handle the error, display an error message, etc.
//     };

//     return (
//         <PayPalScriptProvider
//             options={{
//                 'client-id': 'AfXWiy2JMs3CETIXuoRcVjnPfVrtKMp-07RYYCu66RQBpMD5EBT2bE0kn_axxABk-SPVSKPFyiVAGvsh',
//             }}
//         >
//             <div sx={{ ml: '132px', width: '600px' }}>
//                 <h1 sx={{ mt: 2, fontSize: '16px', fontWeight: 'bold', mb: 2 }}>Pay with PayPal</h1>
//                 <div>
//                     {/* <PayPalCheckoutButton product={product}></PayPalCheckoutButton> */}
//                     <PayPalButtons
//                         style={{ layout: 'vertical' }}
//                         createOrder={(data, actions) => createOrder(data, actions)}
//                         onApprove={(data, actions) => onApprove(data, actions)}
//                     ></PayPalButtons>
//                 </div>
//             </div>
//         </PayPalScriptProvider>
//     );
// }

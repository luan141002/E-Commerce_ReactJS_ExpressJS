import React, { useState } from 'react';
import OtpInput from 'react-otp-input';

import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import AuthService from '../../services/AuthService';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OTPVerification = () => {
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const { email } = useParams();
    const navigate = useNavigate();

    const handleChange = (code) => {
        setCode(code);
    };
    const onSubmit = async () => {
        if (code.length < 8) {
            setMessage('Verification code must be 8 characters');
            return;
        }
        try {
            const response = await AuthService.activateAccount(email, code);
            if (response.status === 200) {
                navigate('/');
            } else {
                setMessage('Verification process is failed');
            }
        } catch (err) {
            toast.error('Verification process is failed', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };
    return (
        <div>
            <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
                <div class="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                    <div class="mx-auto flex w-full max-w-xl flex-col space-y-16">
                        <div class="flex flex-col items-center justify-center text-center space-y-2">
                            <div class="font-semibold text-3xl">
                                <p>Email Verification</p>
                            </div>
                            <div class="flex flex-row text-sm font-medium text-gray-400">
                                <p>
                                    We have sent a code to your email
                                    {email}
                                </p>
                            </div>
                        </div>

                        <div>
                            <form action="" method="post">
                                <div class="flex flex-col space-y-16 w-[full]">
                                    <OtpInput
                                        value={code}
                                        onChange={handleChange}
                                        numInputs={8}
                                        renderSeparator={<span style={{ width: '8px' }}></span>}
                                        isInputNum={true}
                                        shouldAutoFocus={true}
                                        inputStyle={{
                                            border: '1px solid transparent',
                                            borderRadius: '8px',
                                            width: '54px',
                                            height: '54px',
                                            fontSize: '12px',
                                            color: '#000',
                                            fontWeight: '400',
                                            caretColor: 'blue',
                                            border: '1px solid #CFD3DB',
                                        }}
                                        focusStyle={{
                                            border: '1px solid #CFD3DB',
                                            outline: 'none',
                                        }}
                                        renderInput={(props) => <input {...props} />}
                                    />

                                    <div class="flex flex-col space-y-5">
                                        <div>
                                            <button
                                                type="button"
                                                class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                                                onClick={() => onSubmit()}
                                            >
                                                Verify Account
                                            </button>
                                        </div>
                                        {message && <span className="text-medium text-red-800">{message}</span>}
                                        {/* <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                            <p>Didn't recieve code?</p>{' '}
                                            <a
                                                class="flex flex-row items-center text-blue-600"
                                                href="http://"
                                                // target="_blank"
                                                // rel="noopener noreferrer"
                                            >
                                                Resend
                                            </a>
                                        </div> */}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default OTPVerification;

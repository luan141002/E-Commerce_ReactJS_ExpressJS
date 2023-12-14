import React from 'react';
import { useForm } from 'react-hook-form';
import AuthService from '../../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm();
    const navigate = useNavigate();
    const onSubmit = async (data) => {
        // Gửi dữ liệu đăng ký đi ở đây
        try {
            await AuthService.register(
                data.userName,
                data.userFirstName,
                data.userLastName,
                data.userPassword,
                data.address,
                data.contactNumber,
            );
            navigate(`/otp/${data.userName}`);
            toast.success('Register successfully', {
                position: toast.POSITION.TOP_RIGHT,
            });
        } catch (err) {
            toast.error('Register failed', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };
    return (
        <div className="w-full h-screen">
            <div class="bg-gray-100 flex h-screen items-center justify-center px-4 ">
                <div class="w-full max-w-2xl space-y-8">
                    <div class="bg-white shadow-md rounded-md p-6">
                        <h2 class="my-3 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Sign up for an account
                        </h2>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="w-full mx-auto mt-4 p-4 bg-white rounded shadow-md space-y-3"
                        >
                            <div className="mb-2 flex flex-col">
                                <label>Username:</label>
                                <input
                                    type="text"
                                    {...register('userName', {
                                        required: 'Username is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: 'Invalid email address',
                                        },
                                    })}
                                    className="form-input mt-1 p-3 border "
                                />

                                {errors.userName && <p className="text-red-500 text-sm">{errors.userName.message}</p>}
                            </div>

                            <div className="flex justify-around">
                                <div className="mb-2 flex flex-col w-[48%]">
                                    <label>First Name:</label>
                                    <input
                                        type="text"
                                        {...register('userFirstName', { required: 'First name is required' })}
                                        className="form-input mt-1 p-3 border"
                                    />

                                    {errors.userFirstName && (
                                        <p className="text-red-500 text-sm">{errors.userFirstName.message}</p>
                                    )}
                                </div>

                                <div className="mb-2 flex flex-col w-[48%]">
                                    <label>Last Name:</label>
                                    <input
                                        type="text"
                                        {...register('userLastName', { required: 'Last name is required' })}
                                        className="form-input mt-1 p-3 border"
                                    />

                                    {errors.userLastName && (
                                        <p className="text-red-500 text-sm">{errors.userLastName.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="mb-2 flex flex-col ">
                                <label>Password:</label>
                                <input
                                    type="password"
                                    {...register('userPassword', {
                                        required: 'Password is required',
                                        minLength: { value: 8, message: 'Password must be at least 8 characters' },
                                    })}
                                    className="form-input mt-1 p-3 border"
                                />

                                {errors.userPassword && (
                                    <p className="text-red-500 text-sm">{errors.userPassword.message}</p>
                                )}
                            </div>

                            <div className="mb-2 flex flex-col ">
                                <label>Confirm Password:</label>
                                <input
                                    type="password"
                                    {...register('confirmPassword', {
                                        validate: (value) =>
                                            value === watch('userPassword') || 'Passwords do not match',
                                    })}
                                    className="form-input mt-1 p-3 border"
                                />

                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                                )}
                            </div>

                            <div className="mb-2 flex flex-col ">
                                <label>Address: </label>
                                <input
                                    type="text"
                                    {...register('address', { required: 'Address is required' })}
                                    className="form-input mt-1 p-3 border"
                                />

                                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                            </div>

                            <div className="mb-2 flex flex-col ">
                                <label>Contact Number: </label>
                                <input
                                    type="number"
                                    {...register('contactNumber', {
                                        required: 'Phone number is required',
                                        minLength: 8,
                                    })}
                                    className="form-input mt-1 p-3 border"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`bg-blue-500 text-white rounded py-2 px-4 ${
                                    isSubmitting ? 'cursor-not-allowed opacity-50' : ''
                                }`}
                            >
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default RegisterPage;

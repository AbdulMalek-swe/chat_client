"use client"
import axios from 'axios';
import Link from 'next/link';
import React, { useState } from 'react';
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const loginUser = async (e: any) => {
        e.preventDefault()
        try {
            // Make a POST request using Axios
            const response = await axios.post(`https://chat-api-2-aelj.onrender.com/user/login`, formData);
            // Handle the response, e.g., show a success message or redirect the user
            console.log('Registration successful:', response.data);
            localStorage.setItem("user", JSON.stringify(response?.data?.result))
            return response?.data;
        } catch (error) {
            // Handle errors, e.g., show an error message to the user
            console.error('Registration failed:', error);
        }
    }
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6">Login</h2>
                <form onSubmit={loginUser} className='text-black'>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded-md"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        Register
                    </button>
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link href="/register" className="text-blue-500 hover:underline">
                                Register here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Login;

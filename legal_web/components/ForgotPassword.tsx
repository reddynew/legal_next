"use client"
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Shield, Mail, CheckCircle, Lock } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import { toast } from 'sonner';

const API_BASE_URL = 'https://backend.com.jplawsuvidha.com/api';
// const API_BASE_URL = 'http://localhost:3001/api';


export default function ForgotPasswordForm() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [emailFocused, setEmailFocused] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(
                `${API_BASE_URL}/forgot-password`,
                { email }
            );

            const { status, message } = response.data;

            if (status === 'success') {
                setSuccess(true);
                toast.success(message || 'Password reset link sent');
                return;
            }

            // Handle known error cases from backend
            if (status === 'error') {
                toast.error(message || 'Request failed');
                return;
            }

            // Fallback (should not normally happen)
            toast.error('Unexpected server response');

        } catch (err: any) {
            toast.error(
                err.response?.data?.message ||
                'Unable to process request. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl text-center border border-gray-100">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                        We've sent a password reset link to <span className="font-semibold text-black">{email}</span>. Please check your inbox and follow the instructions.
                    </p>
                    <div className="space-y-4">
                        <Button asChild className="w-full bg-black hover:bg-gray-800 text-white h-12 rounded-xl">
                            <Link href="/login">Back to Login</Link>
                        </Button>
                        <button
                            onClick={() => setSuccess(false)}
                            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            Didn't receive the email? Try again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-black relative overflow-hidden items-center justify-center">

                <div className="relative z-10 w-full max-w-lg px-12">
                    <div className="mb-6 text-center lg:text-left">
                        <div className='flex justify-center mb-4'>
                            <img src="/logo3.avif" alt="JP Law Suvidha Logo" className="h-auto w-[200px] rounded-2xl" />
                        </div>
                        <h1
                            className="text-5xl  mb-4 font-Poppins leading-tight text-center text-white">
                            JP Law Suvidha
                        </h1>
                        <p className="text-xl text-slate-400 font-medium text-center font-Poppins">
                            <span className="text-blue-400">Secure Access Recovery</span> for modern legal professionals.
                        </p>
                    </div>


                </div>
            </div>

            {/* Right Panel - Form */}
            <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-center p-6 lg:p-8">
                    <Link href='/login' className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors group">
                        <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium cursor-pointer">Back to Login</span>
                    </Link>
                </div>

                <div className="flex-1 flex items-center justify-center p-6 lg:p-8">
                    <div className="w-full max-w-md">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-semibold text-gray-900">Forgot Password?</h2>
                            <p className="text-gray-600 mt-2">Enter your email address and we'll send you a link to reset your password.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative">
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setEmailFocused(true)}
                                    onBlur={() => setEmailFocused(false)}
                                    className="w-full h-14 px-4 pt-6 pb-2 border-2 border-gray-400 rounded-lg focus:border-black outline-none transition-all hover:border-gray-500"
                                    placeholder=" "
                                    required
                                />
                                <Label
                                    htmlFor="email"
                                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${emailFocused || email
                                        ? 'top-2 text-xs text-blue-600 font-medium'
                                        : 'top-4 text-base text-gray-400'
                                        }`}
                                >
                                    Email Address
                                </Label>
                                <Mail className="absolute right-4 top-4 text-gray-400 w-5 h-5" />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 bg-black hover:bg-gray-800 text-white font-medium transition-all rounded-lg shadow-lg hover:shadow-xl active:scale-[0.98]"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Sending link...
                                    </div>
                                ) : (
                                    "Send Reset Link"
                                )}
                            </Button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                            <p className="text-xs text-gray-500">
                                Protected by enterprise-grade security standards.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

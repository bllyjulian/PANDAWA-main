'use client';

import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import Image from 'next/image';
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AppAuth() {
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email || !password) {
            setError('Email dan password diperlukan');
            return;
        }
        
        try {
            setIsLoading(true);
            setError('');
            
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.error || 'Login gagal');
            }
            
            // Store user info in local storage
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Remember user if checked
            if (isChecked) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }
            
            // Redirect to dashboard
            router.push('/dashboard');
            
        } catch (err: any) {
            setError(err.message || 'Terjadi kesalahan saat login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col flex-1 lg:w-1/2 w-full">
            <div className="flex flex-col flex-1 justify-center w-full max-w-md mx-auto">
                <div>
                    <div className="mb-5 sm:mb-8">
                        <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                            Log In
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Enter your email and password to Log in!
                        </p>
                    </div>
                    <div>
                        {error && (
                            <div className="p-3 mb-4 text-sm text-red-500 bg-red-100 rounded-md">
                                {error}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-5">
                                <div>
                                    <Label>
                                        Email <span className="text-error-500">*</span>{" "}
                                    </Label>
                                    <Input 
                                        placeholder="pandawa@gmail.com" 
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <Label>
                                        Password <span className="text-error-500">*</span>{" "}
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <span
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                                        >
                                            {showPassword ? (
                                                <Image src="/icons/eye.svg" width={20} height={20} alt="Eye" className="fill-gray-500 dark:fill-gray-400" />
                                            ) : (
                                                <Image src="/icons/eye-close.svg" width={20} height={20} alt="Eye Close" className="fill-gray-500 dark:fill-gray-400" />
                                            )}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <Checkbox 
                                            checked={isChecked} 
                                            onChange={setIsChecked} 
                                        />
                                        <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                                            Keep me logged in
                                        </span>
                                    </div>
                                    <Link
                                        href="/reset-password"
                                        className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <div>
                                    <Button 
                                        className="w-full" 
                                        size="sm"
                                        type="submit"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Logging in...' : 'Log in'}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import React, { useState } from "react"; // 1. Import useState
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    // 2. Create state variables for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // 3. Create the function to handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // This stops the page from reloading
        console.log({ email, password });
    };

    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="w-full max-w-sm rounded-md border border-neutral-700 p-8">
                <h1 className="mb-6 text-center text-2xl font-bold text-white">
                    Log In to FinTrack
                </h1>
                {/* 4. Connect the handler and state to the form */}
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button type="submit" className="mt-6">
                        Log In
                    </Button>
                </form>
                <Link href="/">
                    <Button type="button">
                        Home
                    </Button>
                </Link>
            </div>
        </div>
    );
}
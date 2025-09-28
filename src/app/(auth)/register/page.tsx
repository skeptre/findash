"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Link from "next/link";
import React, { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // 1. Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // 2. Call Supabase signUp method
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                // You can pass additional data to be stored in the user's metadata
                data: {
                    full_name: name,
                },
            },
        });

        if (error) {
            console.error("Error signing up:", error.message);
            alert(error.message); // Show error to the user
        } else {
            console.log("Signed up successfully!", data);
            alert("Registration successful! Please check your email to confirm your account.");
            router.push("/");
            // We can redirect the user later
        }
    };

    return (
        <div className="flex h-screen w-full items-center justify-center">
            <div className="w-full max-w-sm rounded-md border border-neutral-700 p-8">
                <h1 className="mb-6 text-center text-2xl font-bold text-white">
                    Create an Account
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <Input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <Input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="mt-6">
                        Register
                    </Button>
                </form>
                <p className="mt-4 text-center text-sm text-neutral-400">
                    Already have an account?{" "}
                    <Link href="/login" className="font-semibold text-white hover:underline">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    );
}
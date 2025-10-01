"use client";

import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
// 1. The form is imported here
import { CreateTransactionForm } from '@/components/CreateTransactionForm';
import { TransactionList } from '@/components/TransactionList';

export default function HomePage() {
    const { user } = useAuth();
    const supabase = createClient();
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
            <header className="flex items-center justify-between pb-6 border-b border-neutral-700">
                <div>
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p className="text-neutral-400">Welcome, {user?.email}</p>
                </div>
                <Button onClick={handleLogout} className="w-auto">Log Out</Button>
            </header>

            <main className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* 2. And the form is used here */}
                <CreateTransactionForm />
                <TransactionList />
            </main>
        </div>
    );
}
"use client";

import { useEffect, useState } from 'react'; // 1. Import hooks
import { Button } from '@/components/ui/Button';
import { createClient } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import { CreateTransactionForm } from '@/components/CreateTransactionForm';
import { TransactionList } from '@/components/TransactionList';
import { Transaction } from '@/types'; // 2. Import the Transaction type

export default function DashboardPage() {
    const { user } = useAuth();
    const router = useRouter();

    // 3. Add state to hold the transactions
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    // 4. Add useEffect to fetch the data
    useEffect(() => {
        const supabase = createClient();
        const fetchTransactions = async () => {
            const { data, error } = await supabase
                .from("transactions")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching transactions:", error);
            } else if (data) {
                setTransactions(data);
            }
        };

        fetchTransactions();
    }, []); // Empty array means this runs once on page load

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/login');
    };

    // 5. Log the data to the console to confirm it's working
    console.log(transactions);

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
                <CreateTransactionForm />
                {/* We'll pass the data to this component in the next step */}
                <TransactionList transactions={[]} />
            </main>
        </div>
    );
}
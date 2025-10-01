"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import { Transaction } from "@/types";

export const TransactionList = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();


    useEffect(() => {
        // 1. This function fetches the initial data when the component loads
        const fetchTransactions = async () => {
            const { data, error } = await supabase
                .from("transactions")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching transactions:", error);
            } else {
                setTransactions(data);
            }
            setLoading(false);
        };

        fetchTransactions();

        // 2. This sets up the real-time subscription to listen for new transactions
        const channel = supabase
            .channel('realtime transactions')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'transactions' },
                (payload) => {
                    setTransactions((currentTransactions) => [
                        payload.new as Transaction,
                        ...currentTransactions,
                    ]);
                }
            )
            .subscribe();

        // 3. This cleans up the subscription when the component is removed
        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase]);

    if (loading) {
        return <p className="text-neutral-400">Loading transactions...</p>;
    }

    return (
        <div className="space-y-4 rounded-md border border-neutral-700 p-6">
            <h2 className="text-xl font-semibold">Your Transactions</h2>
            {transactions.length === 0 ? (
                <p className="text-neutral-400">You have no transactions yet.</p>
            ) : (
                <ul className="space-y-3">
                    {transactions.map((transaction) => (
                        <li key={transaction.id} className="flex justify-between items-center bg-neutral-800 p-3 rounded-md">
                            <div>
                                <p className="font-semibold">{transaction.name}</p>
                                <p className="text-sm text-neutral-400">{transaction.category}</p>
                            </div>
                            <p className="font-semibold">£{transaction.amount.toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
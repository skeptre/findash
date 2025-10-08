"use client";
import { Transaction } from "@/types";

// The component now just accepts a 'transactions' prop of type Transaction[]
export const TransactionList = ({ transactions }: { transactions: Transaction[] }) => {
    // All the useState, useEffect, and Supabase logic has been removed.

    return (
        <div className="space-y-4 rounded-md border border-neutral-700 p-6">
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
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
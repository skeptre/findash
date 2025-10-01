"use client";

import {useState} from "react";
import {Button} from "@/components/ui/Button";
import {Input} from "@/components/ui/Input";
import {createClient} from "@/lib/supabase";

export const CreateTransactionForm = () => {
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const {error} = await supabase.from("transactions").insert({
            name: name,
            amount: parseFloat(amount),
            category: category,
        });
        if (error) {
            alert(error);
        } else {
            setName("");
            setAmount("");
            setCategory("");
        }
    };
    return (
        <form onSubmit={handleSubmit} className="space-y-4 rounded0-md border border-neutral-700 p-6">
            <h2 className="text-xl font-semibold">Add New Transaction</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <Input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="0.01"
                required
            />
            <Input
                type="text"
                placeholder="Category (e.g., Food)"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
            />
            <Button type="submit">Add Transaction</Button>
        </form>
    )
};



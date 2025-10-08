"use client";

import { useState } from "react";
import Papa from "papaparse";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase";

// 1. Define a type for a row from your bank's CSV file.
// IMPORTANT: The property names (Description, Amount, Date) must EXACTLY match
// the column headers in your CSV file.
type BankTransactionRow = {
    Description: string;
    Amount: string;
    Date: string;
    Category?: string; // The question mark makes this property optional
};

export default function ImportPage() {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState("");
    const supabase = createClient();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleImport = () => {
        if (!file) {
            setMessage("Please select a file first.");
            return;
        }

        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: async (results) => {
                setMessage("Parsing complete. Importing transactions...");

                // 2. Use the new type here instead of 'any'
                const mappedData = (results.data as BankTransactionRow[]).map((row) => ({
                    name: row.Description,
                    amount: parseFloat(row.Amount),
                    category: row.Category || "Uncategorized",
                    created_at: new Date(row.Date),
                }));

                const { error } = await supabase.from("transactions").insert(mappedData);

                if (error) {
                    setMessage("Error importing data: " + error.message);
                } else {
                    setMessage(`Successfully imported ${mappedData.length} transactions!`);
                }
            },
        });
    };

    return (
        <div className="mx-auto max-w-2xl p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl font-bold">Import Transactions</h1>
            <p className="mt-2 text-neutral-400">Upload a CSV file from your bank to import your transaction history.</p>

            <div className="mt-6 space-y-4">
                <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-neutral-800 file:text-white hover:file:bg-neutral-700"
                />
                <Button onClick={handleImport} className="w-full">Import</Button>
            </div>

            {message && <p className="mt-4 text-center">{message}</p>}
        </div>
    );
}
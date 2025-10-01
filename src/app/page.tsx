import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import {CreateTransactionForm} from "@/components/CreateTransactionForm";

export default function HomePage() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center space-y-8">
            <h1 className="text-6xl font-bold ">FinTrack</h1>
            <div>
                <Link href="/login">
                    <Button>Login</Button>
                </Link>
                <Link href="/register">
                    <Button>Register</Button>
                </Link>
            </div>

        </div>
    );
}
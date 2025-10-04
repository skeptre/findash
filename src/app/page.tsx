// landing page, public as well, for non-authenticated users

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function LandingPage() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center text-center">
            <div className="max-w-xl space-y-6">
                <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                    Take Control of Your Finances
                </h1>
                <p className="text-lg text-neutral-400">
                    FinTrack is the simplest way to manage your personal transactions and see where your money is going.
                </p>
                <div className="flex justify-center space-x-4">
                    <Link href="/login">
                        <Button className="w-32 bg-transparent border border-white hover:bg-white hover:text-black">Log In</Button>
                    </Link>
                    <Link href="/register">
                        <Button className="w-32 bg-transparent border border-white hover:bg-white hover:text-black">Register</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
// app/components/Navbar.jsx
"use client";

import Link from 'next/link';
import AuthStatus from '../AuthStatus';
import { useSession } from 'next-auth/react';


export default function Navbar() {
    const { status } = useSession();
    return (
        <nav className="fixed top-0 left-0 right-0 z-10 bg-white bg-opacity-95 backdrop-blur-sm shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-xl font-extrabold text-gray-900 tracking-tight transition duration-150 hover:text-indigo-600">
                            Next Google Auth
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">

                        <Link
                            href="/"
                            className="text-gray-500 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
                        >
                            Home
                        </Link>
                        {status === "authenticated" &&
                            <Link
                                href="/dashboard"
                                className="text-gray-500 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-150"
                            >
                                Dashboard
                            </Link>
                        }
                        <AuthStatus isNavbar={true} />
                    </div>
                </div>
            </div>
        </nav>
    );
}

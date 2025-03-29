'use client'
import React from 'react'
import { SignedOut, UserButton } from "@clerk/nextjs";
import { SignedIn, SignInButton } from "@clerk/clerk-react";
import Link from 'next/link';

export const Navbar = () => {
  return (
    // <div/ >
          <header className="py-6 px-4 sm:px-6 lg:px-8 bg-white border-b">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">

            <span className="ml-2 text-2xl font-bold text-primary">Visa Route</span>
          </div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <Link href="#features" className="text-gray-600 hover:text-primary">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="text-gray-600 hover:text-primary">
                  How It Works
                </Link>
              </li>
             <li>
             <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
             </li>
            </ul>
          </nav>
        </div>
      </header>

  )
}


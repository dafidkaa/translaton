"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  onGetStarted?: () => void;
}

export function Header({ onGetStarted }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleGetStarted = () => {
    if (onGetStarted) {
      onGetStarted();
    } else {
      // Navigate to home page and trigger translator
      window.location.href = '/#translator';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-3">
            <img src="/logo.png" alt="Translaton" className="w-8 h-8" />
            <h1 className="text-xl font-semibold text-gray-900">Translaton</h1>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/web-development" className="text-gray-600 hover:text-gray-900 transition-colors">
              Web Development
            </Link>
            <Link href="/mobile-apps" className="text-gray-600 hover:text-gray-900 transition-colors">
              Mobile Apps
            </Link>

            <Link href="/json-translation" className="text-gray-600 hover:text-gray-900 transition-colors">
              JSON
            </Link>
            <Link href="/csv-translation" className="text-gray-600 hover:text-gray-900 transition-colors">
              CSV
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              onClick={handleGetStarted}
              className="bg-blue-600 hover:bg-blue-700 text-white hidden md:block"
            >
              Get Started
            </Button>
            
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-2 space-y-2">
              <Link href="/web-development" className="block py-2 text-gray-600 hover:text-gray-900">
                Web Development
              </Link>
              <Link href="/mobile-apps" className="block py-2 text-gray-600 hover:text-gray-900">
                Mobile Apps
              </Link>

              <Link href="/json-translation" className="block py-2 text-gray-600 hover:text-gray-900">
                JSON
              </Link>
              <Link href="/csv-translation" className="block py-2 text-gray-600 hover:text-gray-900">
                CSV
              </Link>
              <Button
                onClick={handleGetStarted}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

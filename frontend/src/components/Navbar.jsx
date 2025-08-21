import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { pageData } from './pageData';

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Brand */}
                    <div className="flex-shrink-0">
                        <Link
                            to="/home"
                            className="text-white text-2xl font-bold tracking-tight hover:text-gray-200 transition-colors duration-200"
                            onClick={closeMobileMenu}
                        >
                            BlogApp
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:block">
                        <ul className="ml-10 flex items-baseline space-x-4">
                            {pageData.map((page) => (
                                <li key={page.path}>
                                    <Link
                                        to={page.path}
                                        className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${location.pathname === page.path
                                            ? 'bg-slate-300 bg-opacity-20 text-white shadow-lg'
                                            : 'text-gray-400 hover:bg-slate-300 hover:bg-opacity-10 hover:text-white'
                                            }`}
                                    >
                                        {page.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* User Profile Section */}
                    <div className="hidden md:block">
                        <div className="ml-4 flex items-center md:ml-6">
                            <button className="bg-slate-400 bg-opacity-20 p-2 rounded-full text-white hover:bg-opacity-30 transition-all duration-200">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMobileMenu}
                            type="button"
                            className="bg-slate-400 bg-opacity-20 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-200"
                            aria-controls="mobile-menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
                id="mobile-menu"
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                    <ul>
                        {pageData.map((page) => (
                            <li key={page.path}>
                                <Link
                                    to={page.path}
                                    onClick={closeMobileMenu}
                                    className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${location.pathname === page.path
                                        ? 'bg-slate-400 bg-opacity-20 text-white'
                                        : 'text-gray-200 hover:bg-white hover:bg-opacity-10 hover:text-white'
                                        }`}
                                >
                                    {page.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="pt-4 pb-3 border-t border-white border-opacity-20">
                    <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                            <button className="bg-white bg-opacity-20 p-2 rounded-full text-white hover:bg-opacity-30 transition-all duration-200">
                                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </button>
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium text-white">User Name</div>
                            <div className="text-sm font-medium text-gray-300">user@example.com</div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

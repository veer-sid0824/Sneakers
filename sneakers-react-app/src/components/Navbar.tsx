import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../data/constants';
import ThemeToggle from './ThemeToggle';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import CartDrawer from './CartDrawer';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { totalCount, isCartOpen, setIsCartOpen } = useCart();
    const { wishlist } = useWishlist();

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleCart = () => setIsCartOpen(!isCartOpen);

    return (
        <>
            <nav className="bg-white dark:bg-slate-950 border-b border-gray-100/50 dark:border-slate-800/50 backdrop-blur-md sticky top-0 z-50 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-2xl font-black tracking-tighter text-indigo-600 dark:text-indigo-400">
                                SNEAKERS<span className="text-black dark:text-white">.</span>
                            </Link>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
                            {NAV_LINKS.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'text-gray-900 dark:text-white font-bold border-b-2 border-indigo-500 py-1 text-sm uppercase tracking-widest'
                                            : 'text-gray-500 dark:text-gray-400 font-bold hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors py-1 text-sm border-b-2 border-transparent uppercase tracking-widest'
                                    }
                                >
                                    {link.label}
                                </NavLink>
                            ))}

                            <div className="flex items-center gap-6 ml-4 pl-8 border-l border-gray-100 dark:border-gray-800">
                                <ThemeToggle />

                                <Link
                                    to="/wishlist"
                                    className="relative group p-2 focus:outline-none"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-slate-900 dark:text-white transition-transform group-hover:scale-110 group-hover:text-rose-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </svg>
                                    {wishlist.length > 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute top-0 right-0 h-4 w-4 bg-rose-500 text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white dark:border-slate-950"
                                        >
                                            {wishlist.length}
                                        </motion.span>
                                    )}
                                </Link>

                                <button
                                    onClick={toggleCart}
                                    className="relative group p-2 focus:outline-none"
                                >
                                    <svg className="w-6 h-6 text-slate-900 dark:text-white transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    {totalCount > 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute top-0 right-0 h-5 w-5 bg-indigo-600 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white dark:border-slate-950"
                                        >
                                            {totalCount}
                                        </motion.span>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="-mr-2 flex items-center gap-4 md:hidden">
                            <Link to="/wishlist" className="relative p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-slate-900 dark:text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                                {wishlist.length > 0 && (
                                    <span className="absolute top-0 right-0 h-4 w-4 bg-rose-500 text-white text-[8px] font-black flex items-center justify-center rounded-full">
                                        {wishlist.length}
                                    </span>
                                )}
                            </Link>
                            <button
                                onClick={toggleCart}
                                className="relative p-2"
                            >
                                <svg className="w-6 h-6 text-slate-900 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                {totalCount > 0 && (
                                    <span className="absolute top-0 right-0 h-4 w-4 bg-indigo-600 text-white text-[8px] font-black flex items-center justify-center rounded-full">
                                        {totalCount}
                                    </span>
                                )}
                            </button>
                            <ThemeToggle />
                            <button
                                onClick={toggleMenu}
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {/* Icon when menu is closed. */}
                                {!isOpen ? (
                                    <svg
                                        className="block h-8 w-8"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                ) : (
                                    /* Icon when menu is open. */
                                    <svg
                                        className="block h-8 w-8"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            key="mobile-menu"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden bg-white dark:bg-slate-950 border-b border-gray-100 dark:border-slate-800 overflow-hidden"
                            id="mobile-menu"
                        >
                            <div className="pt-2 pb-6 px-4 space-y-1 sm:px-3">
                                {NAV_LINKS.map((link) => (
                                    <NavLink
                                        key={link.path}
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className={({ isActive }) =>
                                            isActive
                                                ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-400 block px-3 py-3 rounded-md text-base font-bold'
                                                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white block px-3 py-3 rounded-md text-base font-medium transition'
                                        }
                                    >
                                        {link.label}
                                    </NavLink>
                                ))}
                                <NavLink
                                    to="/wishlist"
                                    onClick={() => setIsOpen(false)}
                                    className={({ isActive }) =>
                                        isActive
                                            ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 block px-3 py-3 rounded-md text-base font-bold'
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white block px-3 py-3 rounded-md text-base font-medium transition'
                                    }
                                >
                                    WISHLIST
                                </NavLink>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};

export default Navbar;



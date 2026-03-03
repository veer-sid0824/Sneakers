import { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../data/constants';
import ThemeToggle from './ThemeToggle';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';
import CartDrawer from './CartDrawer';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const { totalCount, isCartOpen, setIsCartOpen } = useCart();
    const { wishlist } = useWishlist();
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleCart = () => setIsCartOpen(!isCartOpen);

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };

        if (isUserMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isUserMenuOpen]);

    const handleLogout = () => {
        logout();
        setIsUserMenuOpen(false);
        navigate('/');
    };

    return (
        <>
            <nav className="bg-white dark:bg-slate-950 border-b border-gray-100/50 dark:border-slate-800/50 backdrop-blur-md sticky top-0 z-50 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="group relative text-3xl font-black tracking-tighter text-indigo-600 dark:text-indigo-400 transition-all duration-300">
                                <motion.span
                                    whileHover={{ scale: 1.05, rotate: -2 }}
                                    className="inline-block"
                                >
                                    SNEAKERS<span className="text-black dark:text-white group-hover:text-indigo-600 transition-colors">.</span>
                                </motion.span>
                                <motion.div
                                    className="absolute -bottom-1 left-0 w-0 h-1 bg-indigo-600 dark:bg-indigo-400 group-hover:w-full transition-all duration-300 rounded-full"
                                />
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
                                            ? 'relative text-slate-900 dark:text-white font-black py-1 text-[10px] uppercase tracking-[0.3em]'
                                            : 'relative text-slate-400 dark:text-slate-500 font-black hover:text-indigo-600 dark:hover:text-indigo-400 transition-all py-1 text-[10px] uppercase tracking-[0.3em] group'
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {link.label}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="nav-underline"
                                                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-full"
                                                />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            ))}

                            <div className="flex items-center gap-4 ml-6 pl-10 border-l border-slate-100 dark:border-slate-800">
                                <ThemeToggle />

                                <Link
                                    to="/wishlist"
                                    className="relative group p-2.5 bg-slate-50 dark:bg-slate-900 rounded-2xl hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all duration-300"
                                >
                                    <motion.svg
                                        whileHover={{ scale: 1.2, rotate: 12 }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={2.5}
                                        stroke="currentColor"
                                        className="w-5 h-5 text-slate-900 dark:text-white group-hover:text-rose-500 transition-colors"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                    </motion.svg>
                                    {wishlist.length > 0 && (
                                        <motion.span
                                            initial={{ scale: 0, y: 10 }}
                                            animate={{ scale: 1, y: 0 }}
                                            className="absolute -top-1 -right-1 h-5 w-5 bg-rose-500 text-white text-[9px] font-black flex items-center justify-center rounded-xl border-2 border-white dark:border-slate-950 shadow-lg shadow-rose-200 dark:shadow-none"
                                        >
                                            {wishlist.length}
                                        </motion.span>
                                    )}
                                </Link>

                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={toggleCart}
                                    className="relative group p-2.5 bg-slate-900 dark:bg-white rounded-2xl hover:bg-indigo-600 dark:hover:bg-indigo-500 text-white dark:text-slate-900 transition-all duration-300 shadow-xl shadow-indigo-100 dark:shadow-none"
                                >
                                    <motion.svg
                                        whileHover={{ y: -2 }}
                                        className="w-5 h-5 transition-colors"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2.5}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </motion.svg>
                                    {totalCount > 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="absolute -top-1 -right-1 h-5 w-5 bg-indigo-500 text-white text-[10px] font-black flex items-center justify-center rounded-xl border-2 border-white dark:border-slate-950"
                                        >
                                            {totalCount}
                                        </motion.span>
                                    )}
                                </motion.button>

                                {/* Auth Section */}
                                {isAuthenticated && user ? (
                                    <div className="relative" ref={userMenuRef}>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                            className="flex items-center gap-2 px-3 py-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                        >
                                            <img
                                                src={user.avatar}
                                                alt={user.fullName}
                                                className="w-8 h-8 rounded-full border-2 border-indigo-600 dark:border-indigo-400"
                                            />
                                            <div className="hidden lg:flex flex-col items-start">
                                                <span className="text-xs font-black text-slate-900 dark:text-white leading-tight">{user.fullName}</span>
                                                <span className="text-[10px] text-slate-500 dark:text-slate-400">{user.email}</span>
                                            </div>
                                        </motion.button>

                                        <AnimatePresence>
                                            {isUserMenuOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden z-50"
                                                >
                                                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                                                        <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Profile</p>
                                                    </div>
                                                    <div className="p-2">
                                                        <Link
                                                            to="#"
                                                            className="flex items-center gap-3 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-sm font-medium"
                                                        >
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                            </svg>
                                                            My Profile
                                                        </Link>
                                                        <Link
                                                            to="#"
                                                            className="flex items-center gap-3 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-sm font-medium"
                                                        >
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                                                            </svg>
                                                            Settings
                                                        </Link>
                                                    </div>
                                                    <div className="border-t border-slate-100 dark:border-slate-800 p-2">
                                                        <motion.button
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            onClick={handleLogout}
                                                            className="w-full flex items-center gap-3 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors text-sm font-medium"
                                                        >
                                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M17 7h-4v2h4c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2h-4v2h4c2.21 0 4-1.79 4-4V9c0-2.21-1.79-4-4-4zM8 9c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1-1 .45-1 1zm-5-1h4v2H3V8c0-1.1.9-2 2-2zm4 10H5c-1.1 0-2-.9-2-2v-6h2v6h4v-2h2v2c0 1.1-.9 2-2 2z" />
                                                            </svg>
                                                            Logout
                                                        </motion.button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => navigate('/login')}
                                            className="px-4 py-2 text-slate-900 dark:text-white font-black hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors text-sm uppercase tracking-widest"
                                        >
                                            Login
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => navigate('/signup')}
                                            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white font-black rounded-xl transition-all text-sm uppercase tracking-widest shadow-lg shadow-indigo-200 dark:shadow-none"
                                        >
                                            Sign Up
                                        </motion.button>
                                    </div>
                                )}
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
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="md:hidden bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-b border-slate-100 dark:border-slate-800 overflow-hidden"
                            id="mobile-menu"
                        >
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.1
                                        }
                                    }
                                }}
                                className="pt-4 pb-10 px-6 space-y-2"
                            >
                                {[...NAV_LINKS, { label: 'WISHLIST', path: '/wishlist' }].map((link) => (
                                    <motion.div
                                        key={link.path}
                                        variants={{
                                            hidden: { opacity: 0, x: -20 },
                                            visible: { opacity: 1, x: 0 }
                                        }}
                                    >
                                        <NavLink
                                            to={link.path}
                                            onClick={() => setIsOpen(false)}
                                            className={({ isActive }) =>
                                                `group flex items-center justify-between px-6 py-5 rounded-3xl text-lg font-black tracking-tighter transition-all duration-300 ${isActive
                                                    ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200 dark:shadow-none'
                                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-indigo-600'
                                                }`
                                            }
                                        >
                                            {link.label}
                                            <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </NavLink>
                                    </motion.div>
                                ))}

                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                    className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between"
                                >
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Theme Mode</p>
                                    <ThemeToggle />
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};

export default Navbar;



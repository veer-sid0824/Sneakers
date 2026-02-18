import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useWishlist } from '../contexts/WishlistContext';
import PageTransition from '../components/PageTransition';
import { useTitle } from '../hooks/useTitle';

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();
    useTitle('My Wishlist | SNEAKERS');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
    };

    return (
        <PageTransition>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <header className="mb-12">
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
                            MY <span className="text-indigo-600 dark:text-indigo-400">WISHLIST</span>
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">
                            {wishlist.length === 0
                                ? "You haven't saved any items yet."
                                : `You have ${wishlist.length} item${wishlist.length === 1 ? '' : 's'} saved to your wishlist.`}
                        </p>
                    </header>

                    {wishlist.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-slate-900 rounded-[2rem] p-12 text-center border border-slate-100 dark:border-slate-800"
                        >
                            <div className="w-24 h-24 bg-rose-50 dark:bg-rose-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-rose-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Your wishlist is empty</h2>
                            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
                                Save items you love to keep track of them and get notified when they drop or go on sale.
                            </p>
                            <Link
                                to="/"
                                className="inline-flex px-8 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition shadow-xl shadow-indigo-100 dark:shadow-none"
                            >
                                GO TO SHOP
                            </Link>
                        </motion.div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        >
                            <AnimatePresence mode="popLayout">
                                {wishlist.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        variants={itemVariants}
                                        layout
                                        exit="exit"
                                        className="group relative bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full"
                                    >
                                        {/* Remove Button */}
                                        <button
                                            onClick={() => removeFromWishlist(item.id, item.type)}
                                            className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-slate-800/80 rounded-full text-slate-400 hover:text-rose-500 transition-colors backdrop-blur-sm shadow-sm"
                                            title="Remove from wishlist"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                                                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                                            </svg>
                                        </button>

                                        {/* Image */}
                                        <div className="aspect-square bg-slate-50 dark:bg-slate-950 p-8 flex items-center justify-center overflow-hidden">
                                            <motion.img
                                                whileHover={{ scale: 1.1, rotate: -5 }}
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex justify-between items-start mb-2">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">{item.brand}</span>
                                                <span className="font-bold text-slate-900 dark:text-white tabular-nums">${item.price}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                                                {item.name}
                                            </h3>

                                            <Link
                                                to={item.type === 'sneaker'
                                                    ? `/sneakers/${item.id}`
                                                    : `/nba/${item.playerId}/${item.id}`
                                                }
                                                className="mt-auto w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm text-center hover:bg-indigo-600 dark:hover:bg-indigo-400 dark:hover:text-white transition-all shadow-lg active:scale-95"
                                            >
                                                VIEW PRODUCT
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </div>
        </PageTransition>
    );
};

export default Wishlist;

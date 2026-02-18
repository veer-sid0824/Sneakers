import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTitle } from '../hooks/useTitle';
import { SNEAKERS } from '../data';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

const SneakerDetail = () => {
    const { id } = useParams<{ id: string }>();
    const sneaker = SNEAKERS.find(s => s.id === id);
    const [selectedSize, setSelectedSize] = React.useState<number | null>(null);
    const [isAdding, setIsAdding] = React.useState(false);
    const [showSuccess, setShowSuccess] = React.useState(false);
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const isLiked = sneaker ? isInWishlist(sneaker.id, 'sneaker') : false;

    useTitle(sneaker ? sneaker.name : 'Sneaker Not Found');

    const handleAddToBag = () => {
        if (!selectedSize || !sneaker) return;

        setIsAdding(true);
        setTimeout(() => {
            addToCart({
                id: sneaker.id,
                name: sneaker.name,
                price: sneaker.price,
                image: sneaker.image,
                size: selectedSize,
                quantity: 1
            });
            setIsAdding(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 800);
    };

    const handleWishlist = () => {
        if (!sneaker) return;
        toggleWishlist({
            id: sneaker.id,
            name: sneaker.name,
            price: sneaker.price,
            image: sneaker.image,
            brand: sneaker.brand,
            isRare: sneaker.isRare,
            type: 'sneaker'
        });
    };

    if (!sneaker) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Sneaker Not Found</h2>
                <Link to="/sneakers" className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline">
                    &larr; Back to all sneakers
                </Link>
            </div>
        );
    }

    return (
        <div className="py-12 bg-white dark:bg-slate-950 min-h-screen transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/sneakers" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 inline-flex items-center gap-2 font-medium transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Back to Collection
                </Link>

                <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
                    {/* Image gallery */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col-reverse relative"
                    >
                        <div className="w-full aspect-w-1 aspect-h-1 bg-gray-100 dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-slate-800 transition-colors">
                            <img
                                src={sneaker.image}
                                alt={sneaker.name}
                                className="w-full h-full object-center object-contain p-8 hover:scale-110 transition-transform duration-500"
                            />
                        </div>

                        {/* Wishlist Button on Detail Page */}
                        <button
                            onClick={handleWishlist}
                            className={`absolute top-6 right-6 p-4 rounded-full backdrop-blur-md shadow-xl transition-all duration-500 z-10 ${isLiked
                                ? 'bg-rose-500 text-white shadow-rose-200'
                                : 'bg-white/90 dark:bg-slate-800/90 text-slate-400 hover:text-rose-500 hover:scale-110'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill={isLiked ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </button>
                    </motion.div>

                    {/* Product info */}
                    <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                        {sneaker.isRare && (
                            <motion.span
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 mb-4 transition-colors"
                            >
                                Rare Drop 🔥
                            </motion.span>
                        )}
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">{sneaker.name}</h1>
                        <p className="text-lg text-gray-500 mb-10">{sneaker.brand}</p>

                        <div className="mt-3">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-4xl text-gray-900 dark:text-white font-black tracking-tighter italic">${sneaker.price}</p>
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">Description</h3>
                            <div className="text-base text-gray-700 space-y-6">
                                <p className="font-medium text-slate-500 dark:text-slate-400 leading-relaxed">{sneaker.description}</p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest mb-4">Available Colors</h3>
                            <div className="flex items-center mt-2 space-x-3">
                                {sneaker.colors.map(color => (
                                    <div key={color} className="w-10 h-10 rounded-full border-2 border-slate-100 shadow-sm transition-transform hover:scale-110 cursor-alias" style={{ backgroundColor: color.toLowerCase() }} title={color}></div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-10">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest">Select Size</h3>
                                <button className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 underline">Size guide</button>
                            </div>

                            <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-4">
                                {sneaker.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`rounded-xl py-4 px-4 flex items-center justify-center text-sm font-black transition-all duration-300 border-2 ${selectedSize === size
                                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg scale-95'
                                            : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-indigo-200 dark:hover:border-indigo-500/50 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-12">
                            <button
                                onClick={handleAddToBag}
                                disabled={!selectedSize || isAdding}
                                className={`w-full rounded-2xl py-6 px-8 font-black text-lg tracking-wide transition-all duration-500 flex items-center justify-center gap-3 shadow-xl ${!selectedSize
                                    ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none'
                                    : showSuccess
                                        ? 'bg-emerald-500 text-white shadow-emerald-200'
                                        : 'bg-indigo-600 dark:bg-white text-white dark:text-slate-900 hover:bg-indigo-700 dark:hover:bg-indigo-100 transition-colors hover:shadow-indigo-200 active:scale-95 shadow-indigo-100 dark:shadow-none'
                                    }`}
                            >
                                {isAdding ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                        ADDING...
                                    </div>
                                ) : showSuccess ? (
                                    <div className="flex items-center gap-2 animate-bounce">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                        </svg>
                                        ADDED TO BAG
                                    </div>
                                ) : (
                                    <>
                                        ADD TO BAG
                                        {!selectedSize && <span className="text-[10px] font-bold opacity-60">(Select Size First)</span>}
                                    </>
                                )}
                            </button>

                            <AnimatePresence>
                                {showSuccess && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="text-center text-emerald-600 font-bold text-sm mt-4"
                                    >
                                        Perfect fit added to bag!
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SneakerDetail;

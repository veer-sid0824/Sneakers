import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTitle } from '../hooks/useTitle';
import { SNEAKERS } from '../data';
import { useCart } from '../contexts/CartContext';

const SneakerDetail = () => {
    const { id } = useParams<{ id: string }>();
    const sneaker = SNEAKERS.find(s => s.id === id);
    const [selectedSize, setSelectedSize] = React.useState<number | null>(null);
    const [isAdding, setIsAdding] = React.useState(false);
    const [showSuccess, setShowSuccess] = React.useState(false);
    const { addToCart } = useCart();

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

    if (!sneaker) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Sneaker Not Found</h2>
                <Link to="/sneakers" className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline">
                    &larr; Back to all sneakers
                </Link>
            </div>
        );
    }

    return (
        <div className="py-12 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/sneakers" className="text-gray-500 hover:text-gray-900 mb-8 inline-flex items-center gap-2 font-medium transition-colors">
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
                        className="flex flex-col-reverse"
                    >
                        <div className="w-full aspect-w-1 aspect-h-1 bg-gray-100 rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                            <img
                                src={sneaker.image}
                                alt={sneaker.name}
                                className="w-full h-full object-center object-contain p-8 hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                    </motion.div>

                    {/* Product info */}
                    <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                        {sneaker.isRare && (
                            <motion.span
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-yellow-100 text-yellow-800 mb-4"
                            >
                                Rare Drop 🔥
                            </motion.span>
                        )}
                        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2">{sneaker.name}</h1>
                        <p className="text-lg text-gray-500 mb-10">{sneaker.brand}</p>

                        <div className="mt-3">
                            <h2 className="sr-only">Product information</h2>
                            <p className="text-4xl text-gray-900 font-black tracking-tighter italic">${sneaker.price}</p>
                        </div>

                        <div className="mt-6">
                            <h3 className="sr-only">Description</h3>
                            <div className="text-base text-gray-700 space-y-6">
                                <p className="font-medium text-slate-500 leading-relaxed">{sneaker.description}</p>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Available Colors</h3>
                            <div className="flex items-center mt-2 space-x-3">
                                {sneaker.colors.map(color => (
                                    <div key={color} className="w-10 h-10 rounded-full border-2 border-slate-100 shadow-sm transition-transform hover:scale-110 cursor-alias" style={{ backgroundColor: color.toLowerCase() }} title={color}></div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-10">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Select Size</h3>
                                <button className="text-sm font-bold text-indigo-600 hover:text-indigo-500 underline">Size guide</button>
                            </div>

                            <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 lg:grid-cols-4">
                                {sneaker.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`rounded-xl py-4 px-4 flex items-center justify-center text-sm font-black transition-all duration-300 border-2 ${selectedSize === size
                                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg scale-95'
                                            : 'bg-white border-slate-100 text-slate-600 hover:border-indigo-200 hover:bg-indigo-50/50'
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
                                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                                    : showSuccess
                                        ? 'bg-emerald-500 text-white shadow-emerald-200'
                                        : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200 active:scale-95 shadow-indigo-100'
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

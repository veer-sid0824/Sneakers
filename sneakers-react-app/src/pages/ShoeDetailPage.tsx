import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PLAYERS, WNBA_PLAYERS } from '../data';
import PageTransition from '../components/PageTransition';
import { useTitle } from '../hooks/useTitle';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

const ShoeDetailPage: React.FC = () => {
    const { playerId, shoeId } = useParams<{ playerId: string; shoeId: string }>();
    const location = useLocation();
    const isWNBA = location.pathname.startsWith('/wnba');
    const [selectedSize, setSelectedSize] = React.useState<number | null>(null);
    const [isAdding, setIsAdding] = React.useState(false);
    const [showSuccess, setShowSuccess] = React.useState(false);
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const playerData = isWNBA ? WNBA_PLAYERS : PLAYERS;
    const player = playerData.find(p => String(p.id) === playerId);
    const shoe = player?.shoes.find(s => String(s.id) === shoeId);

    const isLiked = shoe ? isInWishlist(shoe.id, 'shoe') : false;
    const accentColor = isWNBA ? 'orange' : 'indigo';
    const routePrefix = isWNBA ? 'wnba' : 'nba';

    const sizes = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13];

    useTitle(shoe ? `${shoe.name} | ${player?.name}` : 'Shoe Not Found');

    const handleAddToBag = () => {
        if (!selectedSize || !shoe) return;

        setIsAdding(true);

        // Simulate API call for premium feel
        setTimeout(() => {
            addToCart({
                id: shoe.id,
                name: shoe.name,
                price: shoe.price,
                image: shoe.image,
                size: selectedSize,
                quantity: 1
            });

            setIsAdding(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 800);
    };

    const handleWishlist = () => {
        if (!shoe) return;
        toggleWishlist({
            id: shoe.id,
            name: shoe.name,
            price: shoe.price,
            image: shoe.image,
            brand: shoe.brand,
            type: 'shoe',
            playerId: playerId
        });
    };

    if (!player || !shoe) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
                <h1 className="text-3xl font-bold text-slate-800 mb-4">Shoe Not Found</h1>
                <Link to={isWNBA ? "/wnba" : "/players"} className={`text-${accentColor}-600 hover:text-${accentColor}-800 font-bold transition-colors`}>
                    &larr; Back to all players
                </Link>
            </div>
        );
    }

    return (
        <PageTransition>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 md:py-24 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    {/* Breadcrumbs / Back navigation */}
                    <div className="mb-12">
                        <Link
                            to={`/${routePrefix}/${player.id}`}
                            className={`inline-flex items-center text-sm font-bold text-slate-400 hover:text-${accentColor}-600 transition-colors group`}
                        >
                            <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                            </svg>
                            BACK TO {player.name.toUpperCase()} COLLECTION
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Image Showcase */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`relative aspect-square bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl shadow-${accentColor}-100 dark:shadow-none overflow-hidden group flex items-center justify-center p-12 transition-colors`}
                        >
                            <motion.img
                                initial={{ scale: 0.8, rotate: -15 }}
                                animate={{ scale: 1, rotate: -5 }}
                                transition={{ duration: 0.8, type: "spring" }}
                                whileHover={{ rotate: 0, scale: 1.05 }}
                                src={shoe.image}
                                alt={shoe.name}
                                className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal"
                            />
                            <div className="absolute top-10 left-10">
                                <span className="text-sm font-black bg-orange-600 text-white px-6 py-2 rounded-full shadow-lg" style={{ backgroundColor: isWNBA ? '#ea580c' : '#4f46e5' }}>
                                    {shoe.brand.toUpperCase()}
                                </span>
                            </div>

                            {/* Wishlist Button on Detail Page */}
                            <button
                                onClick={handleWishlist}
                                className={`absolute top-10 right-10 p-4 rounded-full backdrop-blur-md shadow-xl transition-all duration-500 ${isLiked
                                    ? 'bg-rose-500 text-white shadow-rose-200'
                                    : 'bg-white/90 dark:bg-slate-800/90 text-slate-400 hover:text-rose-500 hover:scale-110'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill={isLiked ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg>
                            </button>
                        </motion.div>

                        {/* Details */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="mb-8">
                                <p className={`text-${accentColor}-600 font-black uppercase tracking-[0.2em] text-xs mb-2`}>
                                    {shoe.modelNumber} Signature
                                </p>
                                <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-none mb-4">
                                    {shoe.name}
                                </h1>
                                <div className="flex items-center gap-4">
                                    <span className="text-4xl font-black text-slate-900 dark:text-white italic">
                                        ${shoe.price}
                                    </span>
                                    <span className="h-8 w-[2px] bg-slate-200 dark:bg-slate-800" />
                                    <span className="text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest text-sm">
                                        Available Now
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-8 h-[2px] bg-${accentColor}-600`} />
                                            SELECT SIZE (US)
                                        </div>
                                        <button className={`text-[10px] font-black underline text-slate-400 hover:text-${accentColor}-600 transition-colors`}>
                                            SIZE GUIDE
                                        </button>
                                    </h3>
                                    <div className="grid grid-cols-4 gap-3">
                                        {sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`py-4 rounded-xl font-black text-sm transition-all duration-300 border-2 ${selectedSize === size
                                                    ? `bg-${accentColor}-600 border-${accentColor}-600 text-white shadow-lg shadow-${accentColor}-100 scale-95`
                                                    : `bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-${accentColor}-200 dark:hover:border-${accentColor}-500/50 hover:bg-${accentColor}-50/30 dark:hover:bg-${accentColor}-900/20`
                                                    }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-8 space-y-4">
                                    <button
                                        onClick={handleAddToBag}
                                        disabled={!selectedSize || isAdding}
                                        className={`w-full rounded-2xl py-6 px-8 font-black text-lg tracking-wide transition-all duration-500 flex items-center justify-center gap-3 shadow-xl ${!selectedSize
                                            ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none'
                                            : showSuccess
                                                ? 'bg-emerald-500 text-white shadow-emerald-200'
                                                : `bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-${accentColor}-600 dark:hover:bg-${accentColor}-500 dark:hover:text-white hover:shadow-${accentColor}-200 dark:hover:shadow-${accentColor}-500/50 active:scale-95`
                                            }`}
                                    >
                                        {isAdding ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                                SECURING...
                                            </div>
                                        ) : showSuccess ? (
                                            <div className="flex items-center gap-group animate-bounce">
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                                </svg>
                                                ADDED TO BAG
                                            </div>
                                        ) : (
                                            <>
                                                SECURE THIS PAIR
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
                                                className="text-center text-emerald-600 font-bold text-sm"
                                            >
                                                Successfully added to your collection!
                                            </motion.p>
                                        )}
                                    </AnimatePresence>

                                    <p className="text-center text-slate-400 text-xs font-bold uppercase tracking-tighter">
                                        Free Express Shipping & Guaranteed Authenticity
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-8 border-t border-slate-100 dark:border-slate-800 pt-8">
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Colorway</p>
                                        <p className="font-bold text-slate-900 dark:text-white">{shoe.colorway}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Release Year</p>
                                        <p className="font-bold text-slate-900 dark:text-white">{shoe.releaseYear}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Signature Athlete</p>
                                        <p className="font-bold text-slate-900 dark:text-white">{player.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Technology</p>
                                        <p className="font-bold text-slate-900 dark:text-white">Elite Performance</p>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                                        <span className={`w-8 h-[2px] bg-${accentColor}-600`} />
                                        PRODUCT STORY
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">
                                        {shoe.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default ShoeDetailPage;

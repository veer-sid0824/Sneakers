import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import type { Shoe } from '../types';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

interface ShoeCardProps {
    shoe: Shoe;
    playerId: string | number;
}

const HeartIcon = ({ filled }: { filled: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);

const ShoeCard: React.FC<ShoeCardProps> = ({ shoe, playerId }) => {
    const location = useLocation();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isLiked = isInWishlist(shoe.id, 'shoe');

    const isWNBA = location.pathname.startsWith('/wnba');
    const routePrefix = isWNBA ? '/wnba' : '/nba';
    const accentColor = isWNBA ? 'orange' : 'indigo';

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
            id: shoe.id,
            name: shoe.name,
            price: shoe.price,
            image: shoe.image,
            size: 10,
            quantity: 1
        });
    };

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist({
            id: shoe.id,
            name: shoe.name,
            price: shoe.price,
            image: shoe.image,
            brand: shoe.brand,
            type: 'shoe',
            playerId
        });
    };

    return (
        <Link to={`${routePrefix}/${playerId}/${shoe.id}`} className="block h-full group">
            <motion.div
                whileHover={{
                    scale: 1.01,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.15)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col h-full transition-colors relative"
            >
                {/* Wishlist Button */}
                <button
                    onClick={handleWishlist}
                    className={`absolute top-6 left-6 z-20 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${isLiked
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-200 dark:shadow-none translate-x-0 opacity-100'
                        : 'bg-white/80 dark:bg-slate-800/80 text-gray-400 hover:text-rose-500 translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100'}`}
                >
                    <HeartIcon filled={isLiked} />
                </button>

                {/* Quick Add Button */}
                <button
                    onClick={handleAddToCart}
                    className={`absolute bottom-[100px] right-6 z-20 w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-900 dark:text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 active:scale-95 hover:bg-${accentColor}-600 hover:text-white dark:hover:bg-${accentColor}-500`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>

                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-slate-50 dark:bg-slate-950 p-6 transition-colors">
                    <img
                        src={shoe.image}
                        alt={shoe.name}
                        className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="text-[10px] font-black bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-3 py-1.5 rounded-full uppercase tracking-tighter transition-colors invisible group-hover:invisible">
                            {/* Brand label moved or hidden when hover buttons are active */}
                        </span>
                    </div>
                    <div className="absolute top-4 right-4 group-hover:opacity-0 transition-opacity">
                        <span className="text-lg font-black text-slate-900 dark:text-white tabular-nums transition-colors">
                            ${shoe.price}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                        <div className="flex justify-between items-start mb-1">
                            <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                                {shoe.modelNumber}
                            </p>
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 transition-colors">
                                {shoe.releaseYear}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {shoe.name}
                        </h3>
                    </div>

                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2 transition-colors">
                        {shoe.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 transition-colors">
                        <span>{shoe.colorway}</span>
                        <span className="text-indigo-500 group-hover:translate-x-1 transition-transform">
                            View Details &rarr;
                        </span>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default ShoeCard;


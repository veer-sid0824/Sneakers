import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
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

    // 3D Tilt Values
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [7, -7]);
    const rotateY = useTransform(x, [-100, 100], [-7, 7]);

    const handleMouseMove = (event: React.MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const centerPoint = { x: rect.width / 2, y: rect.height / 2 };
        x.set(event.clientX - rect.left - centerPoint.x);
        y.set(event.clientY - rect.top - centerPoint.y);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

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
        <Link to={`${routePrefix}/${playerId}/${shoe.id}`} className="block h-full group perspective-1000">
            <motion.div
                style={{ rotateX, rotateY }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 flex flex-col h-full transition-all duration-500 relative hover:shadow-2xl dark:hover:border-indigo-500/30 will-change-transform"
            >
                {/* Wishlist Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleWishlist}
                    className={`absolute top-6 left-6 z-20 p-3 rounded-2xl backdrop-blur-md transition-all duration-300 ${isLiked
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-200 dark:shadow-none translate-x-0 opacity-100'
                        : 'bg-white/90 dark:bg-slate-800/90 text-gray-400 hover:text-rose-500 translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 shadow-sm'}`}
                >
                    <HeartIcon filled={isLiked} />
                </motion.button>

                {/* Quick Add Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleAddToCart}
                    className={`absolute bottom-[110px] right-6 z-20 w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-900 dark:text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900`}
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </motion.button>

                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-slate-50 dark:bg-slate-950 p-10 transition-colors shadow-inner">
                    <motion.img
                        src={shoe.image}
                        alt={shoe.name}
                        loading="lazy"
                        whileHover={{ scale: 1.15, rotate: -5, y: -10 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal drop-shadow-2xl"
                    />
                    <div className="absolute top-4 right-6 group-hover:opacity-0 transition-opacity">
                        <span className="text-xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter italic">
                            ${shoe.price}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                    <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">
                                {shoe.modelNumber}
                            </p>
                            <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">
                                {shoe.releaseYear}
                            </span>
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors tracking-tighter lowercase">
                            {shoe.name}
                        </h3>
                    </div>

                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-8 line-clamp-2 transition-colors">
                        {shoe.description}
                    </p>

                    <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{shoe.colorway}</span>
                        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-black text-[10px] uppercase tracking-widest group-hover:gap-4 transition-all">
                            EXPLORE
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default ShoeCard;


import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Sneaker } from '../types';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

interface SneakerCardProps {
    sneaker: Sneaker;
}

const HeartIcon = ({ filled }: { filled: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
);

const SneakerCard = ({ sneaker }: SneakerCardProps) => {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isLiked = isInWishlist(sneaker.id, 'sneaker');

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
            id: sneaker.id,
            name: sneaker.name,
            price: sneaker.price,
            image: sneaker.image,
            size: 10, // Default size for Quick Add
            quantity: 1
        });
    };

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
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

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group relative bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-xl dark:hover:border-indigo-500/50 transition-all duration-300"
        >
            <div className="absolute top-4 left-4 z-10">
                <button
                    onClick={handleWishlist}
                    className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${isLiked
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-200 dark:shadow-none'
                        : 'bg-white/80 dark:bg-slate-800/80 text-gray-400 hover:text-rose-500'}`}
                >
                    <HeartIcon filled={isLiked} />
                </button>
            </div>

            {sneaker.isRare && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full z-10 shadow-sm">
                    RARE DROP
                </div>
            )}
            <div className="h-64 w-full bg-gray-50 dark:bg-slate-950 flex items-center justify-center p-6 rounded-t-2xl overflow-hidden relative transition-colors">
                <motion.img
                    whileHover={{ rotate: -15, scale: 1.1 }}
                    src={sneaker.image}
                    alt={sneaker.name}
                    className="w-full h-auto object-contain transition-transform duration-500 origin-center"
                />
            </div>
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{sneaker.brand}</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">${sneaker.price}</p>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">{sneaker.name}</h3>

                <div className="flex gap-2 mb-6">
                    {sneaker.colors.slice(0, 3).map(color => (
                        <div key={color} className="w-4 h-4 rounded-full border border-gray-300 dark:border-slate-700" title={color} style={{ backgroundColor: color.toLowerCase() }}></div>
                    ))}
                    {sneaker.colors.length > 3 && (
                        <span className="text-xs text-gray-400 font-medium self-center">+{sneaker.colors.length - 3}</span>
                    )}
                </div>

                <div className="grid grid-cols-5 gap-2">
                    <Link
                        to={`/sneakers/${sneaker.id}`}
                        className="col-span-4 text-center bg-gray-900 dark:bg-white text-white dark:text-slate-900 py-3 rounded-xl font-semibold hover:bg-black dark:hover:bg-gray-100 transition-all shadow-lg shadow-gray-200 dark:shadow-none"
                    >
                        View Details
                    </Link>
                    <button
                        onClick={handleAddToCart}
                        className="col-span-1 flex items-center justify-center bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none"
                        title="Quick Add to Bag"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default SneakerCard;

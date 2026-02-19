import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { Sneaker } from '../types';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import Button from './Button';

interface SneakerCardProps {
    sneaker: Sneaker;
}

const HeartIcon = ({ filled }: { filled: boolean }) => (
    <motion.svg
        animate={{ scale: filled ? [1, 1.2, 1] : 1 }}
        xmlns="http://www.w3.org/2000/svg"
        fill={filled ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </motion.svg>
);

const SneakerCard = ({ sneaker }: SneakerCardProps) => {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isLiked = isInWishlist(sneaker.id, 'sneaker');

    // 3D Tilt Values
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

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
            id: sneaker.id,
            name: sneaker.name,
            price: sneaker.price,
            image: sneaker.image,
            size: 10,
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
            style={{ rotateX, rotateY, perspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group relative bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2rem] shadow-sm hover:shadow-2xl dark:hover:border-indigo-500/50 transition-all duration-500 will-change-transform"
        >
            <div className="absolute top-6 left-6 z-20">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleWishlist}
                    className={`p-3 rounded-2xl backdrop-blur-md transition-all duration-300 ${isLiked
                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-200 dark:shadow-none'
                        : 'bg-white/90 dark:bg-slate-800/90 text-gray-400 hover:text-rose-500 shadow-sm'}`}
                >
                    <HeartIcon filled={isLiked} />
                </motion.button>
            </div>

            {sneaker.isRare && (
                <motion.div
                    initial={{ x: 10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="absolute top-6 right-6 bg-gradient-to-r from-yellow-400 to-amber-500 text-yellow-950 text-[10px] font-black px-4 py-2 rounded-full z-20 shadow-lg tracking-widest uppercase"
                >
                    RARE DROP
                </motion.div>
            )}

            <div className="h-72 w-full bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-10 rounded-t-[2rem] overflow-hidden relative transition-colors shadow-inner">
                <motion.img
                    whileHover={{ rotate: -10, scale: 1.15, y: -10 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    src={sneaker.image}
                    alt={sneaker.name}
                    loading="lazy"
                    className="w-full h-auto object-contain transition-transform duration-500 origin-center drop-shadow-2xl"
                />
            </div>

            <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                    <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em]">{sneaker.brand}</p>
                    <p className="text-xl font-black text-slate-900 dark:text-white italic">${sneaker.price}</p>
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1 lowercase tracking-tighter">
                    {sneaker.name}
                </h3>

                <div className="flex gap-2.5 mb-8">
                    {sneaker.colors.slice(0, 3).map(color => (
                        <motion.div
                            key={color}
                            whileHover={{ scale: 1.2 }}
                            className="w-5 h-5 rounded-full border-2 border-white dark:border-slate-800 shadow-sm"
                            title={color}
                            style={{ backgroundColor: color.toLowerCase() }}
                        />
                    ))}
                    {sneaker.colors.length > 3 && (
                        <span className="text-[10px] text-slate-400 font-black self-center tracking-widest">+{sneaker.colors.length - 3}</span>
                    )}
                </div>

                <div className="grid grid-cols-5 gap-3">
                    <Link to={`/sneakers/${sneaker.id}`} className="col-span-4">
                        <Button variant="secondary" className="w-full uppercase tracking-widest text-[10px]">
                            VIEW DETAILS
                        </Button>
                    </Link>
                    <Button
                        onClick={handleAddToCart}
                        variant="primary"
                        className="col-span-1"
                        title="Quick Add to Bag"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

export default SneakerCard;

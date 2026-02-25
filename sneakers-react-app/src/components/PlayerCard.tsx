import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Player } from '../types';
import { useWishlist } from '../contexts/WishlistContext';

interface PlayerCardProps {
    player: Player;
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

const PlayerCard = ({ player }: PlayerCardProps) => {
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isLiked = isInWishlist(String(player.id), 'player');

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist({
            id: String(player.id),
            name: player.name,
            price: 0,
            image: player.profileImage,
            position: player.position,
            team: player.team,
            type: 'player'
        });
    };

    return (
        <Link to={`/players/${player.id}`}>
            <motion.div
                whileHover={{ y: -12 }}
                className="group relative bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2rem] shadow-sm hover:shadow-2xl dark:hover:border-indigo-500/50 transition-all duration-500 overflow-hidden"
            >
                {/* Player Image */}
                <div className="relative w-full h-80 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
                    <motion.img
                        src={player.profileImage}
                        alt={player.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/400x500?text=' + encodeURIComponent(player.name);
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Wishlist Button */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleWishlist}
                    className={`absolute top-6 right-6 z-20 p-3 rounded-2xl backdrop-blur-md transition-all duration-300 ${
                        isLiked
                            ? 'bg-rose-500 text-white shadow-lg shadow-rose-200 dark:shadow-none'
                            : 'bg-white/90 dark:bg-slate-800/90 text-gray-400 hover:text-rose-500 shadow-sm'
                    }`}
                >
                    <HeartIcon filled={isLiked} />
                </motion.button>

                {/* Player Info */}
                <div className="p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 line-clamp-2">
                            {player.name}
                        </h3>
                        <p className="text-sm text-indigo-600 dark:text-indigo-400 font-semibold mb-2">
                            {player.position}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            {player.team}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                            {player.bio}
                        </p>
                    </motion.div>

                    {/* View Collection Button */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-6"
                    >
                        <button className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
                            View Collection
                        </button>
                    </motion.div>
                </div>
            </motion.div>
        </Link>
    );
};

export default PlayerCard;

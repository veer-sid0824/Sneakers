import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Player } from "../types";

interface PlayerCardProps {
    player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
        >
            <div className="h-48 overflow-hidden bg-gray-100">
                <img
                    src={player.profileImage}
                    alt={player.name}
                    className="w-full h-full object-cover object-center transform hover:scale-110 transition-transform duration-500"
                />
            </div>

            <div className="p-6">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {player.name}
                        </h3>
                        <p className="text-sm font-medium text-indigo-600 mb-2">
                            {player.team}
                        </p>
                    </div>

                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {player.position}
                    </span>
                </div>

                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {player.bio}
                </p>

                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs text-gray-400 font-semibold uppercase tracking-wide">
                        {player.achievements?.length ?? 0} Achievements
                    </span>

                    <Link
                        to={`/players/${player.id}`}
                        className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold flex items-center gap-1 group"
                    >
                        View Profile
                        <span className="group-hover:translate-x-1 transition-transform">
                            &rarr;
                        </span>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default PlayerCard;

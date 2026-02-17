import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Shoe } from '../types';

interface ShoeCardProps {
    shoe: Shoe;
    playerId: string | number;
}

const ShoeCard: React.FC<ShoeCardProps> = ({ shoe, playerId }) => {
    return (
        <Link to={`/nba/${playerId}/${shoe.id}`} className="block h-full">
            <motion.div
                whileHover={{
                    scale: 1.01,
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.15)"
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="group bg-white rounded-3xl overflow-hidden border border-slate-100 flex flex-col h-full h-full"
            >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-slate-50 p-6">
                    <img
                        src={shoe.image}
                        alt={shoe.name}
                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="text-[10px] font-black bg-slate-900 text-white px-3 py-1.5 rounded-full uppercase tracking-tighter">
                            {shoe.brand}
                        </span>
                    </div>
                    <div className="absolute top-4 right-4">
                        <span className="text-lg font-black text-slate-900 tabular-nums">
                            ${shoe.price}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                        <div className="flex justify-between items-start mb-1">
                            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
                                {shoe.modelNumber}
                            </p>
                            <span className="text-[10px] font-bold text-slate-400">
                                {shoe.releaseYear}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                            {shoe.name}
                        </h3>
                    </div>

                    <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                        {shoe.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-slate-50 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
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

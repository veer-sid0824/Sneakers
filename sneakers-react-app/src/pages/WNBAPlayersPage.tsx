import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { WNBA_PLAYERS } from '../data';
import PageTransition from '../components/PageTransition';
import { useTitle } from '../hooks/useTitle';
import { PlayerCardSkeleton } from '../components/Skeleton';

const WNBAPlayersPage: React.FC = () => {
    useTitle('WNBA Players');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate initial data fetch
        const timer = setTimeout(() => setIsLoading(false), 1200);
        return () => clearTimeout(timer);
    }, []);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 15 }
        }
    };

    return (
        <PageTransition>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 md:py-24 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16 md:mb-24">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-orange-50 dark:bg-orange-900/30 border border-orange-100 dark:border-orange-500/20"
                        >
                            <span className="text-xs font-black tracking-widest text-orange-600 dark:text-orange-400 uppercase">
                                Signature Collections
                            </span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tight"
                        >
                            Shop by <span className="text-orange-600 dark:text-orange-500">WNBA Player</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium"
                        >
                            Celebrate the legends of women's basketball. Explore signature shoes designed for the game's elite.
                        </motion.p>
                    </div>

                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div
                                key="skeleton-grid"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
                            >
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <PlayerCardSkeleton key={n} />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="players-grid"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
                            >
                                {WNBA_PLAYERS.map((player) => (
                                    <motion.div
                                        key={player.id}
                                        variants={itemVariants}
                                        whileHover={{ y: -12 }}
                                        className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-orange-100/50 dark:shadow-none border border-slate-100 dark:border-slate-800 group transition-all duration-500 hover:shadow-orange-200/50 dark:hover:border-orange-500/30"
                                    >
                                        {/* Profile Image Container */}
                                        <div className="relative h-96 overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                                            <img
                                                src={player.profileImage}
                                                alt={player.name}
                                                className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-1000 ease-out"
                                            />
                                            <div className="absolute top-6 right-6 z-20">
                                                <span className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-900 dark:text-white text-[10px] font-black px-5 py-2.5 rounded-full shadow-xl border border-white/20 dark:border-slate-700/50 uppercase tracking-widest">
                                                    {player.position}
                                                </span>
                                            </div>
                                            <div className="absolute bottom-6 left-8 z-20 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                                <p className="text-orange-400 font-black uppercase tracking-[0.2em] text-[10px] mb-1">
                                                    {player.team}
                                                </p>
                                                <h2 className="text-3xl font-black text-white tracking-tighter">
                                                    {player.name.split(' ')[0]} <br />
                                                    <span className="text-orange-200">{player.name.split(' ').slice(1).join(' ')}</span>
                                                </h2>
                                            </div>
                                        </div>

                                        {/* Content Area */}
                                        <div className="p-8 pb-10">
                                            <div className="flex items-center justify-between mb-8 pb-8 border-b border-slate-50 dark:border-slate-800">
                                                <div className="flex flex-col">
                                                    <span className="text-3xl font-black text-slate-900 dark:text-white tabular-nums leading-none mb-1">
                                                        {player.shoes.length}
                                                    </span>
                                                    <span className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                                        Masterpieces
                                                    </span>
                                                </div>
                                                <div className="h-10 w-[1px] bg-slate-100 dark:bg-slate-800" />
                                                <div className="flex flex-col text-right">
                                                    <span className="text-sm font-bold text-slate-600 dark:text-slate-400 italic">
                                                        Hall of Fame
                                                    </span>
                                                    <span className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-widest">
                                                        Status
                                                    </span>
                                                </div>
                                            </div>

                                            <Link
                                                to={`/wnba/${player.id}`}
                                                className="flex items-center justify-center w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-[1.25rem] py-5 px-6 font-black text-xs tracking-[0.2em] hover:bg-orange-600 dark:hover:bg-orange-500 dark:hover:text-white hover:shadow-2xl hover:shadow-orange-200 dark:hover:shadow-orange-500/20 transition-all duration-300 active:scale-95 group/btn outline-none focus:ring-4 focus:ring-orange-500/30"
                                            >
                                                ENTER COLLECTION
                                                <svg
                                                    className="ml-3 w-4 h-4 transform group-hover/btn:translate-x-1.5 transition-transform"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </PageTransition>
    );
};

export default WNBAPlayersPage;

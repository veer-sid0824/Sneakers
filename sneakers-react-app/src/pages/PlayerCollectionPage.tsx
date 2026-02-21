import React, { useState, useMemo } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { PLAYERS, WNBA_PLAYERS } from '../data';
import PageTransition from '../components/PageTransition';
import { useTitle } from '../hooks/useTitle';
import ShoeCard from '../components/ShoeCard';

const PlayerCollectionPage: React.FC = () => {
    const { playerId } = useParams<{ playerId: string }>();
    const location = useLocation();
    const isWNBA = location.pathname.startsWith('/wnba');
    const playerData = isWNBA ? WNBA_PLAYERS : PLAYERS;
    const player = playerData.find((p) => String(p.id) === playerId);

    const accentColor = isWNBA ? 'orange' : 'indigo';

    // Filtering & Sorting State
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'year-desc'>('default');
    const [filterYear, setFilterYear] = useState('All');
    const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

    useTitle(player ? `${player.name} Collection` : 'Collection Not Found');

    // Extract unique years from shoes for the filter
    const uniqueYears = useMemo(() => {
        if (!player) return [];
        const years = player.shoes.map(s => String(s.releaseYear));
        return ['All', ...new Set(years)].sort((a, b) => b.localeCompare(a));
    }, [player]);

    // Derived filtered and sorted collection
    const filteredAndSortedShoes = useMemo(() => {
        if (!player) return [];

        let result = [...player.shoes];

        // 1. Search
        if (searchQuery) {
            result = result.filter(shoe =>
                shoe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                shoe.modelNumber.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // 2. Year Filter
        if (filterYear !== 'All') {
            result = result.filter(shoe => String(shoe.releaseYear) === filterYear);
        }

        // 3. Featured Filter
        if (showFeaturedOnly) {
            result = result.filter(shoe => shoe.isFeatured);
        }

        // 4. Sorting
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'year-desc':
                result.sort((a, b) => b.releaseYear - a.releaseYear);
                break;
            default:
                break;
        }

        return result;
    }, [player, searchQuery, sortBy, filterYear, showFeaturedOnly]);

    // Grid animation variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                damping: 15
            }
        },
        exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } }
    };

    if (!player) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
                <h1 className="text-3xl font-bold text-slate-800 mb-4">Collection Not Found</h1>
                <Link to="/players" className="text-indigo-600 hover:text-indigo-800 font-bold transition-colors">
                    &larr; Back to all players
                </Link>
            </div>
        );
    }

    return (
        <PageTransition>
            <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-500">
                {/* Banner Section with Video Background */}
                <div className="relative h-[40vh] md:h-[60vh] overflow-hidden">
                    {/* Video Background */}
                    {player.bannerVideo ? (
                        <motion.video
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            autoPlay
                            muted
                            loop
                            playsInline
                            poster={player.bannerImage}
                            preload="metadata"
                            className="absolute top-0 left-0 w-full h-full object-cover"
                        >
                            <source src={player.bannerVideo} type="video/mp4" />
                            {/* Fallback image if video fails to load */}
                            <img 
                                src={player.bannerImage} 
                                alt={player.name}
                                className="w-full h-full object-cover"
                            />
                        </motion.video>
                    ) : (
                        <motion.img
                            initial={{ scale: 1.1, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            src={player.bannerImage}
                            alt={player.name}
                            className="w-full h-full object-cover"
                        />
                    )}

                    {/* Dark Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-black/50 z-5" />
                    
                    {/* Additional gradient overlay for smoother transition to content */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-white/20 dark:via-slate-950/20 to-transparent z-5" />

                    {/* Hero Text - Positioned above overlay */}
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-10 relative">
                        <div className="max-w-7xl mx-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                            >
                                <p className={`text-${accentColor}-600 font-black uppercase tracking-[0.3em] text-sm mb-2`}>
                                    Signature Series
                                </p>
                                <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none mb-6 drop-shadow-lg">
                                    {player.name.split(' ')[0]} <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-200">
                                        {player.name.split(' ').slice(1).join(' ')}
                                    </span>
                                </h1>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Bio Section */}
                <div className="max-w-7xl mx-auto px-8 py-12 md:py-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="md:col-span-2"
                        >
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                <span className={`w-12 h-[2px] bg-${accentColor}-600`} />
                                THE ATHLETE
                            </h2>
                            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                                {player.bio}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="bg-slate-50 dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800"
                        >
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Current Team</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">{player.team}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Position</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">{player.position}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Collection Size</p>
                                    <p className="text-lg font-bold text-slate-900 dark:text-white">{player.shoes.length} Masterpieces</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Controls Section */}
                <div className="max-w-7xl mx-auto px-8 pb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl shadow-slate-100 dark:shadow-none border border-slate-50 dark:border-slate-800 flex flex-col md:flex-row gap-6 items-center justify-between"
                    >
                        {/* Search */}
                        <div className="relative w-full md:w-96">
                            <input
                                type="text"
                                placeholder="Search collection..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={`w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-transparent rounded-2xl focus:ring-2 focus:ring-${accentColor}-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-bold text-slate-900 dark:text-white`}
                            />
                            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>

                        {/* Filters & Sort */}
                        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className={`bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-${accentColor}-500`}
                            >
                                <option value="default">Sort: Default</option>
                                <option value="price-asc">Price: Low to High</option>
                                <option value="price-desc">Price: High to Low</option>
                                <option value="year-desc">Newest First</option>
                            </select>

                            <select
                                value={filterYear}
                                onChange={(e) => setFilterYear(e.target.value)}
                                className={`bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-${accentColor}-500`}
                            >
                                {uniqueYears.map(year => (
                                    <option key={year} value={year}>{year === 'All' ? 'Release Year: All' : year}</option>
                                ))}
                            </select>

                            <button
                                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                                className={`flex items-center gap-2 px-6 py-4 rounded-2xl font-black transition-all ${showFeaturedOnly
                                    ? `bg-${accentColor}-600 text-white shadow-lg shadow-${accentColor}-100`
                                    : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700'
                                    }`}
                            >
                                <svg className="w-5 h-5" fill={showFeaturedOnly ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.54 1.118l-3.976-2.888a1 1 0 00-1.175 0l-3.976 2.888c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                                {showFeaturedOnly ? 'FEATURED ONLY' : 'ALL SHOES'}
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Collection Grid */}
                <div className="bg-slate-50 dark:bg-slate-950 py-24 transition-colors duration-500">
                    <div className="max-w-7xl mx-auto px-8">
                        <div className="mb-16 flex items-end justify-between">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-tighter">
                                    THE {player.name.split(' ').slice(-1)[0]} COLLECTION
                                </h2>
                                <p className="text-slate-500 font-medium tracking-wide">
                                    Showing {filteredAndSortedShoes.length} results
                                </p>
                            </motion.div>
                        </div>

                        {filteredAndSortedShoes.length > 0 ? (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                <AnimatePresence mode='popLayout'>
                                    {filteredAndSortedShoes.map((shoe) => (
                                        <motion.div
                                            layout
                                            key={shoe.id}
                                            variants={itemVariants}
                                        >
                                            <ShoeCard shoe={shoe} playerId={player.id} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-20 bg-white dark:bg-slate-900 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800"
                            >
                                <div className="max-w-xs mx-auto">
                                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No shoes found</h3>
                                    <p className="text-slate-500 mb-8">We couldn't find any sneakers matching your current filters.</p>
                                    <button
                                        onClick={() => {
                                            setSearchQuery('');
                                            setSortBy('default');
                                            setFilterYear('All');
                                            setShowFeaturedOnly(false);
                                        }}
                                        className="text-indigo-600 font-black tracking-widest text-xs border-b-2 border-indigo-600 pb-1"
                                    >
                                        RESET FILTERS
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default PlayerCollectionPage;

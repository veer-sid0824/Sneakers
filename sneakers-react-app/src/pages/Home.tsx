import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useTitle } from '../hooks/useTitle';
import PageTransition from '../components/PageTransition';
import Hero from '../components/Hero';

const Home = () => {
    useTitle('Home');

    const fadeInUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" as const }
        }
    };

    const staggerContainer: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    return (
        <PageTransition>
            <div className="dark:bg-slate-950 transition-colors duration-500">
                <Hero />

                <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={fadeInUp}
                        className="mb-16"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
                            CURATED COLLECTIONS
                        </h2>
                        <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full" />
                    </motion.div>

                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl"
                    >
                        <motion.div
                            variants={fadeInUp}
                            whileHover={{ y: -10 }}
                            className="group relative bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 cursor-pointer overflow-hidden transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white dark:from-slate-800 dark:to-slate-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <span className="inline-block p-3 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 mb-6 font-bold text-sm tracking-widest uppercase">Elite League</span>
                                <h3 className="text-3xl font-black mb-3 text-gray-900 dark:text-white">NBA Legends</h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">The shoes that touched the sky. Explore original silhouettes that changed the game forever.</p>
                                <Link to="/players" className="inline-flex items-center px-8 py-3 bg-indigo-600 dark:bg-indigo-500 text-white font-bold rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-600 transition shadow-lg shadow-indigo-200 dark:shadow-none">
                                    Browse NBA
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            whileHover={{ y: -10 }}
                            className="group relative bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 cursor-pointer overflow-hidden transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-white dark:from-slate-800 dark:to-slate-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <span className="inline-block p-3 rounded-2xl bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 mb-6 font-bold text-sm tracking-widest uppercase">Game Changers</span>
                                <h3 className="text-3xl font-black mb-3 text-gray-900 dark:text-white">WNBA Icons</h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">Breaking barriers and setting trends. Discover the footwear of the most powerful women in basketball.</p>
                                <Link to="/wnba" className="inline-flex items-center px-8 py-3 bg-orange-600 dark:bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-700 dark:hover:bg-orange-600 transition shadow-lg shadow-orange-200 dark:shadow-none">
                                    Browse WNBA
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            whileHover={{ y: -10 }}
                            className="group relative bg-white dark:bg-slate-900 p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 cursor-pointer overflow-hidden transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white dark:from-slate-800 dark:to-slate-900 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <span className="inline-block p-3 rounded-2xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mb-6 font-bold text-sm tracking-widest uppercase">The Vault</span>
                                <h3 className="text-3xl font-black mb-3 text-gray-900 dark:text-white">Shop All</h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">Your journey through sneaker history starts here. Browse our complete inventory of authentic kicks.</p>
                                <Link to="/sneakers" className="inline-flex items-center px-8 py-3 bg-purple-600 dark:bg-purple-500 text-white font-bold rounded-xl hover:bg-purple-700 dark:hover:bg-purple-600 transition shadow-lg shadow-purple-200 dark:shadow-none">
                                    Shop Now
                                </Link>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1, duration: 1 }}
                        className="mt-20 py-10 w-full border-t border-gray-100 dark:border-slate-800"
                    >
                        <Link to="/rare-drops" className="group text-sm font-bold text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all tracking-[0.2em] uppercase flex items-center justify-center gap-3">
                            <span className="w-10 h-[1px] bg-gray-300 group-hover:bg-indigo-600 dark:bg-slate-700 transition-all" />
                            Check Rare Drops
                            <span className="w-10 h-[1px] bg-gray-300 group-hover:bg-indigo-600 dark:bg-slate-700 transition-all" />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Home;


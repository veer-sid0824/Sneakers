import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTitle } from '../hooks/useTitle';
import PageTransition from '../components/PageTransition';

const Home = () => {
    useTitle('Home');

    return (
        <PageTransition>
            <div className="flex flex-col items-center justify-center py-12 text-center dark:bg-gray-900 transition-colors duration-300">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tighter">
                        STEP UP YOUR <span className="text-indigo-600 dark:text-indigo-400">GAME</span>
                    </h1>
                    <p className="text-xl text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
                        Discover the sneakers that defined generations and the players who made them legendary.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-4">
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="group relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 cursor-pointer overflow-hidden transition-colors"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h2 className="text-2xl font-bold mb-2 relative z-10 text-gray-900 dark:text-white">Browse Players</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 relative z-10">Explore the legends of the court.</p>
                        <Link to="/players" className="inline-block px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white font-medium rounded-full relative z-10 hover:bg-indigo-700 dark:hover:bg-indigo-600 transition">
                            View Players
                        </Link>
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="group relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 cursor-pointer overflow-hidden transition-colors"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white dark:from-gray-800 dark:to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h2 className="text-2xl font-bold mb-2 relative z-10 text-gray-900 dark:text-white">Shop Sneakers</h2>
                        <p className="text-gray-500 dark:text-gray-400 mb-6 relative z-10">Find your next favorite pair.</p>
                        <Link to="/sneakers" className="inline-block px-6 py-3 bg-purple-600 dark:bg-purple-500 text-white font-medium rounded-full relative z-10 hover:bg-purple-700 dark:hover:bg-purple-600 transition">
                            Shop Now
                        </Link>
                    </motion.div>
                </div>
                <div className="mt-12">
                    <Link to="/rare-drops" className="text-sm font-semibold text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition tracking-widest uppercase">
                        Check Rare Drops &rarr;
                    </Link>
                </div>
            </div>
        </PageTransition>
    );
};

export default Home;

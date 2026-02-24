import { motion } from 'framer-motion';
import { useTitle } from '../hooks/useTitle';
import PageTransition from '../components/PageTransition';
import { Link } from 'react-router-dom';

const NewArrivals = () => {
    useTitle('New Arrivals');

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" as const }
        }
    };

    const staggerContainer = {
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
            <div className="py-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="text-center mb-20"
                    >
                        <div className="inline-block px-6 py-2 mb-6 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                            <span className="text-xs font-black tracking-[0.2em] text-indigo-600 dark:text-indigo-400 uppercase">
                                Fresh Drops
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">
                            New Arrivals
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Discover the latest additions to our collection. Fresh kicks from your favorite brands arriving constantly.
                        </p>
                    </motion.div>

                    {/* Featured Content */}
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid md:grid-cols-2 gap-8 mb-20"
                    >
                        <motion.div
                            variants={fadeInUp}
                            className="bg-gradient-to-br from-indigo-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-3xl p-12 border border-slate-100 dark:border-slate-800"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-black text-xl">✨</span>
                                </div>
                                <h2 className="text-2xl font-black">Latest Releases</h2>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                Stay updated with the newest sneaker releases from Nike, Jordan Brand, Adidas, and more. Our new arrivals section is updated daily with the hottest kicks from around the world.
                            </p>
                            <Link
                                to="/sneakers"
                                className="inline-flex items-center px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white font-bold rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
                            >
                                Shop Now
                            </Link>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            className="bg-gradient-to-br from-purple-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-3xl p-12 border border-slate-100 dark:border-slate-800"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-black text-xl">🔥</span>
                                </div>
                                <h2 className="text-2xl font-black">Trending Now</h2>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                Check out what's trending this week. See what other sneaker enthusiasts are buying and find the most popular drops currently available in our inventory.
                            </p>
                            <Link
                                to="/rare-drops"
                                className="inline-flex items-center px-6 py-3 bg-purple-600 dark:bg-purple-500 text-white font-bold rounded-xl hover:bg-purple-700 dark:hover:bg-purple-600 transition"
                            >
                                View Drops
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Info Section */}
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-12 border border-slate-100 dark:border-slate-800 text-center"
                    >
                        <h2 className="text-3xl font-black mb-6">Sign Up for Notifications</h2>
                        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
                            Never miss a release. Get notified the moment new arrivals hit our store and be the first to grab your favorite kicks.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            />
                            <button className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition">
                                Subscribe
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    );
};

export default NewArrivals;

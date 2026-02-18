import { motion } from 'framer-motion';
import { useTitle } from '../hooks/useTitle';
import PageTransition from '../components/PageTransition';

const DROPS = [
    { id: '201', name: 'Off-White x Nike', date: '2023-11-20', status: 'Upcoming' },
    { id: '202', name: 'Travis Scott x Jordan', date: '2023-12-05', status: 'Raffle Open' },
];

const RareDrops = () => {
    useTitle('Rare Drops');

    return (
        <PageTransition>
            <div className="py-12 bg-white dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.h1
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, type: 'spring' }}
                        className="text-5xl md:text-7xl font-black text-center mb-16 tracking-tighter"
                    >
                        EXCLUSIVE DROPS
                    </motion.h1>
                    <div className="max-w-4xl mx-auto space-y-8">
                        {DROPS.map((drop, index) => (
                            <motion.div
                                key={drop.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl shadow-xl shadow-slate-100 dark:shadow-none hover:border-indigo-500 dark:hover:border-indigo-500/50 transition-all duration-300"
                            >
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-black mb-2 tracking-tight">{drop.name}</h2>
                                    <p className="text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest text-xs">Release Date: {drop.date}</p>
                                </div>
                                <div className="px-6 py-3 bg-indigo-600 text-white rounded-2xl text-xs font-black tracking-[0.2em] uppercase">
                                    {drop.status}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-20 text-center">
                        <p className="text-slate-400 dark:text-slate-500 text-sm font-bold uppercase tracking-widest">Join the waitlist for early access.</p>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default RareDrops;

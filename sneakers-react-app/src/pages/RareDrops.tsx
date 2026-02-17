import { motion } from 'framer-motion';
import { useTitle } from '../hooks/useTitle';

const DROPS = [
    { id: '201', name: 'Off-White x Nike', date: '2023-11-20', status: 'Upcoming' },
    { id: '202', name: 'Travis Scott x Jordan', date: '2023-12-05', status: 'Raffle Open' },
];

const RareDrops = () => {
    useTitle('Rare Drops');

    return (
        <div className="py-12 bg-black text-white min-h-screen -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            <motion.h1
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: 'spring' }}
                className="text-5xl font-black text-center mb-12"
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
                        className="flex items-center justify-between bg-zinc-900 border border-zinc-800 p-6 rounded-2xl hover:border-indigo-500 transition-colors duration-300"
                    >
                        <div>
                            <h2 className="text-2xl font-bold mb-1">{drop.name}</h2>
                            <p className="text-gray-400">Release Date: {drop.date}</p>
                        </div>
                        <div className="px-4 py-2 bg-indigo-600 rounded-lg text-sm font-semibold tracking-wider uppercase">
                            {drop.status}
                        </div>
                    </motion.div>
                ))}
            </div>
            <div className="mt-16 text-center">
                <p className="text-gray-500 text-sm">Join the waitlist for early access.</p>
            </div>
        </div>
    );
};

export default RareDrops;

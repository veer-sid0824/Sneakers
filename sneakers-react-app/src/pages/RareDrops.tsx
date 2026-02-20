import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTitle } from '../hooks/useTitle';
import PageTransition from '../components/PageTransition';
import Button from '../components/Button';

interface Countdown {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const DROPS = [
    {
        id: 'drop-1',
        name: 'Off-White x Nike',
        date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString(),
        status: 'UPCOMING',
        description: 'The final collaboration from the late Virgil Abloh.',
        image: '/assets/images/rare-drops/off-white-x-nike.png',
        price: '$190'
    },
    {
        id: 'drop-2',
        name: 'Travis Scott x Jordan',
        date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
        status: 'RAFFLE OPEN',
        description: 'The iconic Cactus Jack aesthetic on a classic silhouette.',
        image: '/assets/images/rare-drops/travis-scott-x-jordan.png',
        price: '$170'
    },
    {
        id: 'drop-3',
        name: 'Salehe Bembury x Crocs',
        date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(),
        status: 'WAITLIST',
        description: 'Organic textures meet unconventional footwear design.',
        image: '/assets/images/rare-drops/salehe-bembury-x-crocs.png',
        price: '$85'
    }
];

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
    const [timeLeft, setTimeLeft] = useState<Countdown>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(targetDate) - +new Date();
            let timeLeft: Countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };

            if (difference > 0) {
                timeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                };
            }
            return timeLeft;
        };

        const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
        setTimeLeft(calculateTimeLeft());
        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="flex gap-4">
            {Object.entries(timeLeft).map(([unit, value]) => (
                <motion.div
                    key={unit}
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: unit === 'seconds' ? 0 : Math.random() }}
                    className="flex flex-col items-center"
                >
                    <div className="bg-white dark:bg-slate-800 px-5 py-3 rounded-2xl min-w-[70px] flex items-center justify-center border border-slate-100 dark:border-slate-700 shadow-sm">
                        <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums tracking-tighter italic">
                            {value.toString().padStart(2, '0')}
                        </span>
                    </div>
                    <span className="text-[8px] font-black text-slate-400 mt-2 uppercase tracking-widest">{unit}</span>
                </motion.div>
            ))}
        </div>
    );
};

const RareDrops = () => {
    useTitle('Exclusive Drops');

    return (
        <PageTransition>
            <div className="py-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <header className="text-center mb-32">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="inline-block px-6 py-2 mb-8 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
                        >
                            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-indigo-600 dark:text-indigo-400">THE LAUNCHPAD</span>
                        </motion.div>
                        <motion.h1
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, type: "spring" }}
                            className="text-7xl md:text-9xl font-black mb-8 tracking-tighter"
                        >
                            UNRELEASED <span className="text-indigo-600 block md:inline italic">GRAILS</span>
                        </motion.h1>
                        <p className="max-w-2xl mx-auto text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed">
                            Securing the heat starts here. Explore the most anticipated releases and join the notification squad.
                        </p>
                    </header>

                    <div className="space-y-24">
                        {DROPS.map((drop, index) => (
                            <motion.div
                                key={drop.id}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className={`group relative overflow-hidden rounded-[4rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} shadow-xl dark:shadow-none hover:shadow-2xl transition-all duration-700`}
                            >
                                <div className="lg:w-[55%] overflow-hidden h-[400px] lg:h-[600px] relative">
                                    <motion.img
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 1.5 }}
                                        src={drop.image}
                                        alt={drop.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                </div>
                                <div className="lg:w-[45%] p-12 lg:p-20 flex flex-col justify-center bg-white dark:bg-slate-900/50 backdrop-blur-sm">
                                    <div className="flex items-center gap-6 mb-10">
                                        <motion.span
                                            whileHover={{ y: -2 }}
                                            className="px-6 py-2 rounded-xl bg-indigo-600 text-white text-[10px] font-black tracking-[0.2em] uppercase shadow-lg shadow-indigo-200 dark:shadow-none"
                                        >
                                            {drop.status}
                                        </motion.span>
                                        <span className="text-3xl font-black italic tabular-nums tracking-tighter text-slate-900 dark:text-white">{drop.price}</span>
                                    </div>
                                    <h2 className="text-5xl lg:text-6xl font-black mb-8 tracking-tighter group-hover:text-indigo-600 transition-colors uppercase leading-none">
                                        {drop.name}
                                    </h2>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium text-lg mb-12 leading-relaxed">
                                        {drop.description}
                                    </p>

                                    <div className="space-y-8 mb-12">
                                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em]">DROP COUNTDOWN</p>
                                        <CountdownTimer targetDate={drop.date} />
                                    </div>

                                    <div className="flex flex-wrap gap-4">
                                        <Button size="lg" variant="secondary" className="px-10 tracking-widest text-[10px] uppercase italic">
                                            REGISTER INTEREST
                                        </Button>
                                        <Button size="lg" variant="outline" className="px-10 tracking-widest text-[10px] uppercase italic">
                                            VIEW DETAILS
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        className="mt-40 text-center p-16 md:p-32 rounded-[5rem] bg-slate-900 dark:bg-white overflow-hidden relative group"
                    >
                        <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
                        <h3 className="text-5xl md:text-7xl font-black text-white dark:text-slate-900 mb-8 tracking-tighter italic">NEVER MISS A DROP</h3>
                        <p className="text-slate-400 dark:text-slate-500 mb-12 max-w-xl mx-auto font-medium text-lg leading-relaxed">Join the global elite notification squad. Get instant alerts before the silhouettes vanish.</p>
                        <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl mx-auto relative z-10">
                            <input
                                type="email"
                                placeholder="ENTER YOUR EMAIL"
                                className="flex-1 px-10 py-6 rounded-2xl bg-white/5 dark:bg-slate-100 border border-white/10 dark:border-slate-200 text-white dark:text-slate-900 placeholder:text-slate-500 font-black tracking-widest text-xs focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all"
                            />
                            <Button size="xl" variant="primary" className="px-12 uppercase tracking-widest italic">
                                SUBSCRIBE
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    );
};

export default RareDrops;

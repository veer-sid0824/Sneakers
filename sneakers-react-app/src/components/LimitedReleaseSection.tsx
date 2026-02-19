import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface Countdown {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface LimitedSneaker {
    id: string;
    name: string;
    brand: string;
    price: number;
    image: string;
    releaseDate: string; // ISO string
    badge: 'HOT' | 'NEW' | 'LIMITED';
    accentColor: string;
}

const LIMITED_DROPS: LimitedSneaker[] = [
    {
        id: 'drop-1',
        name: 'Jordan 1 Retro High OG "Chicago"',
        brand: 'Jordan',
        price: 180,
        image: 'https://placehold.co/600x400/000000/FFFFFF/png?text=Jordan+1+Chicago',
        releaseDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 60 * 5).toISOString(), // 2 days 5 hours from now
        badge: 'HOT',
        accentColor: '#ef4444'
    },
    {
        id: 'drop-2',
        name: 'Adidas Yeezy Boost 350 V2',
        brand: 'Adidas',
        price: 220,
        image: 'https://placehold.co/600x400/000000/FFFFFF/png?text=Yeezy+350',
        releaseDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5 + 1000 * 60 * 60 * 12).toISOString(), // 5 days 12 hours from now
        badge: 'LIMITED',
        accentColor: '#8b5cf6'
    },
    {
        id: 'drop-3',
        name: 'Nike Dunk Low "Panda"',
        brand: 'Nike',
        price: 110,
        image: 'https://placehold.co/600x400/000000/FFFFFF/png?text=Dunk+Low+Panda',
        releaseDate: new Date(Date.now() + 1000 * 60 * 60 * 8).toISOString(), // 8 hours from now
        badge: 'NEW',
        accentColor: '#10b981'
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

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        setTimeLeft(calculateTimeLeft());

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="flex gap-4">
            {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="flex flex-col items-center">
                    <div className="bg-slate-900/80 dark:bg-white/10 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 min-w-[50px] shadow-lg">
                        <span className="text-xl font-black text-white">{value.toString().padStart(2, '0')}</span>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest mt-2 text-slate-500 dark:text-slate-400">
                        {unit}
                    </span>
                </div>
            ))}
        </div>
    );
};

const LimitedReleaseSection = () => {
    return (
        <section className="py-24 px-4 bg-slate-50 dark:bg-slate-900/50 transition-colors border-y border-slate-100 dark:border-slate-800">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-block px-4 py-1.5 mb-4 rounded-full bg-rose-50 dark:bg-rose-900/30 border border-rose-100 dark:border-rose-500/20"
                        >
                            <span className="text-xs font-black tracking-[0.2em] text-rose-600 dark:text-rose-400 uppercase">
                                Breaking News
                            </span>
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter"
                        >
                            LIMITED <span className="text-rose-600 italic">RELEASES</span>
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <Link to="/rare-drops" className="group flex items-center gap-3 text-sm font-black text-slate-500 hover:text-rose-600 transition-colors tracking-widest">
                            VIEW CALENDAR
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </motion.div>
                </div>

                <div className="flex lg:grid lg:grid-cols-3 gap-8 overflow-x-auto pb-12 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-hide snap-x snap-mandatory">
                    {LIMITED_DROPS.map((drop, index) => (
                        <motion.div
                            key={drop.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-800 hover:border-rose-500/30 transition-all duration-500 w-[85vw] md:w-[45vw] lg:w-full flex-shrink-0 snap-center"
                        >
                            {/* Badges */}
                            <div className="absolute top-6 left-6 z-20 flex flex-col gap-2">
                                <span
                                    className="px-4 py-2 rounded-full text-[10px] font-black tracking-[0.2em] text-white shadow-lg shadow-black/10"
                                    style={{ backgroundColor: drop.accentColor }}
                                >
                                    {drop.badge}
                                </span>
                            </div>

                            {/* Image Container */}
                            <div className="relative aspect-[4/5] overflow-hidden">
                                <img
                                    src={drop.image}
                                    alt={drop.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                                {/* Countdown Overlay */}
                                <div className="absolute bottom-8 left-8 right-8 z-10">
                                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl">
                                        <p className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em] mb-4">Releasing In</p>
                                        <CountdownTimer targetDate={drop.releaseDate} />
                                    </div>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{drop.brand}</p>
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight group-hover:text-rose-600 transition-colors">
                                            {drop.name}
                                        </h3>
                                    </div>
                                    <span className="text-2xl font-black text-slate-900 dark:text-white italic">${drop.price}</span>
                                </div>
                                <button className="w-full py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black text-xs tracking-[0.2em] hover:bg-rose-600 dark:hover:bg-rose-500 dark:hover:text-white transition-all duration-300">
                                    NOTIFY ME
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LimitedReleaseSection;

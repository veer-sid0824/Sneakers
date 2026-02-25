import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import PageTransition from '../components/PageTransition';
import { useTitle } from '../hooks/useTitle';
import { PLAYERS, WNBA_PLAYERS, SNEAKERS } from '../data';
import Button from '../components/Button';

// Mock analytics data
const SALES_DATA = [
    { name: 'Mon', sales: 4000, views: 2400 },
    { name: 'Tue', sales: 3000, views: 1398 },
    { name: 'Wed', sales: 2000, views: 9800 },
    { name: 'Thu', sales: 2780, views: 3908 },
    { name: 'Fri', sales: 1890, views: 4800 },
    { name: 'Sat', sales: 2390, views: 3800 },
    { name: 'Sun', sales: 3490, views: 4300 },
];

const BRAND_DISTRIBUTION = [
    { name: 'Nike', value: 45 },
    { name: 'Jordan', value: 30 },
    { name: 'Adidas', value: 15 },
    { name: 'Puma', value: 10 },
];

const COLORS = ['#6366f1', '#f43f5e', '#f59e0b', '#10b981'];

const AdminDashboard: React.FC = () => {
    useTitle('Admin Dashboard');

    // Calculated Mock Metrics
    const metrics = useMemo(() => {
        return [
            { id: 1, label: 'Total Views', value: '1.2M', change: '+12.5%', color: 'indigo' },
            { id: 2, label: 'Add to Carts', value: '45.2K', change: '+8.2%', color: 'rose' },
            { id: 3, label: 'Wishlist Count', value: '128.5K', change: '+15.4%', color: 'amber' },
            { id: 4, label: 'Top Player', value: 'LeBron James', change: 'Trending Now', color: 'emerald' },
        ];
    }, []);

    // Prepare player popularity data
    const playerPopularity = useMemo(() => {
        const topNba = PLAYERS.slice(0, 4).map(p => ({
            name: p.name.split(' ').slice(-1)[0],
            engagement: Math.floor(Math.random() * 5000) + 3000,
            type: 'NBA'
        }));
        const topWnba = WNBA_PLAYERS.slice(0, 4).map(p => ({
            name: p.name.split(' ').slice(-1)[0],
            engagement: Math.floor(Math.random() * 4000) + 2000,
            type: 'WNBA'
        }));
        return [...topNba, ...topWnba].sort((a, b) => b.engagement - a.engagement);
    }, []);

    const topSneakers = useMemo(() => {
        return SNEAKERS.slice(0, 5).map(s => ({
            name: s.name,
            views: Math.floor(Math.random() * 10000) + 5000,
            carts: Math.floor(Math.random() * 2000) + 500
        }));
    }, []);

    return (
        <PageTransition>
            <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 md:py-20 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-6 sm:px-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <motion.h1
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter"
                            >
                                ANALYTICS <span className="text-indigo-600">DASHBOARD</span>
                            </motion.h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">Real-time performance metrics & engagement data.</p>
                        </div>
                        <div className="flex gap-4">
                            <Button variant="outline" className="px-6">EXPORT REPORT</Button>
                            <Button variant="primary" className="px-6">REFRESH DATA</Button>
                        </div>
                    </div>

                    {/* Quick Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {metrics.map((metric, idx) => (
                            <motion.div
                                key={metric.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100 dark:shadow-none"
                            >
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{metric.label}</p>
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter">{metric.value}</h3>
                                <div className="flex items-center gap-2">
                                    <span className={`text-[10px] font-black px-2 py-1 rounded-full bg-${metric.color}-500/10 text-${metric.color}-600 dark:text-${metric.color}-400`}>
                                        {metric.change}
                                    </span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight italic">vs last month</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        {/* Traffic Overview */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100 dark:shadow-none"
                        >
                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter uppercase">Traffic & Conversion Trend</h3>
                            <div className="h-[400px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={SALES_DATA}>
                                        <defs>
                                            <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '1rem', color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                                            itemStyle={{ color: '#fff' }}
                                        />
                                        <Area type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                        {/* Brand Distribution */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100 dark:shadow-none"
                        >
                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter uppercase">Brand Distribution</h3>
                            <div className="h-[400px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={BRAND_DISTRIBUTION}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={100}
                                            paddingAngle={8}
                                            dataKey="value"
                                        >
                                            {BRAND_DISTRIBUTION.map((_entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '1rem', color: '#fff' }}
                                        />
                                        <Legend verticalAlign="bottom" iconType="circle" />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Player Popularity */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-slate-900 dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-800 shadow-2xl"
                        >
                            <h3 className="text-xl font-black text-white mb-8 tracking-tighter uppercase">Player Engagement Score</h3>
                            <div className="h-[350px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={playerPopularity} layout="vertical">
                                        <XAxis type="number" hide />
                                        <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 800 }} width={100} />
                                        <Tooltip
                                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                            contentStyle={{ backgroundColor: '#000', border: 'none', borderRadius: '1rem', color: '#fff' }}
                                        />
                                        <Bar dataKey="engagement" fill="#6366f1" radius={[0, 10, 10, 0]} barSize={20} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                        {/* Top Products Table */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-100 dark:shadow-none overflow-hidden"
                        >
                            <h3 className="text-xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter uppercase">Top Product Performance</h3>
                            <div className="space-y-6">
                                {topSneakers.map((shoe, idx) => (
                                    <div key={idx} className="flex items-center justify-between group">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tighter group-hover:text-indigo-600 transition-colors">{shoe.name}</span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{shoe.views.toLocaleString()} VIEWS</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <span className="block text-sm font-black text-rose-500">{shoe.carts}</span>
                                                <span className="text-[9px] font-bold text-slate-400 uppercase">CARTS</span>
                                            </div>
                                            <div className="w-12 h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${(shoe.carts / 2500) * 100}%` }}
                                                    className="h-full bg-rose-500"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
};

export default AdminDashboard;

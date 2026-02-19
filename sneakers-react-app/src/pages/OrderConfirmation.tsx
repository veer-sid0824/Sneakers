import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import Button from '../components/Button';
import { Order } from '../types/order';

const OrderConfirmation = () => {
    const [order, setOrder] = useState<Order | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const lastOrder = localStorage.getItem('lastOrder');
        if (lastOrder) {
            setOrder(JSON.parse(lastOrder));
        } else {
            // Redirect if no order found
            navigate('/');
        }
    }, [navigate]);

    if (!order) return null;

    return (
        <PageTransition>
            <div className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-20 px-4 md:px-8">
                <div className="max-w-2xl mx-auto flex flex-col items-center text-center">

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', damping: 15 }}
                        className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-8 shadow-2xl shadow-emerald-500/20"
                    >
                        <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic mb-4">
                            Payment Confirmed
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 font-medium text-lg max-w-md mx-auto mb-10">
                            Success! Your order <span className="text-slate-900 dark:text-white font-bold italic tracking-tight">#{order.orderId}</span> has been secured and is being prepared for shipment.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="w-full bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-8 md:p-10 border border-slate-100 dark:border-slate-800 mb-10 text-left"
                    >
                        <div className="flex flex-col md:flex-row justify-between gap-8 pb-8 border-b border-slate-200 dark:border-slate-800">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Estimated Delivery</p>
                                <p className="text-xl font-black text-slate-900 dark:text-white tracking-tight italic">{order.estimatedDelivery}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Order Total</p>
                                <p className="text-xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight italic tabular-nums">${order.total.toLocaleString()}</p>
                            </div>
                        </div>

                        <div className="mt-8 space-y-4">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Items Summary</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {order.items.slice(0, 4).map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm flex-shrink-0 border border-slate-100 dark:border-slate-800">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] font-black text-slate-900 dark:text-white truncate">{item.name}</p>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Qty {item.quantity} • US {item.size}</p>
                                        </div>
                                    </div>
                                ))}
                                {order.items.length > 4 && (
                                    <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest pt-2">
                                        + {order.items.length - 4} more silhouettes
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 w-full justify-center"
                    >
                        <Link to={`/order-tracking/${order.orderId}`} className="flex-1 max-w-[240px]">
                            <Button variant="primary" size="xl" className="w-full tracking-widest uppercase py-5 rounded-2xl shadow-xl shadow-indigo-600/20">
                                Track Order
                            </Button>
                        </Link>
                        <Link to="/sneakers" className="flex-1 max-w-[240px]">
                            <Button variant="outline" size="xl" className="w-full tracking-widest uppercase py-5 rounded-2xl border-2 border-slate-200 dark:border-slate-800">
                                Home
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    );
};

export default OrderConfirmation;

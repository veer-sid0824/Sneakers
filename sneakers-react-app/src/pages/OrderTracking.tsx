import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import Button from '../components/Button';
import { Order, ORDER_STATUS_STEPS } from '../types/order';

const OrderTracking = () => {
    const { orderId } = useParams<{ orderId: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const orders = JSON.parse(localStorage.getItem('sneakers_orders') || '[]');
        const foundOrder = orders.find((o: Order) => o.orderId === orderId);

        if (foundOrder) {
            setOrder(foundOrder);
            // Find current status index
            const statusIndex = ORDER_STATUS_STEPS.findIndex(s => s.id === foundOrder.status);
            setCurrentStep(statusIndex >= 0 ? statusIndex : 0);
        }
    }, [orderId]);

    // Simulate status progression for demonstration
    useEffect(() => {
        if (order && currentStep < ORDER_STATUS_STEPS.length - 1) {
            const timer = setTimeout(() => {
                const nextStep = currentStep + 1;
                setCurrentStep(nextStep);

                // Update in local storage
                const orders = JSON.parse(localStorage.getItem('sneakers_orders') || '[]');
                const updatedOrders = orders.map((o: Order) =>
                    o.orderId === orderId ? { ...o, status: ORDER_STATUS_STEPS[nextStep].id } : o
                );
                localStorage.setItem('sneakers_orders', JSON.stringify(updatedOrders));

                // Also update last order if it matches
                const lastOrder = JSON.parse(localStorage.getItem('lastOrder') || '{}');
                if (lastOrder.orderId === orderId) {
                    localStorage.setItem('lastOrder', JSON.stringify({ ...lastOrder, status: ORDER_STATUS_STEPS[nextStep].id }));
                }
            }, 8000); // Progress every 8 seconds for demo purposes

            return () => clearTimeout(timer);
        }
    }, [order, currentStep, orderId]);

    if (!order) return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-slate-500 font-bold uppercase tracking-widest animate-pulse">Locating Order...</p>
        </div>
    );

    return (
        <PageTransition>
            <div className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-20 px-4 md:px-8">
                <div className="max-w-4xl mx-auto">

                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                        <div>
                            <Link to="/sneakers" className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] mb-4 flex items-center gap-2 hover:translate-x-[-4px] transition-transform w-fit">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                                Back to silhouettes
                            </Link>
                            <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">
                                Live Tracking
                            </h1>
                        </div>
                        <div className="text-left md:text-right">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status: {ORDER_STATUS_STEPS[currentStep].label}</p>
                            <p className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Order #{orderId}</p>
                        </div>
                    </div>

                    <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 relative overflow-hidden">
                        {/* Progress Stepper */}
                        <div className="relative mb-20">
                            {/* Track Background */}
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0 rounded-full" />

                            {/* Animated Track Progress */}
                            <motion.div
                                className="absolute top-1/2 left-0 h-1 bg-indigo-600 -translate-y-1/2 z-0 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${(currentStep / (ORDER_STATUS_STEPS.length - 1)) * 100}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                            />

                            <div className="relative z-10 flex justify-between">
                                {ORDER_STATUS_STEPS.map((step, idx) => {
                                    const isCompleted = idx <= currentStep;
                                    const isCurrent = idx === currentStep;

                                    return (
                                        <div key={step.id} className="flex flex-col items-center">
                                            <motion.div
                                                initial={false}
                                                animate={{
                                                    scale: isCurrent ? 1.2 : 1,
                                                    backgroundColor: isCompleted ? '#4f46e5' : '#e2e8f0',
                                                    borderColor: isCurrent ? '#4f46e5' : 'transparent'
                                                }}
                                                className={`w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center text-lg md:text-2xl shadow-xl transition-colors duration-500`}
                                            >
                                                {isCompleted && !isCurrent ? (
                                                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                ) : (
                                                    <span>{step.icon}</span>
                                                )}
                                                {isCurrent && (
                                                    <motion.div
                                                        layoutId="currentStepShadow"
                                                        className="absolute inset-0 rounded-full bg-indigo-600/20 animate-ping -z-10"
                                                    />
                                                )}
                                            </motion.div>
                                            <div className="absolute top-16 md:top-20 text-center w-24 md:w-32">
                                                <p className={`text-[10px] font-black uppercase tracking-widest ${isCompleted ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400'}`}>
                                                    {step.label}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 bg-white dark:bg-slate-950 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                            <div className="space-y-6">
                                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order Details</h3>
                                <div className="space-y-4">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex gap-4 group">
                                            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-900 rounded-2xl p-2 flex-shrink-0 border border-slate-100 dark:border-slate-800 shadow-inner overflow-hidden">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                            <div className="flex-1 py-1">
                                                <h4 className="font-black text-slate-900 dark:text-white text-sm lowercase leading-tight mb-1">{item.name}</h4>
                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                                    Size US {item.size} • Qty {item.quantity}
                                                </p>
                                                <p className="text-xs font-black text-indigo-600 dark:text-indigo-400 mt-2 italic tabular-nums">
                                                    ${(item.price * item.quantity).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Shipping Information</h3>
                                    <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                                        <p className="font-black text-slate-900 dark:text-white mb-2">{order.customerInfo.name}</p>
                                        <p className="text-xs text-slate-500 underline mb-4">{order.customerInfo.email}</p>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">{order.customerInfo.country}</p>
                                    </div>
                                </div>
                                <div className="p-6 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Estimated Delivery</p>
                                    <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-tighter italic uppercase">
                                        {order.estimatedDelivery}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col md:flex-row gap-6 items-center justify-between">
                        <div className="flex gap-4">
                            <Button variant="outline" className="px-8 uppercase tracking-widest text-[10px] font-black h-12 rounded-xl">
                                Contact Support
                            </Button>
                            <Button variant="outline" className="px-8 uppercase tracking-widest text-[10px] font-black h-12 rounded-xl">
                                Share Status
                            </Button>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic opacity-60">
                            The status is updated in real-time as your grails move closer to you.
                        </p>
                    </div>

                </div>
            </div>
        </PageTransition>
    );
};

export default OrderTracking;

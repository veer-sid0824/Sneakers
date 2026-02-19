import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Button from '../components/Button';
import PageTransition from '../components/PageTransition';

const COUNTRIES = [
    "United States", "United Kingdom", "Canada", "Germany", "France",
    "Italy", "Spain", "Australia", "Japan", "India"
];

const Payment = () => {
    const { totalAmount, cartItems, clearCart } = useCart();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState({
        email: '',
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvc: '',
        country: 'United States',
        saveInfo: false
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement;
        const checked = (e.target as HTMLInputElement).checked;

        let val = type === 'checkbox' ? checked : value;

        if (name === 'cardNumber') {
            val = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '').substring(0, 16);
            val = val.match(/.{1,4}/g)?.join(' ') || val;
        }
        if (name === 'expiry') {
            val = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '').substring(0, 4);
            if (val.length >= 2) val = val.substring(0, 2) + ' / ' + val.substring(2);
        }
        if (name === 'cvc') {
            val = value.replace(/[^0-9]/gi, '').substring(0, 4);
        }

        setFormData(prev => ({ ...prev, [name]: val }));
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Enter a valid email';
        if (!formData.cardName) newErrors.cardName = 'Required';
        if (formData.cardNumber.replace(/\s/g, '').length < 16) newErrors.cardNumber = 'Invalid card number';
        if (formData.expiry.length < 7) newErrors.expiry = 'Invalid expiry';
        if (formData.cvc.length < 3) newErrors.cvc = 'Invalid CVC';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        // Simulate processing
        await new Promise(resolve => setTimeout(resolve, 2500));

        setIsSuccess(true);
        await new Promise(resolve => setTimeout(resolve, 1500));

        const orderId = Math.random().toString(36).substring(2, 11).toUpperCase();
        const estDate = new Date();
        estDate.setDate(estDate.getDate() + 5);

        const orderDetails = {
            orderId,
            total: totalAmount,
            items: cartItems,
            date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            status: 'ordered',
            estimatedDelivery: estDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            customerInfo: {
                name: formData.cardName,
                email: formData.email,
                country: formData.country
            }
        };

        localStorage.setItem('lastOrder', JSON.stringify(orderDetails));
        // Also add to an orders list for tracking
        const allOrders = JSON.parse(localStorage.getItem('sneakers_orders') || '[]');
        allOrders.push(orderDetails);
        localStorage.setItem('sneakers_orders', JSON.stringify(allOrders));

        clearCart();
        setIsLoading(false);
        navigate('/order-confirmation');
    };

    return (
        <PageTransition>
            <div className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-20 px-4 md:px-8">
                <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-12 items-start justify-center">

                    {/* Left: Payment Form */}
                    <div className="flex-1 w-full max-w-xl mx-auto lg:mx-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-slate-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-slate-100 dark:border-slate-800 p-8 md:p-10"
                        >
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Payment Details</h2>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</label>
                                            <input
                                                type="email" name="email" value={formData.email} onChange={handleInputChange}
                                                className={`w-full bg-slate-50/50 dark:bg-slate-950/50 border ${errors.email ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'} rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-slate-400`}
                                                placeholder="alex@example.com"
                                            />
                                            {errors.email && <p className="text-rose-500 text-[10px] font-bold uppercase mt-1">{errors.email}</p>}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Card Information</label>
                                            <div className={`relative bg-slate-50/50 dark:bg-slate-950/50 border ${errors.cardNumber || errors.expiry || errors.cvc ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'} rounded-lg overflow-hidden`}>
                                                <input
                                                    type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange}
                                                    className="w-full bg-transparent px-4 py-4 text-slate-900 dark:text-white outline-none border-b border-slate-200/50 dark:border-slate-800/50 placeholder:text-slate-400 font-mono tracking-wider"
                                                    placeholder="4242 4242 4242 4242"
                                                />
                                                <div className="flex">
                                                    <input
                                                        type="text" name="expiry" value={formData.expiry} onChange={handleInputChange}
                                                        className="w-1/2 bg-transparent px-4 py-4 text-slate-900 dark:text-white outline-none border-r border-slate-200/50 dark:border-slate-800/50 placeholder:text-slate-400 font-mono"
                                                        placeholder="MM / YY"
                                                    />
                                                    <input
                                                        type="password" name="cvc" value={formData.cvc} onChange={handleInputChange}
                                                        className="w-1/2 bg-transparent px-4 py-4 text-slate-900 dark:text-white outline-none placeholder:text-slate-400 font-mono"
                                                        placeholder="CVC"
                                                    />
                                                </div>
                                            </div>
                                            {(errors.cardNumber || errors.expiry || errors.cvc) && (
                                                <p className="text-rose-500 text-[10px] font-bold uppercase mt-1">Check card details</p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Cardholder Name</label>
                                            <input
                                                type="text" name="cardName" value={formData.cardName} onChange={handleInputChange}
                                                className={`w-full bg-slate-50/50 dark:bg-slate-950/50 border ${errors.cardName ? 'border-rose-500' : 'border-slate-200 dark:border-slate-800'} rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all placeholder:text-slate-400`}
                                                placeholder="Alex Hunter"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Country or Region</label>
                                            <select
                                                name="country" value={formData.country} onChange={handleInputChange}
                                                className="w-full bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all appearance-none cursor-pointer"
                                            >
                                                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox" name="saveInfo" id="saveInfo" checked={formData.saveInfo} onChange={handleInputChange}
                                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 cursor-pointer"
                                    />
                                    <label htmlFor="saveInfo" className="text-sm text-slate-500 dark:text-slate-400 font-medium cursor-pointer">
                                        Save my info for secure 1-click checkout
                                    </label>
                                </div>

                                <Button
                                    variant="primary" size="xl" type="submit"
                                    className="w-full relative overflow-hidden group py-6 rounded-xl text-lg font-bold tracking-tight bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-slate-100"
                                    disabled={isLoading || isSuccess}
                                >
                                    <AnimatePresence mode="wait">
                                        {isLoading ? (
                                            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center gap-2">
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white dark:border-black/30 dark:border-t-black rounded-full animate-spin" />
                                                <span>Processing...</span>
                                            </motion.div>
                                        ) : isSuccess ? (
                                            <motion.div key="success" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center justify-center gap-2">
                                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                                <span>Payment Successful</span>
                                            </motion.div>
                                        ) : (
                                            <motion.span key="normal">Pay ${totalAmount.toLocaleString()}</motion.span>
                                        )}
                                    </AnimatePresence>
                                </Button>

                                <div className="flex items-center justify-center gap-2 text-slate-400 dark:text-slate-500">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Payments are secure and encrypted</span>
                                </div>
                            </form>
                        </motion.div>
                    </div>

                    {/* Right: Sticky Order Summary */}
                    <div className="w-full lg:w-80 space-y-8 sticky top-32">
                        <div className="space-y-6">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Order Summary</h3>
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={`${item.id}-${item.size}`} className="flex gap-4 group">
                                        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 rounded-xl p-2 flex-shrink-0 border border-slate-100 dark:border-slate-800 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                                        </div>
                                        <div className="flex-1 py-1">
                                            <h4 className="font-bold text-slate-900 dark:text-white text-xs mb-1 line-clamp-1 truncate">{item.name}</h4>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                Size {item.size} • Qty {item.quantity}
                                            </p>
                                        </div>
                                        <div className="py-1 text-right">
                                            <p className="text-xs font-bold text-slate-900 dark:text-white italic tabular-nums">
                                                ${(item.price * item.quantity).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
                            <div className="flex justify-between text-xs font-bold text-slate-400 uppercase">
                                <span>Subtotal</span>
                                <span className="text-slate-900 dark:text-white tabular-nums">${totalAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-xs font-bold text-slate-400 uppercase">
                                <span>Shipping</span>
                                <span className="text-emerald-500">Free</span>
                            </div>
                            <div className="flex justify-between items-end pt-4">
                                <span className="text-slate-900 dark:text-white font-black uppercase text-lg italic tracking-tighter">Total Due</span>
                                <span className="text-3xl font-black text-slate-900 dark:text-white italic tabular-nums tracking-tighter">
                                    ${totalAmount.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </PageTransition>
    );
};

export default Payment;

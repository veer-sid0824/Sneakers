import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import Button from './Button';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const XMarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

const MinusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3.5 h-3.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
    const { cartItems, removeFromCart, updateQuantity, totalAmount } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        onClose();
        navigate('/payment');
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { x: 50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { type: "spring" as const, stiffness: 300, damping: 25 }
        },
        exit: { x: -50, opacity: 0 }
    };

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-lg bg-white dark:bg-slate-900 shadow-2xl z-[101] flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
                            <div>
                                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">SHOPPING BAG</h2>
                                <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-black tracking-[0.3em] uppercase mt-1">
                                    {cartItems.length} {cartItems.length === 1 ? 'silhouettes' : 'silhouettes'} secured
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-12 h-12 flex items-center justify-center bg-slate-50 dark:bg-slate-800 hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 rounded-2xl transition-all duration-300"
                            >
                                <XMarkIcon />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center p-12">
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="w-32 h-32 bg-slate-50 dark:bg-slate-800 rounded-[2.5rem] flex items-center justify-center mb-10 shadow-inner"
                                    >
                                        <svg className="w-14 h-14 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                        </svg>
                                    </motion.div>
                                    <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">YOUR BAG IS EMPTY</h3>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium mb-10 leading-relaxed max-w-[280px]">
                                        Explore the collection and find your next pair of grails.
                                    </p>
                                    <Button onClick={onClose} variant="primary" className="uppercase tracking-widest text-xs px-10">
                                        START SHOPPING
                                    </Button>
                                </div>
                            ) : (
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="space-y-8"
                                >
                                    {cartItems.map((item) => (
                                        <motion.div
                                            layout
                                            variants={itemVariants}
                                            exit="exit"
                                            key={`${item.id}-${item.size}`}
                                            className="flex gap-6 group"
                                        >
                                            <div className="w-32 h-32 bg-slate-50 dark:bg-slate-800 rounded-[2rem] overflow-hidden flex-shrink-0 group-hover:shadow-xl transition-all duration-500 border border-transparent group-hover:border-indigo-500/20 shadow-inner p-4">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-full h-full object-contain group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-700 drop-shadow-lg"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0 py-2">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h4 className="text-xl font-black text-slate-900 dark:text-white truncate pr-2 tracking-tight lowercase">
                                                        {item.name}
                                                    </h4>
                                                    <button
                                                        onClick={() => removeFromCart(item.id, item.size)}
                                                        className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all"
                                                    >
                                                        <TrashIcon />
                                                    </button>
                                                </div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                                                    SIZE: <span className="text-indigo-600 dark:text-indigo-400">US {item.size}</span>
                                                </p>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1 shadow-inner border border-slate-200 dark:border-slate-700">
                                                        <motion.button
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                                            className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-700 rounded-lg shadow-sm text-slate-900 dark:text-white disabled:opacity-30"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <MinusIcon />
                                                        </motion.button>
                                                        <span className="w-10 text-center font-black text-sm text-slate-900 dark:text-white">
                                                            {item.quantity}
                                                        </span>
                                                        <motion.button
                                                            whileTap={{ scale: 0.9 }}
                                                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                            className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-700 rounded-lg shadow-sm text-slate-900 dark:text-white"
                                                        >
                                                            <PlusIcon />
                                                        </motion.button>
                                                    </div>
                                                    <p className="text-xl font-black text-slate-900 dark:text-white italic tabular-nums tracking-tighter">
                                                        ${(item.price * item.quantity).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-8 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-100 dark:border-slate-800 backdrop-blur-xl">
                                <div className="space-y-4 mb-10">
                                    <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                                        <span>Subtotal</span>
                                        <span className="text-slate-900 dark:text-white italic tabular-nums">${totalAmount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                                        <span>Shipping</span>
                                        <span className="text-emerald-500 italic">FREE</span>
                                    </div>
                                    <div className="h-[1px] bg-slate-200 dark:bg-slate-800 my-2" />
                                    <div className="flex justify-between text-3xl font-black text-slate-900 dark:text-white tracking-tighter italic">
                                        <span>Total</span>
                                        <span className="tabular-nums">${totalAmount.toLocaleString()}</span>
                                    </div>
                                </div>
                                <Button
                                    variant="primary"
                                    size="xl"
                                    className="w-full tracking-[0.3em] uppercase"
                                    onClick={handleCheckout}
                                >
                                    CHECKOUT NOW
                                </Button>
                                <p className="text-center text-[10px] text-slate-400 mt-6 font-black uppercase tracking-[0.3em] opacity-60">
                                    SECURE SSL ENCRYPTED PAYMENT
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartDrawer;

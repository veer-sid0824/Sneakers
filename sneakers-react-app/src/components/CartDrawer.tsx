import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

const XMarkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

const MinusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
    </svg>
);

const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
);

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
    const { cartItems, removeFromCart, updateQuantity, totalAmount } = useCart();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-[101] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 sticky top-0 z-10">
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">YOUR BAG</h2>
                                <p className="text-sm text-gray-400 font-medium tracking-widest uppercase mt-1">
                                    {cartItems.length} {cartItems.length === 1 ? 'Item' : 'Items'}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors group"
                            >
                                <XMarkIcon />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center">
                                    <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-300">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Your bag is empty</h3>
                                    <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-[250px]">
                                        Seems like you haven't added any heat to your bag yet.
                                    </p>
                                    <button
                                        onClick={onClose}
                                        className="mt-8 px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200 dark:shadow-none"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <motion.div
                                        layout
                                        key={`${item.id}-${item.size}`}
                                        className="flex gap-4 group"
                                    >
                                        <div className="w-24 h-24 bg-gray-100 dark:bg-slate-800 rounded-2xl overflow-hidden flex-shrink-0 group-hover:ring-2 ring-indigo-500 transition-all">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-bold text-gray-900 dark:text-white truncate pr-2">
                                                    {item.name}
                                                </h4>
                                                <button
                                                    onClick={() => removeFromCart(item.id, item.size)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <TrashIcon />
                                                </button>
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                Size: <span className="font-bold text-gray-700 dark:text-gray-300">US {item.size}</span>
                                            </p>
                                            <div className="flex items-center justify-between mt-3">
                                                <div className="flex items-center bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                                                        className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-shadow disabled:opacity-50"
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <MinusIcon />
                                                    </button>
                                                    <span className="w-8 text-center font-bold text-sm">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                        className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded-md transition-shadow"
                                                    >
                                                        <PlusIcon />
                                                    </button>
                                                </div>
                                                <p className="font-black text-gray-900 dark:text-white">
                                                    ${(item.price * item.quantity).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-6 border-t border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50">
                                <div className="space-y-2 mb-6">
                                    <div className="flex justify-between text-gray-500 dark:text-gray-400 font-medium">
                                        <span>Subtotal</span>
                                        <span>${totalAmount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-500 dark:text-gray-400 font-medium">
                                        <span>Shipping</span>
                                        <span className="text-green-500 font-bold uppercase text-xs tracking-widest mt-1">Calculated at checkout</span>
                                    </div>
                                    <div className="flex justify-between text-xl font-black text-gray-900 dark:text-white pt-2">
                                        <span>Total</span>
                                        <span>${totalAmount.toLocaleString()}</span>
                                    </div>
                                </div>
                                <button className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-200 dark:shadow-none active:scale-[0.98]">
                                    SECURE CHECKOUT
                                </button>
                                <p className="text-center text-xs text-gray-400 mt-4 font-medium uppercase tracking-[0.2em]">
                                    Shipping & taxes calculated at checkout
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


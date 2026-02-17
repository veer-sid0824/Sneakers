import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Sneaker } from '../types';

interface SneakerCardProps {
    sneaker: Sneaker;
}

const SneakerCard = ({ sneaker }: SneakerCardProps) => {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group relative bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300"
        >
            {sneaker.isRare && (
                <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full z-10 shadow-sm">
                    RARE DROP
                </div>
            )}
            <div className="h-64 w-full bg-gray-50 flex items-center justify-center p-6 rounded-t-2xl overflow-hidden relative">
                <motion.img
                    whileHover={{ rotate: -15, scale: 1.1 }}
                    src={sneaker.image}
                    alt={sneaker.name}
                    className="w-full h-auto object-contain transition-transform duration-500 origin-center"
                />
            </div>
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{sneaker.brand}</p>
                    <p className="text-lg font-bold text-gray-900">${sneaker.price}</p>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1">{sneaker.name}</h3>

                <div className="flex gap-2 mb-6">
                    {sneaker.colors.slice(0, 3).map(color => (
                        <div key={color} className="w-4 h-4 rounded-full border border-gray-300" title={color} style={{ backgroundColor: color.toLowerCase() }}></div>
                    ))}
                    {sneaker.colors.length > 3 && (
                        <span className="text-xs text-gray-400 font-medium self-center">+{sneaker.colors.length - 3}</span>
                    )}
                </div>

                <Link
                    to={`/sneakers/${sneaker.id}`}
                    className="block w-full text-center bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-indigo-600 transition-colors shadow-lg shadow-gray-200"
                >
                    View Details
                </Link>
            </div>
        </motion.div>
    );
};

export default SneakerCard;

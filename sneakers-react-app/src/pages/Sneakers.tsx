import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTitle } from '../hooks/useTitle';
import SneakerCard from '../components/SneakerCard';
import { SNEAKERS } from '../data';
import PageTransition from '../components/PageTransition';

const Sneakers = () => {
    useTitle('Sneaker Gallery');
    const [selectedBrand, setSelectedBrand] = useState<string>('All');
    const [sortOrder, setSortOrder] = useState<string>('featured');
    const [priceRange, setPriceRange] = useState<number>(500);

    // Get unique brands
    const brands = ['All', ...new Set(SNEAKERS.map(s => s.brand))];

    const filteredAndSortedSneakers = useMemo(() => {
        let result = [...SNEAKERS];

        // Filter by Brand
        if (selectedBrand !== 'All') {
            result = result.filter(s => s.brand === selectedBrand);
        }

        // Filter by Price
        result = result.filter(s => s.price <= priceRange);

        // Sort
        if (sortOrder === 'low-high') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'high-low') {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [selectedBrand, sortOrder, priceRange]);

    return (
        <PageTransition>
            <div className="py-12 bg-white min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-4xl font-black text-gray-900 sm:text-6xl tracking-tighter uppercase"
                        >
                            The Collection
                        </motion.h1>
                        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                            Explore the latest drops and timeless classics.
                        </p>
                    </div>

                    {/* Filters & Sort Options */}
                    <div className="mb-10 p-6 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                            {/* Brand Filter */}
                            <div>
                                <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                                <select
                                    id="brand"
                                    value={selectedBrand}
                                    onChange={(e) => setSelectedBrand(e.target.value)}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                >
                                    {brands.map(brand => (
                                        <option key={brand} value={brand}>{brand}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Price Filter */}
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                                    Max Price: ${priceRange}
                                </label>
                                <input
                                    type="range"
                                    id="price"
                                    min="0"
                                    max="1000"
                                    step="10"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(Number(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>$0</span>
                                    <span>$1000+</span>
                                </div>
                            </div>

                            {/* Sort Order */}
                            <div>
                                <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                                <select
                                    id="sort"
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                >
                                    <option value="featured">Featured</option>
                                    <option value="low-high">Price: Low to High</option>
                                    <option value="high-low">Price: High to Low</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <AnimatePresence>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        >
                            {filteredAndSortedSneakers.length > 0 ? (
                                filteredAndSortedSneakers.map((sneaker) => (
                                    <motion.div
                                        layout
                                        key={sneaker.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <SneakerCard sneaker={sneaker} />
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-20">
                                    <h3 className="text-lg font-medium text-gray-900">No sneakers found</h3>
                                    <p className="mt-2 text-gray-500">Try adjusting your filters.</p>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </PageTransition>
    );
};

export default Sneakers;

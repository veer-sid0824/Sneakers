import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTitle } from '../hooks/useTitle';
import SneakerCard from '../components/SneakerCard';
import { SNEAKERS } from '../data';
import PageTransition from '../components/PageTransition';
import AdvancedFilter from '../components/AdvancedFilter';
import { ShoeCardSkeleton } from '../components/Skeleton';

const Sneakers = () => {
    useTitle('Sneaker Gallery');
    const [isLoading, setIsLoading] = useState(true);
    const [activeFilters, setActiveFilters] = useState({
        search: '',
        brands: [] as string[],
        minPrice: 0,
        maxPrice: 1000,
        sizes: [] as number[],
        years: [] as number[]
    });

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const [sortOrder, setSortOrder] = useState<string>('featured');

    // Extract dynamic data for filters
    const availableBrands = useMemo(() => Array.from(new Set(SNEAKERS.map(s => s.brand))), []);
    const availableSizes = useMemo(() => Array.from(new Set(SNEAKERS.flatMap(s => s.sizes))), []);
    const availableYears = useMemo(() => Array.from(new Set(SNEAKERS.map(s => new Date(s.releaseDate).getFullYear()))), []);
    const maxPossiblePrice = useMemo(() => Math.max(...SNEAKERS.map(s => s.price), 500), []);

    const filteredAndSortedSneakers = useMemo(() => {
        let result = [...SNEAKERS];

        // 1. Search Query
        if (activeFilters.search) {
            const query = activeFilters.search.toLowerCase();
            result = result.filter(s =>
                s.name.toLowerCase().includes(query) ||
                s.brand.toLowerCase().includes(query)
            );
        }

        // 2. Multi-Brand
        if (activeFilters.brands.length > 0) {
            result = result.filter(s => activeFilters.brands.includes(s.brand));
        }

        // 3. Price Range
        result = result.filter(s => s.price >= activeFilters.minPrice && s.price <= activeFilters.maxPrice);

        // 4. Sizes
        if (activeFilters.sizes.length > 0) {
            result = result.filter(s => s.sizes.some(size => activeFilters.sizes.includes(size)));
        }

        // 5. Years
        if (activeFilters.years.length > 0) {
            result = result.filter(s => {
                const year = new Date(s.releaseDate).getFullYear();
                return activeFilters.years.includes(year);
            });
        }

        // Sort
        if (sortOrder === 'low-high') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'high-low') {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [activeFilters, sortOrder]);

    const handleFilterChange = (filters: any) => {
        setActiveFilters(filters);
    };

    return (
        <PageTransition>
            <div className="py-12 bg-white dark:bg-slate-950 min-h-screen transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-500/20"
                        >
                            <span className="text-xs font-black tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">
                                Explore Everything
                            </span>
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 tracking-tight uppercase"
                        >
                            THE <span className="text-indigo-600">COLLECTION</span>
                        </motion.h1>
                        <p className="max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400 font-medium italic">
                            Discover rare drops, signature silhouettes, and the future of footwear.
                        </p>
                    </div>

                    <AdvancedFilter
                        onFilterChange={handleFilterChange}
                        availableBrands={availableBrands}
                        availableSizes={availableSizes}
                        availableYears={availableYears}
                        maxPossiblePrice={maxPossiblePrice}
                    />

                    {/* Simple Sort Bar */}
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-sm font-bold text-slate-400">
                            SHOWING <span className="text-slate-900 dark:text-white">{filteredAndSortedSneakers.length}</span> SNEAKERS
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest hidden sm:inline">Sort By:</span>
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="bg-transparent border-none text-sm font-black text-indigo-600 dark:text-indigo-400 focus:ring-0 cursor-pointer uppercase tracking-widest"
                            >
                                <option value="featured">Featured</option>
                                <option value="low-high">Lowest Price</option>
                                <option value="high-low">Highest Price</option>
                            </select>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div
                                key="skeleton-grid"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                            >
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                                    <ShoeCardSkeleton key={n} />
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="sneakers-grid"
                                layout
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                            >
                                {filteredAndSortedSneakers.length > 0 ? (
                                    filteredAndSortedSneakers.map((sneaker) => (
                                        <motion.div
                                            layout
                                            key={sneaker.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <SneakerCard sneaker={sneaker} />
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="col-span-full text-center py-32 bg-slate-50 dark:bg-slate-900/30 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800"
                                    >
                                        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <svg className="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight">NO MATCHES FOUND</h3>
                                        <p className="text-gray-500 dark:text-gray-400 font-medium">Try broadening your search or resetting filters.</p>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </PageTransition>
    );
};

export default Sneakers;

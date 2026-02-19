import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterState {
    search: string;
    brands: string[];
    minPrice: number;
    maxPrice: number;
    sizes: number[];
    years: number[];
}

interface AdvancedFilterProps {
    onFilterChange: (filters: FilterState) => void;
    availableBrands: string[];
    availableSizes: number[];
    availableYears: number[];
    maxPossiblePrice: number;
}

const AdvancedFilter = ({
    onFilterChange,
    availableBrands,
    availableSizes,
    availableYears,
    maxPossiblePrice
}: AdvancedFilterProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        search: '',
        brands: [],
        minPrice: 0,
        maxPrice: maxPossiblePrice,
        sizes: [],
        years: []
    });

    useEffect(() => {
        onFilterChange(filters);
    }, [filters, onFilterChange]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, search: e.target.value }));
    };

    const toggleBrand = (brand: string) => {
        setFilters(prev => ({
            ...prev,
            brands: prev.brands.includes(brand)
                ? prev.brands.filter(b => b !== brand)
                : [...prev.brands, brand]
        }));
    };

    const toggleSize = (size: number) => {
        setFilters(prev => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter(s => s !== size)
                : [...prev.sizes, size]
        }));
    };

    const toggleYear = (year: number) => {
        setFilters(prev => ({
            ...prev,
            years: prev.years.includes(year)
                ? prev.years.filter(y => y !== year)
                : [...prev.years, year]
        }));
    };

    const resetFilters = () => {
        setFilters({
            search: '',
            brands: [],
            minPrice: 0,
            maxPrice: maxPossiblePrice,
            sizes: [],
            years: []
        });
    };

    const activeFilterCount = useMemo(() => {
        let count = 0;
        if (filters.search) count++;
        count += filters.brands.length;
        count += filters.sizes.length;
        count += filters.years.length;
        if (filters.minPrice > 0 || filters.maxPrice < maxPossiblePrice) count++;
        return count;
    }, [filters, maxPossiblePrice]);

    return (
        <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
                {/* Search Bar */}
                <div className="relative w-full md:max-w-md group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search sneakers..."
                        value={filters.search}
                        onChange={handleSearchChange}
                        className="block w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 shadow-sm"
                    />
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold transition-all duration-300 border-2 ${isOpen
                                ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none'
                                : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-indigo-500'
                            }`}
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        FILTERS
                        {activeFilterCount > 0 && (
                            <span className="ml-2 flex items-center justify-center w-5 h-5 bg-white text-indigo-600 rounded-full text-[10px] font-black">
                                {activeFilterCount}
                            </span>
                        )}
                    </button>

                    {activeFilterCount > 0 && (
                        <button
                            onClick={resetFilters}
                            className="px-6 py-4 rounded-2xl font-bold text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all duration-300"
                        >
                            RESET
                        </button>
                    )}
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="overflow-hidden"
                    >
                        <div className="p-8 bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border-2 border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-10 shadow-inner">
                            {/* Brand Filter */}
                            <div>
                                <h4 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-6">Brands</h4>
                                <div className="flex flex-wrap gap-2">
                                    {availableBrands.map(brand => (
                                        <button
                                            key={brand}
                                            onClick={() => toggleBrand(brand)}
                                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 border-2 ${filters.brands.includes(brand)
                                                    ? 'bg-indigo-600 border-indigo-600 text-white'
                                                    : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-200'
                                                }`}
                                        >
                                            {brand.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h4 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-6">Price Range</h4>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                                        <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">${filters.minPrice}</span>
                                        <span className="text-xs font-bold text-slate-300">-</span>
                                        <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">${filters.maxPrice}</span>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-1">
                                                <span>Min</span>
                                                <span>{filters.minPrice}</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max={maxPossiblePrice}
                                                step="10"
                                                value={filters.minPrice}
                                                onChange={(e) => setFilters(prev => ({ ...prev, minPrice: Math.min(Number(e.target.value), prev.maxPrice) }))}
                                                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                            />
                                        </div>
                                        <div>
                                            <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase mb-1">
                                                <span>Max</span>
                                                <span>{filters.maxPrice}</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0"
                                                max={maxPossiblePrice}
                                                step="10"
                                                value={filters.maxPrice}
                                                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: Math.max(Number(e.target.value), prev.minPrice) }))}
                                                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Size Filter */}
                            <div>
                                <h4 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-6">Sizes</h4>
                                <div className="grid grid-cols-4 gap-2">
                                    {availableSizes.sort((a, b) => a - b).map(size => (
                                        <button
                                            key={size}
                                            onClick={() => toggleSize(size)}
                                            className={`h-10 rounded-xl text-xs font-bold transition-all duration-300 border-2 ${filters.sizes.includes(size)
                                                    ? 'bg-indigo-600 border-indigo-600 text-white'
                                                    : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-200'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Year Filter */}
                            <div>
                                <h4 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-6">Release Year</h4>
                                <div className="flex flex-wrap gap-2">
                                    {availableYears.sort((a, b) => b - a).map(year => (
                                        <button
                                            key={year}
                                            onClick={() => toggleYear(year)}
                                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 border-2 ${filters.years.includes(year)
                                                    ? 'bg-indigo-600 border-indigo-600 text-white'
                                                    : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-indigo-200'
                                                }`}
                                        >
                                            {year}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdvancedFilter;

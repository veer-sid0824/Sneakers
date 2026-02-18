const SkeletonCard = () => {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-slate-800 animate-pulse transition-colors">
            <div className="h-48 bg-gray-200 dark:bg-slate-800 w-full transition-colors" />
            <div className="p-6">
                <div className="h-6 bg-gray-200 dark:bg-slate-800 rounded w-3/4 mb-4 transition-colors" />
                <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-1/2 mb-2 transition-colors" />
                <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-full mb-4 transition-colors" />
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-800 flex justify-between items-center transition-colors">
                    <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-1/3 transition-colors" />
                    <div className="h-4 bg-gray-200 dark:bg-slate-800 rounded w-1/4 transition-colors" />
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;

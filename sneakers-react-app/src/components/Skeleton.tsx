import React from 'react';

interface SkeletonProps {
    className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
    return (
        <div className={`animate-pulse bg-slate-200 dark:bg-slate-700 rounded-md ${className}`} />
    );
};

export const PlayerCardSkeleton: React.FC = () => {
    return (
        <div className="bg-white dark:bg-slate-800 rounded-[2rem] overflow-hidden shadow-2xl shadow-indigo-100/50 dark:shadow-none border border-slate-100 dark:border-slate-700">
            {/* Image Skeleton */}
            <Skeleton className="h-80 w-full rounded-none" />

            {/* Content Skeleton */}
            <div className="p-8">
                <div className="mb-6">
                    <Skeleton className="h-8 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/4" />
                </div>

                <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-50 dark:border-slate-700">
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-6 w-12" />
                        <Skeleton className="h-3 w-20" />
                    </div>
                    <div className="h-8 w-[1px] bg-slate-100 dark:bg-slate-700" />
                    <div className="flex flex-col items-end gap-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-12" />
                    </div>
                </div>

                <Skeleton className="h-14 w-full rounded-2xl" />
            </div>
        </div>
    );
};

export default Skeleton;

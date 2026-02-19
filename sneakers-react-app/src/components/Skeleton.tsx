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
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-100/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
            {/* Image Skeleton */}
            <Skeleton className="h-96 w-full rounded-none" />

            {/* Content Skeleton */}
            <div className="p-8 pb-10">
                <div className="mb-8 pb-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex flex-col gap-2">
                        <Skeleton className="h-8 w-12" />
                        <Skeleton className="h-3 w-16" />
                    </div>
                    <div className="h-10 w-[1px] bg-slate-100 dark:bg-slate-800" />
                    <div className="flex flex-col items-end gap-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-12" />
                    </div>
                </div>

                <Skeleton className="h-14 w-full rounded-[1.25rem]" />
            </div>
        </div>
    );
};

export const ShoeCardSkeleton: React.FC = () => {
    return (
        <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2rem]">
            {/* Image Skeleton */}
            <Skeleton className="h-72 w-full rounded-t-[2rem]" />

            <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-6 w-12" />
                </div>
                <Skeleton className="h-8 w-3/4 mb-4" />

                <div className="flex gap-2.5 mb-8">
                    <Skeleton className="w-5 h-5 rounded-full" />
                    <Skeleton className="w-5 h-5 rounded-full" />
                    <Skeleton className="w-5 h-5 rounded-full" />
                </div>

                <div className="grid grid-cols-5 gap-3">
                    <Skeleton className="col-span-4 h-12 rounded-2xl" />
                    <Skeleton className="col-span-1 h-12 rounded-2xl" />
                </div>
            </div>
        </div>
    );
};

export default Skeleton;

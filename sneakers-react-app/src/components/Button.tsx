import React from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import Ripple from './Ripple';

interface ButtonProps extends HTMLMotionProps<'button'> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    showRipple?: boolean;
    children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    children,
    className = '',
    showRipple = true,
    ...props
}) => {
    const baseStyles = "relative inline-flex items-center justify-center font-bold transition-all duration-300 rounded-2xl overflow-hidden active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none",
        secondary: "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-black dark:hover:bg-slate-100",
        outline: "bg-transparent border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:border-indigo-600 dark:hover:border-indigo-500",
        ghost: "bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800",
        danger: "bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-200 dark:shadow-none"
    };

    const sizes = {
        sm: "px-4 py-2 text-xs",
        md: "px-6 py-3 text-sm",
        lg: "px-8 py-4 text-base",
        xl: "px-10 py-5 text-lg"
    };

    return (
        <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} group ${className}`}
            {...props}
        >
            <span className="relative z-10 flex items-center justify-center gap-2 pointer-events-none">
                {children as React.ReactNode}
            </span>

            {/* Shine Effect */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-2xl">
                <motion.div
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]"
                />
            </div>

            {showRipple && !props.disabled && <Ripple />}
        </motion.button>
    );
};

export default Button;

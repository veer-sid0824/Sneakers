import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Ripple = () => {
    const [ripples, setRipples] = useState<{ x: number, y: number, id: number }[]>([]);

    const addRipple = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const id = Date.now();
        setRipples(prev => [...prev, { x, y, id }]);
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (ripples.length > 0) {
                setRipples(prev => prev.slice(1));
            }
        }, 1000);
        return () => clearTimeout(timeout);
    }, [ripples]);

    return (
        <div
            className="absolute inset-0 overflow-hidden pointer-events-auto"
            onMouseDown={addRipple}
        >
            <AnimatePresence>
                {ripples.map(ripple => (
                    <motion.span
                        key={ripple.id}
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{ scale: 4, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="absolute bg-white/30 rounded-full pointer-events-none"
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                            width: '20px',
                            height: '20px',
                            marginLeft: '-10px',
                            marginTop: '-10px'
                        }}
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default Ripple;

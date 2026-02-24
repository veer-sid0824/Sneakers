import { motion, type Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from './Button';

const Hero = () => {
    const container: Variants = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.1 * i },
        }),
    };

    const child: Variants = {
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 15,
                stiffness: 150,
            },
        },
        hidden: {
            opacity: 0,
            y: 40,
            transition: {
                type: "spring",
                damping: 15,
                stiffness: 150,
            },
        },
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-slate-950">
            {/* Background Video with subtle zoom effect */}
            <motion.video
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
                autoPlay
                loop
                muted
                playsInline
                poster="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=2090&auto=format&fit=crop"
                className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-60"
            >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-basketball-player-practicing-at-night-40263-large.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </motion.video>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20 z-10" />

            {/* Content */}
            <div className="relative z-20 flex flex-col items-center justify-center min-h-screen text-center px-4 md:px-6">
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-wrap justify-center items-center gap-1 md:gap-2 max-w-4xl leading-tight"
                >
                    {"LEGENDS START HERE".split("").map((char, index) => (
                        <motion.span
                            variants={child}
                            key={index}
                            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white ${char === " " ? "basis-full md:basis-auto" : ""} tracking-tight inline-block italic hover:text-indigo-400 transition-colors duration-300 drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]`}
                        >
                            {char}
                        </motion.span>
                    ))}
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 1, type: "spring", damping: 20 }}
                    className="text-lg sm:text-xl md:text-2xl text-slate-200 mt-8 md:mt-10 max-w-3xl font-medium tracking-tight px-4 leading-relaxed"
                >
                    Experience the fusion of <span className="text-indigo-400 font-black italic">performance</span> and <span className="text-white font-black italic">culture</span>.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="mt-12 md:mt-14 flex flex-col sm:flex-row gap-4 md:gap-6 justify-center w-full px-4"
                >
                    <Link to="/sneakers">
                        <Button size="xl" variant="primary" className="px-12 tracking-[0.3em] font-black uppercase italic">
                            SHOP COLLECTION
                        </Button>
                    </Link>
                    <Link to="/rare-drops">
                        <Button size="xl" variant="outline" className="px-12 tracking-[0.3em] font-black uppercase italic border-white text-white hover:bg-white hover:text-slate-950">
                            VIEW DROPS
                        </Button>
                    </Link>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                        <motion.div
                            animate={{
                                y: [0, 12, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="w-1.5 h-1.5 bg-white rounded-full"
                        />
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;


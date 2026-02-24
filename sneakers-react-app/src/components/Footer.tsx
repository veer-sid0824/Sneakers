import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    const linkClass = "text-slate-400 hover:text-white dark:text-slate-400 dark:hover:text-white transition-colors duration-300 font-medium";

    return (
        <footer className="bg-slate-900 dark:bg-slate-950 border-t border-slate-800 dark:border-slate-800 text-white py-16 md:py-20 transition-colors duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12"
                >
                    {/* Brand Section */}
                    <motion.div variants={fadeInUp} className="lg:col-span-1">
                        <Link to="/" className="text-2xl font-black tracking-tight text-white mb-4 block hover:text-indigo-400 transition-colors">
                            Sneakers
                        </Link>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                            The ultimate destination for legendary sneaker collections from basketball's greatest players.
                        </p>
                    </motion.div>

                    {/* Shop Section */}
                    <motion.div variants={fadeInUp}>
                        <h3 className="text-sm font-black text-white tracking-wider uppercase mb-6 flex items-center gap-3">
                            <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                            Shop
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/sneakers" className={linkClass}>
                                    All Sneakers
                                </Link>
                            </li>
                            <li>
                                <Link to="/rare-drops" className={linkClass}>
                                    Rare Drops
                                </Link>
                            </li>
                            <li>
                                <Link to="/new-arrivals" className={linkClass}>
                                    New Arrivals
                                </Link>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Company Section */}
                    <motion.div variants={fadeInUp}>
                        <h3 className="text-sm font-black text-white tracking-wider uppercase mb-6 flex items-center gap-3">
                            <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                            Company
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/about" className={linkClass}>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className={linkClass}>
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link to="/admin" className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300 font-bold text-sm">
                                    Admin Dashboard
                                </Link>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Support Section */}
                    <motion.div variants={fadeInUp}>
                        <h3 className="text-sm font-black text-white tracking-wider uppercase mb-6 flex items-center gap-3">
                            <span className="w-2 h-2 bg-indigo-600 rounded-full" />
                            Support
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/terms" className={linkClass}>
                                    Terms & Services
                                </Link>
                            </li>
                            <li>
                                <a href="mailto:support@sneakers.com" className={linkClass}>
                                    Support Email
                                </a>
                            </li>
                            <li>
                                <a href="tel:+15551234567" className={linkClass}>
                                    +1 (555) 123-4567
                                </a>
                            </li>
                        </ul>
                    </motion.div>
                </motion.div>

                {/* Divider */}
                <div className="border-t border-slate-800 mb-8" />

                {/* Bottom Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row justify-between items-center gap-6"
                >
                    <p className="text-sm text-slate-400">
                        &copy; {currentYear} Sneakers App. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm">
                        <Link to="/terms" className="text-slate-400 hover:text-white transition-colors">
                            Terms
                        </Link>
                        <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                            About
                        </Link>
                        <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                            Contact
                        </Link>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;

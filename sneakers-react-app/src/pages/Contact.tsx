import { motion } from 'framer-motion';
import { useTitle } from '../hooks/useTitle';
import PageTransition from '../components/PageTransition';
import { useState } from 'react';

const Contact = () => {
    useTitle('Contact Us');
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" as const }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <PageTransition>
            <div className="py-24 bg-white dark:bg-slate-950 text-slate-900 dark:text-white min-h-screen transition-colors duration-500">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeInUp}
                        className="text-center mb-20"
                    >
                        <div className="inline-block px-6 py-2 mb-6 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                            <span className="text-xs font-black tracking-[0.2em] text-indigo-600 dark:text-indigo-400 uppercase">
                                Get in Touch
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">
                            Contact Us
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-12 mb-16">
                        {/* Contact Info */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                        >
                            <h2 className="text-2xl font-black mb-8">Contact Information</h2>
                            <div className="space-y-8">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-xl">✉️</span>
                                    </div>
                                    <div>
                                        <h3 className="font-black mb-2">Email</h3>
                                        <p className="text-slate-600 dark:text-slate-400">support@sneakers.com</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-xl">📱</span>
                                    </div>
                                    <div>
                                        <h3 className="font-black mb-2">Phone</h3>
                                        <p className="text-slate-600 dark:text-slate-400">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-xl">📍</span>
                                    </div>
                                    <div>
                                        <h3 className="font-black mb-2">Address</h3>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            123 Sneaker Lane<br />
                                            Basketball City, BC 12345
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeInUp}
                        >
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold mb-2">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                        placeholder="Your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">Subject</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                        placeholder="Subject"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold mb-2">Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 resize-none"
                                        placeholder="Your message"
                                    />
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition"
                                >
                                    Send Message
                                </motion.button>
                                {submitted && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center text-green-600 dark:text-green-400 font-bold"
                                    >
                                        ✓ Message sent successfully!
                                    </motion.p>
                                )}
                            </form>
                        </motion.div>
                    </div>

                    {/* Hours Section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-12 border border-slate-100 dark:border-slate-800 text-center"
                    >
                        <h2 className="text-2xl font-black mb-6">Business Hours</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div>
                                <p className="text-slate-600 dark:text-slate-400 mb-2">Monday - Friday</p>
                                <p className="font-black text-lg">9:00 AM - 6:00 PM EST</p>
                            </div>
                            <div>
                                <p className="text-slate-600 dark:text-slate-400 mb-2">Saturday</p>
                                <p className="font-black text-lg">10:00 AM - 4:00 PM EST</p>
                            </div>
                            <div>
                                <p className="text-slate-600 dark:text-slate-400 mb-2">Sunday</p>
                                <p className="font-black text-lg">Closed</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Contact;

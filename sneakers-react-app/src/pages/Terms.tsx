import { motion } from 'framer-motion';
import { useTitle } from '../hooks/useTitle';
import PageTransition from '../components/PageTransition';

const Terms = () => {
    useTitle('Terms & Services');

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" as const }
        }
    };

    const sections = [
        {
            title: '1. Terms and Conditions',
            content: 'By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.'
        },
        {
            title: '2. Use License',
            content: 'Permission is granted to temporarily download one copy of the materials (information or software) on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:'
        },
        {
            title: '3. Disclaimer',
            content: 'The materials on our website are provided on an as-is basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.'
        },
        {
            title: '4. Limitations',
            content: 'In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.'
        },
        {
            title: '5. Accuracy of Materials',
            content: 'The materials appearing on our website could include technical, typographical, or photographic errors. Our company does not warrant that any of the materials on our website are accurate, complete, or current. We may make changes to the materials contained on our website at any time without notice.'
        },
        {
            title: '6. Links',
            content: 'Our company has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by our company of the site. Use of any such linked website is at the user\'s own risk.'
        },
        {
            title: '7. Modifications',
            content: 'Our company may revise these terms of service for our website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.'
        },
        {
            title: '8. Governing Law',
            content: 'These terms and conditions are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.'
        }
    ];

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
                                Legal
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">
                            Terms & Services
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400">
                            Last updated: February 24, 2026
                        </p>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="prose dark:prose-invert max-w-none"
                    >
                        <div className="space-y-8">
                            {sections.map((section, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-8 border border-slate-100 dark:border-slate-800"
                                >
                                    <h2 className="text-2xl font-black mb-4">{section.title}</h2>
                                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                        {section.content}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Additional Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="mt-20 p-8 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl border border-indigo-200 dark:border-indigo-800"
                    >
                        <h3 className="text-2xl font-black mb-4">Questions?</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            If you have any questions about our Terms & Services, please contact us at support@sneakers.com or use our contact form.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="mailto:support@sneakers.com"
                                className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition inline-flex items-center"
                            >
                                Email Us
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    );
};

export default Terms;

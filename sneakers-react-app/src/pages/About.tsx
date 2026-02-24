import { motion } from 'framer-motion';
import { useTitle } from '../hooks/useTitle';
import PageTransition from '../components/PageTransition';

const About = () => {
    useTitle('About Us');

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" as const }
        }
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
                                Our Story
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">
                            About Us
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400">
                            The leading platform for authentic sneaker collections from basketball's greatest legends
                        </p>
                    </motion.div>

                    {/* Mission Section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mb-16"
                    >
                        <h2 className="text-3xl font-black mb-6">Our Mission</h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                            We're dedicated to preserving and celebrating the history of basketball through the iconic sneakers worn by its greatest players. From Michael Jordan's Air Jordans to modern WNBA icons, we bring you authentic collections that tell the story of the game.
                        </p>
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                            Our platform connects sneaker enthusiasts with rare drops, player collections, and exclusive releases from both NBA legends and WNBA game changers who shaped basketball culture.
                        </p>
                    </motion.div>

                    {/* Values Section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="mb-16"
                    >
                        <h2 className="text-3xl font-black mb-8">Our Values</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: 'Authenticity',
                                    description: 'We guarantee 100% authentic sneakers from verified sources.'
                                },
                                {
                                    title: 'Community',
                                    description: 'Building a passionate community of sneaker collectors and basketball fans.'
                                },
                                {
                                    title: 'Excellence',
                                    description: 'Delivering exceptional service and the rarest collections available.'
                                }
                            ].map((value, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -5 }}
                                    className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-8 border border-slate-100 dark:border-slate-800"
                                >
                                    <h3 className="text-xl font-black mb-4">{value.title}</h3>
                                    <p className="text-slate-600 dark:text-slate-400">{value.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Features Section */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="bg-gradient-to-br from-indigo-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-3xl p-12 border border-slate-100 dark:border-slate-800"
                    >
                        <h2 className="text-3xl font-black mb-8">What We Offer</h2>
                        <ul className="space-y-4">
                            {[
                                'Exclusive NBA player sneaker collections',
                                'WNBA icon footwear galleries',
                                'Rare and limited edition drops',
                                'Detailed player profiles and career highlights',
                                'Secure checkout and authentication',
                                'Order tracking and customer support'
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-4 text-lg"
                                >
                                    <span className="w-6 h-6 bg-indigo-600 dark:bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold">✓</span>
                                    </span>
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>
        </PageTransition>
    );
};

export default About;

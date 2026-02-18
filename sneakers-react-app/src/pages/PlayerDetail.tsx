import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTitle } from '../hooks/useTitle';
import { PLAYERS } from '../data';

const PlayerDetail = () => {
    const { id } = useParams<{ id: string }>();
    const player = PLAYERS.find(p => String(p.id) === id);

    useTitle(player ? player.name : 'Player Not Found');

    if (!player) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Player Not Found</h2>
                <Link to="/players" className="text-indigo-600 hover:text-indigo-800 font-medium hover:underline">
                    &larr; Back to all players
                </Link>
            </div>
        );
    }

    return (
        <div className="py-12 bg-gray-50/50 dark:bg-slate-950 min-h-screen transition-colors duration-500">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link to="/players" className="text-indigo-600 hover:text-indigo-800 mb-8 inline-flex items-center gap-2 font-medium transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Players
                </Link>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-none overflow-hidden border border-transparent dark:border-slate-800"
                >
                    <div className="md:flex">
                        <div className="md:flex-shrink-0 md:w-1/2">
                            <img className="h-full w-full object-cover" src={player.profileImage} alt={player.name} />
                        </div>
                        <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
                            <div className="uppercase tracking-wide text-sm text-indigo-500 font-bold">{player.team}</div>
                            <h1 className="mt-2 text-4xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                                {player.name}
                            </h1>
                            <p className="mt-4 text-xl text-gray-500 dark:text-slate-400">{player.position}</p>
                            <p className="mt-6 text-lg text-gray-700 dark:text-slate-300 leading-relaxed">
                                {player.bio}
                            </p>

                            {player.achievements && player.achievements.length > 0 && (
                                <div className="mt-8">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Career Achievements</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-slate-400">
                                        {player.achievements.map((achievement, index) => (
                                            <li key={index} className="pl-2">{achievement}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PlayerDetail;

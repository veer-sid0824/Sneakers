import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 border-t border-gray-800 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <span className="text-2xl font-bold tracking-tight text-white mb-4 block">Sneakers</span>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                            The ultimate destination for sneaker enthusiasts. Explore legendary players, rare drops, and the sneakers that defined the game.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">Shop</h3>
                        <ul className="space-y-3">
                            <li><Link to="/sneakers" className="text-base text-gray-400 hover:text-white transition">All Sneakers</Link></li>
                            <li><Link to="/rare-drops" className="text-base text-gray-400 hover:text-white transition">Rare Drops</Link></li>
                            <li><Link to="#" className="text-base text-gray-400 hover:text-white transition">New Arrivals</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase mb-4">Company</h3>
                        <ul className="space-y-3">
                            <li><Link to="#" className="text-base text-gray-400 hover:text-white transition">About Us</Link></li>
                            <li><Link to="#" className="text-base text-gray-400 hover:text-white transition">Contact</Link></li>
                            <li><Link to="#" className="text-base text-gray-400 hover:text-white transition">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Sneakers App. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        {/* Social icons could go here */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import NBAPlayersPage from '../pages/NBAPlayersPage';
import PlayerCollectionPage from '../pages/PlayerCollectionPage';
import ShoeDetailPage from '../pages/ShoeDetailPage';
import PlayerDetail from '../pages/PlayerDetail';
import Sneakers from '../pages/Sneakers';
import SneakerDetail from '../pages/SneakerDetail';
import RareDrops from '../pages/RareDrops';

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />

                <Route path="/players" element={<NBAPlayersPage />} />
                <Route path="/players/:id" element={<PlayerDetail />} />
                <Route path="/nba/:playerId" element={<PlayerCollectionPage />} />
                <Route path="/nba/:playerId/:shoeId" element={<ShoeDetailPage />} />

                <Route path="/sneakers" element={<Sneakers />} />
                <Route path="/sneakers/:id" element={<SneakerDetail />} />

                <Route path="/rare-drops" element={<RareDrops />} />

                <Route path="*" element={
                    <div className="flex flex-col items-center justify-center h-full py-20">
                        <h1 className="text-4xl font-bold text-gray-800">404</h1>
                        <p className="text-xl text-gray-600">Page Not Found</p>
                    </div>
                } />
            </Route>
        </Routes>
    );
};

export default AppRoutes;

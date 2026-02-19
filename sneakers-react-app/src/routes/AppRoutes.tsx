import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Skeleton from '../components/Skeleton';

// Lazy load pages
const Home = lazy(() => import('../pages/Home'));
const NBAPlayersPage = lazy(() => import('../pages/NBAPlayersPage'));
const WNBAPlayersPage = lazy(() => import('../pages/WNBAPlayersPage'));
const PlayerCollectionPage = lazy(() => import('../pages/PlayerCollectionPage'));
const ShoeDetailPage = lazy(() => import('../pages/ShoeDetailPage'));
const PlayerDetail = lazy(() => import('../pages/PlayerDetail'));
const Sneakers = lazy(() => import('../pages/Sneakers'));
const SneakerDetail = lazy(() => import('../pages/SneakerDetail'));
const RareDrops = lazy(() => import('../pages/RareDrops'));
const Wishlist = lazy(() => import('../pages/Wishlist'));
const AdminDashboard = lazy(() => import('../pages/AdminDashboard'));
const Payment = lazy(() => import('../pages/Payment'));
const OrderConfirmation = lazy(() => import('../pages/OrderConfirmation'));
const OrderTracking = lazy(() => import('../pages/OrderTracking'));

const LoadingFallback = () => (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-8">
        <div className="w-16 h-16 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin mb-4" />
        <Skeleton className="h-4 w-48 mb-2" />
        <Skeleton className="h-3 w-32" />
    </div>
);

const AppRoutes = () => {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin" element={<AdminDashboard />} />

                    <Route path="/players" element={<NBAPlayersPage />} />
                    <Route path="/players/:id" element={<PlayerDetail />} />
                    <Route path="/nba/:playerId" element={<PlayerCollectionPage />} />
                    <Route path="/nba/:playerId/:shoeId" element={<ShoeDetailPage />} />

                    <Route path="/wnba" element={<WNBAPlayersPage />} />
                    <Route path="/wnba/:playerId" element={<PlayerCollectionPage />} />
                    <Route path="/wnba/:playerId/:shoeId" element={<ShoeDetailPage />} />

                    <Route path="/sneakers" element={<Sneakers />} />
                    <Route path="/sneakers/:id" element={<SneakerDetail />} />

                    <Route path="/rare-drops" element={<RareDrops />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/payment" element={<Payment />} />
                    <Route path="/order-confirmation" element={<OrderConfirmation />} />

                    <Route path="*" element={
                        <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                            <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tighter">404</h1>
                            <p className="text-xl text-slate-500 dark:text-slate-400 font-medium">Page Not Found</p>
                        </div>
                    } />
                </Route>
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;

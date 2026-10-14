import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AppLayout } from '@/widgets/app-layout';

import { HealthPage } from '@/pages/health';
import { HomePage } from '@/pages/home';
import { ManageTeamPage } from '@/pages/manage-team';
import { TeamPerformance } from '@/pages/team-performance';
import { LeaderboardPage } from '@/pages/leaderboard';
import { StatisticsPage } from '@/pages/statistics';
import { PricePredictionPage } from '@/pages/price-prediction';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="home" replace />,
            },
            {
                path: 'home',
                element: <HomePage />,
            },
            {
                path: 'manage-team',
                element: <ManageTeamPage />,
            },
            {
                path: 'price-prediction',
                element: <PricePredictionPage />,
            },
            {
                path: 'team-performance',
                element: <TeamPerformance />,
            },
            {
                path: 'leaderboard',
                element: <LeaderboardPage />,
            },
            {
                path: 'statistics',
                element: <StatisticsPage />,
            },
            {
                path: 'health',
                element: <HealthPage />,
            },
        ],
    },
]);

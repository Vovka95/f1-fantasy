import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AppLayout } from '@/widgets/app-layout';

import { HealthPage } from '@/pages/health';
import { StatisticsPage } from '@/pages/statistics';
import { ManageTeamPage } from '@/pages/manage-team';
import { TeamPerformance } from '@/pages/team-performance';
import { HomePage } from '@/pages/home/ui/HomePage';

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
                path: 'team-performance',
                element: <TeamPerformance />,
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

import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AppLayout } from '@/widgets/app-layout';

import { HealthPage } from '@/pages/health';
import { StatisticsPage } from '@/pages/statistics';
import { ManageTeamPage } from '@/pages/manage-team';
import { TeamPerformance } from '@/pages/team-performance';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="statistics" replace />,
            },
            {
                path: 'statistics',
                element: <StatisticsPage />,
            },
            {
                path: 'manage-team',
                element: <ManageTeamPage />,
            },
            {
                path: '/team-performance',
                element: <TeamPerformance />,
            },
            {
                path: 'health',
                element: <HealthPage />,
            },
        ],
    },
]);

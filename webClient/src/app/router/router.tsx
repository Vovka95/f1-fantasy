import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AppLayout } from '@/widgets/app-layout';

import { HealthPage } from '@/pages/health';
import { StatisticsPage } from '@/pages/statistics';
import { BuildTeamPage } from '@/pages/build-team';

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
                path: 'build-team',
                element: <BuildTeamPage />,
            },
            {
                path: 'health',
                element: <HealthPage />,
            },
        ],
    },
]);

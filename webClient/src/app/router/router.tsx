import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AppLayout } from '@/widgets/app-layout';
import { HealthPage } from '@/pages/health';
import { DriversPage } from '@/pages/drivers';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="drivers" replace />,
            },
            {
                path: 'drivers',
                element: <DriversPage />,
            },
            {
                path: 'health',
                element: <HealthPage />,
            },
        ],
    },
]);

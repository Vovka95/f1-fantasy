import { createBrowserRouter, Navigate } from 'react-router-dom';

import { RootLayout } from '@/widgets/root-layout';
import { HealthPage } from '@/pages/health';
import { DriversPage } from '@/pages/drivers';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
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

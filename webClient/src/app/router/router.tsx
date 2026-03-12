import { createBrowserRouter, Navigate } from 'react-router-dom';

import { RootLayout } from '@/widgets/root-layout';
import { TestPage } from '@/pages/f1-fantasy';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Navigate to="test" replace />,
            },
            {
                path: 'test',
                element: <TestPage />,
            },
        ],
    },
]);

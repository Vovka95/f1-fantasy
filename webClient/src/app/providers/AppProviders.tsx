import { RouterProvider } from 'react-router-dom';

import { QueryProvider } from './QueryProvider';

import { router } from '../router/router';

export const AppProviders = () => {
    return (
        <QueryProvider>
            <RouterProvider router={router} />
        </QueryProvider>
    );
};

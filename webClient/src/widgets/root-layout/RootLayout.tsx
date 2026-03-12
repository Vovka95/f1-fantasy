import { Outlet } from 'react-router-dom';

export const RootLayout = () => {
    return (
        <div className="h-dvh overflow-hidden bg-bg text-fg">
            <Outlet />
        </div>
    );
};

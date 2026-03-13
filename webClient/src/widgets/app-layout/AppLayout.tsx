import { Outlet } from 'react-router-dom';

import { TopBar } from './TopBar';
import { useF1SessionStatusQuery } from '@/feature/f1-session/model';
import { FullPageLoader } from '@/shared/ui';

export const AppLayout = () => {
    const { isLoading } = useF1SessionStatusQuery();

    return (
        <div className="h-dvh overflow-hidden bg-bg text-fg">
            <TopBar />

            <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-6">
                <main className="min-w-0 flex-1">
                    {isLoading ? <FullPageLoader /> : <Outlet />}
                </main>
            </div>
        </div>
    );
};

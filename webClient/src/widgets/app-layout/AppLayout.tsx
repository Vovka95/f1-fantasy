import { Outlet } from 'react-router-dom';

import { TopBar } from './TopBar';
import { useF1SessionStatusQuery } from '@/feature/f1-session/model';
import { FullPageLoader } from '@/shared/ui';

export const AppLayout = () => {
    const { isLoading } = useF1SessionStatusQuery();

    return (
        <div className="flex h-dvh flex-col bg-bg text-fg">
            <TopBar />

            <div className="flex w-full gap-6 px-4 py-6 overflow-hidden">
                <main className="min-h-0 min-w-0 flex-1 overflow-hidden">
                    {isLoading ? <FullPageLoader /> : <Outlet />}
                </main>
            </div>
        </div>
    );
};

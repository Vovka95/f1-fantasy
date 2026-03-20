import { ConnectF1SessionDialog } from '@/feature/f1-session/ui/connect-f1-session-dialog';
import { ConnectF1SessionStatus } from '@/feature/f1-session/ui/connect-f1-session-status';
import { Navigation } from './Navigation';
import { Divider } from '@/shared/ui';

export const TopBar = () => {
    return (
        <header className="sticky top-0 z-40 border-b bg-bg/95 backdrop-blur px-4">
            <div className="mx-auto flex h-16 w-full items-center justify-between">
                <div className="flex items-center gap-6">
                    <div className="text-lg font-semibold">F1 Fantasy</div>

                    <Navigation />
                </div>

                <div className="h-full flex items-center gap-3">
                    <Divider orientation="vertical" />

                    <ConnectF1SessionStatus />

                    <ConnectF1SessionDialog />
                </div>
            </div>
        </header>
    );
};

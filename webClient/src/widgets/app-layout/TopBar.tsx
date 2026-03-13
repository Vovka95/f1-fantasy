import { ConnectF1SessionDialog } from '@/feature/f1-session/ui/connect-f1-session-dialog';
import { ConnectF1SessionStatus } from '@/feature/f1-session/ui/connect-f1-session-status';

export const TopBar = () => {
    return (
        <header className="sticky top-0 z-40 border-b bg-bg/95 backdrop-blur">
            <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4">
                <div className="flex items-center gap-6">
                    <div className="text-lg font-semibold">F1 Fantasy</div>

                    <nav className="hidden items-center gap-4 md:flex"></nav>
                </div>

                <div className="flex items-center gap-3">
                    <ConnectF1SessionStatus />

                    <ConnectF1SessionDialog />
                </div>
            </div>
        </header>
    );
};

import { useF1SessionStore } from '@/shared/store/f1-session';

export const ConnectF1SessionStatus = () => {
    const isExpired = useF1SessionStore((state) => state.isExpired);
    const isConfigured = useF1SessionStore((state) => state.isConfigured);

    if (!isConfigured) {
        return (
            <span className="rounded-full border border-b-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-600">
                Session is not configured
            </span>
        );
    }

    if (isExpired) {
        return (
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-600">
                Session expired
            </span>
        );
    }

    return (
        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600">
            Connected
        </span>
    );
};

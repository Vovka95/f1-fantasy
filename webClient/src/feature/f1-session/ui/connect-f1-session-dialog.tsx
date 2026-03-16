import { type PropsWithChildren } from 'react';

import { Button, Dialog } from '@/shared/ui';

import { ConnectF1SessionForm } from './connect-f1-session-form';
import { useF1ConnectDialogStore } from '@/shared/store/f1-connect-dialog';

export const ConnectF1SessionDialog = ({}: PropsWithChildren) => {
    const open = useF1ConnectDialogStore((s) => s.open);
    const setOpen = useF1ConnectDialogStore((s) => s.setOpen);

    return (
        <Dialog
            open={open}
            setOpen={setOpen}
            title="Connect F1 session"
            description="Paste your F1 cookies or session data to connect your account."
            trigger={
                <Button variant="primary" size="sm">
                    Connect session
                </Button>
            }
        >
            <ConnectF1SessionForm
                onCancel={() => setOpen(false)}
                onSuccess={() => setOpen(false)}
            />
        </Dialog>
    );
};

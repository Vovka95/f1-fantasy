import type { PropsWithChildren, ReactNode } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { XIcon } from 'lucide-react';

import { IconButton } from '../IconButton';

export type DialogProps = PropsWithChildren & {
    title: ReactNode;
    description: ReactNode;
    trigger: ReactNode;
    open: boolean;
    setOpen: (v: boolean) => void;
};

export const Dialog = ({
    title,
    description,
    trigger,
    children,
    open,
    setOpen,
}: DialogProps) => {
    return (
        <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
            <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>

            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />

                <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-[95vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-2xl border bg-bg p-6 shadow-2xl focus:outline-none">
                    <div className="mb-4 flex items-start justify-between gap-4">
                        <div>
                            <DialogPrimitive.Title className="text-lg font-semibold">
                                {title}
                            </DialogPrimitive.Title>

                            <DialogPrimitive.Description className="mt-1 text-sm text-muted-foreground">
                                {description}
                            </DialogPrimitive.Description>
                        </div>

                        <DialogPrimitive.Close asChild>
                            <IconButton
                                icon={<XIcon className="h-4 w-4" />}
                                aria-label="Close Dialog"
                            />
                        </DialogPrimitive.Close>
                    </div>

                    {children}
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
};

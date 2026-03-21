import type { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/shared/lib/cn';

type AccordionItemProps = {
    header: ReactNode;
    isOpen: boolean;
    onToggle: () => void;
    children: ReactNode;
    className?: string;
    contentClassName?: string;
};

export const AccordionItem = ({
    header,
    isOpen,
    onToggle,
    children,
    className,
    contentClassName,
}: AccordionItemProps) => {
    return (
        <div className={cn('flex flex-col gap-1', className)}>
            <button
                type="button"
                onClick={onToggle}
                className={cn(
                    'flex w-full items-center justify-between rounded-md border border-border bg-card p-3 text-left',
                    'cursor-pointer transition-colors hover:bg-muted/50',
                )}
            >
                <div className="min-w-0 flex-1">{header}</div>

                <ChevronDown
                    size={18}
                    className={cn(
                        'shrink-0 transition-transform duration-200',
                        isOpen && 'rotate-180',
                    )}
                />
            </button>

            <div
                className={cn(
                    'overflow-hidden transition-all duration-300',
                    isOpen ? 'max-h-500 opacity-100' : 'max-h-0 opacity-0',
                    contentClassName,
                )}
            >
                {children}
            </div>
        </div>
    );
};

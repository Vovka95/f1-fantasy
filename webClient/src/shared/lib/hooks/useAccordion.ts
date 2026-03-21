import { useState } from 'react';

type UseAccordionParams<T> = {
    defaultOpenItems?: T[];
    type?: 'single' | 'multiple';
};

export const useAccordion = <T>({
    defaultOpenItems = [],
    type = 'multiple',
}: UseAccordionParams<T> = {}) => {
    const [openItems, setOpenItems] = useState<Set<T>>(
        () => new Set(defaultOpenItems),
    );

    const isOpen = (item: T) => openItems.has(item);

    const toggle = (item: T) => {
        setOpenItems((prev) => {
            const next = new Set(prev);

            if (type === 'single') {
                if (next.has(item)) {
                    return new Set();
                }
                return new Set([item]);
            }

            if (next.has(item)) {
                next.delete(item);
            } else {
                next.add(item);
            }

            return next;
        });
    };

    const open = (item: T) => {
        setOpenItems((prev) => new Set(prev).add(item));
    };

    const close = (item: T) => {
        setOpenItems((prev) => {
            const next = new Set(prev);
            next.delete(item);
            return next;
        });
    };

    const reset = () => setOpenItems(new Set());

    return {
        openItems,
        isOpen,
        toggle,
        open,
        close,
        reset,
    };
};

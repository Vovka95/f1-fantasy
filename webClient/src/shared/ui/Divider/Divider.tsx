import { cn } from '@/shared/lib/cn';

type DividerProps = {
    orientation?: 'horizontal' | 'vertical';
    className?: string;
};

export const Divider = ({
    orientation = 'horizontal',
    className,
}: DividerProps) => {
    if (orientation === 'vertical') {
        return <div className={cn('w-px h-full bg-border', className)} />;
    }

    return <div className={cn('h-px w-full bg-border', className)} />;
};

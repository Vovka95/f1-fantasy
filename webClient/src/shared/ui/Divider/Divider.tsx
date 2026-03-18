type DividerProps = {
    orientation?: 'horizontal' | 'vertical';
    className?: string;
};

export const Divider = ({
    orientation = 'horizontal',
    className,
}: DividerProps) => {
    if (orientation === 'vertical') {
        return <div className={`w-px h-full bg-border ${className}`} />;
    }

    return <div className={`h-px w-full bg-border ${className}`} />;
};

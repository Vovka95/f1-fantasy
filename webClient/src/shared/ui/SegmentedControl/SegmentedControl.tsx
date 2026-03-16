import { cn } from '@/shared/lib/cn';
import { Button } from '../Button';

type SegmentedOption<T extends string> = {
    value: T;
    label: string;
    icon?: React.ReactNode;
};

type SegmentedControlProps<T extends string> = {
    value: T;
    onValueChange: (value: T) => void;
    options: SegmentedOption<T>[];
    className?: string;
};

export const SegmentedControl = <T extends string>({
    value,
    onValueChange,
    options,
    className,
}: SegmentedControlProps<T>) => {
    return (
        <div
            className={cn(
                'inline-flex rounded-full bg-zinc-200 p-1 gap-2',
                className,
            )}
        >
            {options.map((option) => {
                const isActive = option.value === value;

                return (
                    <Button
                        key={option.value}
                        onClick={() => onValueChange(option.value)}
                        variant={isActive ? 'primary' : 'secondary'}
                        className="px-5 rounded-full tracking-wide transition-colors"
                        leftIcon={option.icon}
                    >
                        {option.label}
                    </Button>
                );
            })}
        </div>
    );
};

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

type SelectOption = {
    value: string;
    label: string;
    disabled?: boolean;
};

type SelectProps = {
    value?: string;
    defaultValue?: string;
    onValueChange?: (value: string) => void;
    options: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    triggerClassName?: string;
    contentClassName?: string;
};

export const Select = React.forwardRef<
    React.ComponentRef<typeof SelectPrimitive.Trigger>,
    SelectProps
>(
    (
        {
            value,
            defaultValue,
            onValueChange,
            options,
            placeholder = 'Select option',
            disabled,
            className,
            triggerClassName,
            contentClassName,
        },
        ref,
    ) => {
        return (
            <SelectPrimitive.Root
                value={value}
                defaultValue={defaultValue}
                onValueChange={onValueChange}
                disabled={disabled}
            >
                <SelectPrimitive.Trigger
                    ref={ref}
                    className={cn(
                        'inline-flex h-10 w-full items-center justify-between gap-2 rounded-md border border-zinc-700 bg-zinc-900 px-3 text-sm text-zinc-100 outline-none transition',
                        'placeholder:text-zinc-400',
                        'focus:border-zinc-500 focus:ring-2 focus:ring-zinc-700',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        triggerClassName,
                        className,
                    )}
                    aria-label={placeholder}
                >
                    <SelectPrimitive.Value placeholder={placeholder} />
                    <SelectPrimitive.Icon className="shrink-0 text-zinc-400">
                        <ChevronDownIcon />
                    </SelectPrimitive.Icon>
                </SelectPrimitive.Trigger>

                <SelectPrimitive.Portal>
                    <SelectPrimitive.Content
                        position="popper"
                        sideOffset={6}
                        className={cn(
                            'z-50 min-w-(--radix-select-trigger-width) overflow-hidden rounded-md border border-zinc-800 bg-zinc-950 shadow-lg',
                            contentClassName,
                        )}
                    >
                        <SelectPrimitive.ScrollUpButton className="flex h-8 items-center justify-center bg-zinc-950 text-zinc-400">
                            <ChevronUpIcon />
                        </SelectPrimitive.ScrollUpButton>

                        <SelectPrimitive.Viewport className="p-1">
                            {options.map((option) => (
                                <SelectPrimitive.Item
                                    key={option.value}
                                    value={option.value}
                                    disabled={option.disabled}
                                    className={cn(
                                        'relative flex h-9 cursor-pointer select-none items-center rounded-sm py-2 pl-8 pr-3 text-sm text-zinc-100 outline-none',
                                        'focus:bg-zinc-800',
                                        'data-disabled:pointer-events-none data-disabled:opacity-50',
                                    )}
                                >
                                    <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex w-4 items-center justify-center">
                                        <CheckIcon />
                                    </SelectPrimitive.ItemIndicator>

                                    <SelectPrimitive.ItemText>
                                        {option.label}
                                    </SelectPrimitive.ItemText>
                                </SelectPrimitive.Item>
                            ))}
                        </SelectPrimitive.Viewport>

                        <SelectPrimitive.ScrollDownButton className="flex h-8 items-center justify-center bg-zinc-950 text-zinc-400">
                            <ChevronUpIcon className="rotate-180" />
                        </SelectPrimitive.ScrollDownButton>
                    </SelectPrimitive.Content>
                </SelectPrimitive.Portal>
            </SelectPrimitive.Root>
        );
    },
);

Select.displayName = 'Select';

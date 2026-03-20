import { PlusIcon } from 'lucide-react';

import type { PlayerPositionNameType } from '@/entities/player';

import { IconButton } from '@/shared/ui';

import type { BuildTeamEmptySlotActionModel } from '../../model';

import { cn } from '@/shared/lib/cn';

type BuildTeamPlayerEmptyCardProps = BuildTeamEmptySlotActionModel & {
    title: string;
    playerPositionType: PlayerPositionNameType;
    className?: string;
};

export const BuildTeamPlayerEmptyCard = ({
    title,
    playerPositionType,
    onEmptySlotClick,
    className,
}: BuildTeamPlayerEmptyCardProps) => {
    return (
        <div
            className={cn(
                'flex w-full max-w-40 flex-col overflow-hidden rounded-xl border border-dashed border-zinc-700',
                className,
            )}
        >
            <div
                className={cn(
                    'flex aspect-video w-full items-center justify-center',
                    playerPositionType === 'CONSTRUCTOR' && 'aspect-21/9',
                )}
            >
                <IconButton
                    icon={<PlusIcon />}
                    onClick={() => onEmptySlotClick?.(playerPositionType)}
                    aria-label="Add player"
                    className="bg-card"
                />
            </div>

            <div className="flex flex-1 flex-col items-center justify-center px-2 py-5 text-zinc-500">
                <div className="min-w-0">
                    <div className="truncate text-sm font-semibold pt-2">
                        {title}
                    </div>
                </div>
            </div>
        </div>
    );
};

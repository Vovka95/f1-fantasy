import { PlusIcon } from 'lucide-react';

import type { PlayerPosition } from '@/entities/player';

import { IconButton } from '@/shared/ui';
import { cn } from '@/shared/lib/cn';

type BuildTeamPlayerEmptyCardProps = {
    title: string;
    playerPositionType: PlayerPosition;
    onClick?: (playerPositionType: PlayerPosition) => void;
    className?: string;
};

export const BuildTeamPlayerEmptyCard = ({
    title,
    playerPositionType,
    onClick,
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
                    onClick={() => onClick?.(playerPositionType)}
                    aria-label="Add player"
                    className="bg-card"
                />
            </div>

            <div className="flex flex-1 items-center justify-center px-2 py-2 text-zinc-500">
                <span className="text-xs font-semibold">{title}</span>
            </div>
        </div>
    );
};

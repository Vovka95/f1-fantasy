import { PlusIcon } from 'lucide-react';

import type { PlayerPreview } from '@/entities/player';

import { IconButton } from '@/shared/ui';

import { cn } from '@/shared/lib/cn';

type PlayerTableRowProps = {
    player: PlayerPreview;
    onAddPlayer?: (player: PlayerPreview) => void;
    selectedPlayersSet: Set<string>;
    remainingBudget: number;
};

export const PlayerTableRow = ({
    player,
    onAddPlayer,
    selectedPlayersSet,
    remainingBudget,
}: PlayerTableRowProps) => {
    const isAffordable = player.value <= remainingBudget;
    const isSelected = selectedPlayersSet.has(player.id);

    const gridClass =
        'grid grid-cols-[minmax(0,1fr)_60px_60px_44px] gap-3 items-center lg:grid-cols-[88px_minmax(0,1fr)_70px_70px_70px_52px] md:gap-4';

    return (
        <div className={cn(gridClass, 'border-b py-3')}>
            <div
                className={cn(
                    'hidden lg:block rounded-md bg-zinc-300',
                    'relative aspect-video w-full overflow-hidden',
                    player.positionName === 'CONSTRUCTOR' && 'aspect-21/9',
                )}
            >
                {player.imageUrl && (
                    <img
                        src={player.imageUrl}
                        className={cn('w-full h-full object-cover')}
                    />
                )}
            </div>

            <div className="min-w-0">
                <p className="truncate text-md font-semibold">
                    {player.shortName}
                </p>
                {player.shortName !== player.teamName && (
                    <p className="truncate text-xs text-zinc-500">
                        {player.teamName}
                    </p>
                )}
            </div>

            <div className="hidden lg:block text-center font-semibold">
                {player.selectedPercentage.toFixed(1)}%
            </div>

            <div className="text-center font-semibold">
                {player.overallPoints}
            </div>

            <div className="text-center ">
                <p className="font-semibold">${player.value.toFixed(1)}</p>
            </div>

            <IconButton
                variant="primary"
                onClick={() => onAddPlayer?.(player)}
                disabled={isSelected || !player.isActive || !isAffordable}
                aria-label="Add Player"
                icon={<PlusIcon />}
            />
        </div>
    );
};

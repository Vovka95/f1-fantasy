import type { FantasyTeamPlayer } from '@/entities/fantasy-team/api/fantasy-team-response.type';
import type { PlayerPreview } from '../model/player.type';
import { cn } from '@/shared/lib/cn';

type PlayerPreviewCardProps = {
    player: PlayerPreview;
    info: FantasyTeamPlayer;
    onClick?: (player: PlayerPreview) => void;
    className?: string;
};

const formatMillions = (value: number) => `$${value.toFixed(1)}M`;

export const PlayerPreviewCard = ({
    player,
    info,
    onClick,
    className,
}: PlayerPreviewCardProps) => {
    const isClickable = Boolean(onClick);

    return (
        <button
            type="button"
            onClick={() => onClick?.(player)}
            disabled={!isClickable}
            className={cn(
                'group flex w-full max-w-40 flex-col overflow-hidden rounded-xl text-left transition',
                isClickable &&
                    'cursor-pointer hover:border-zinc-700 hover:bg-zinc-850 focus:outline-none focus:ring-2 focus:ring-red-500/60',
                !isClickable && 'cursor-default',
                info.iscaptain && 'border border-black/70',
                className,
            )}
        >
            <div
                className={cn(
                    'relative aspect-video w-full overflow-hidden',
                    player.positionName === 'CONSTRUCTOR' && 'aspect-21/9',
                )}
            >
                <img
                    src={player.imageUrl ?? ''}
                    alt={player.name}
                    className="h-full w-full object-cover object-top"
                />

                {!player.isActive && (
                    <div className="absolute right-2 top-2 rounded-md bg-black/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                        Inactive
                    </div>
                )}

                {Boolean(info.iscaptain) && (
                    <div className="absolute left-2 top-2 rounded-md bg-black/70 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                        2X
                    </div>
                )}
            </div>

            <div className="flex flex-1 flex-col gap-2 bg-white px-2 py-2 text-zinc-900">
                <div className="min-w-0">
                    <div className="truncate text-sm font-semibold uppercase leading-none">
                        {player.shortName}
                    </div>
                </div>

                <div className="flex items-center justify-between gap-2 border-t border-zinc-200 pt-2">
                    <div className="text-xs font-semibold">
                        {formatMillions(player.value)}
                    </div>

                    <div className="text-sm font-semibold">
                        {player.overallPoints ?? '-'}
                    </div>
                </div>
            </div>
        </button>
    );
};

export default PlayerPreviewCard;

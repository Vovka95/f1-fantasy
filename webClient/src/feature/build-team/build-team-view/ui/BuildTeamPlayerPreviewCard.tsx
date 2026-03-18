import { XIcon } from 'lucide-react';

import { PlayerPreviewCard } from '@/entities/player';
import type { TeamPlayer } from '@/entities/fantasy-team';

import { IconButton } from '@/shared/ui';

import type { BuildTeamPlayerPreviewCardModel } from '../model/build-team-view.types';

type BuildTeamPlayerPreviewCardProps = BuildTeamPlayerPreviewCardModel & {
    player: TeamPlayer;
};

export const BuildTeamPlayerPreviewCard = ({
    player,
    onCaptainChange,
    onRemovePlayer,
    mode,
}: BuildTeamPlayerPreviewCardProps) => {
    const isEditable = mode === 'editable' && onCaptainChange;
    const isRemovable = mode === 'editable' && onRemovePlayer;

    return (
        <div className="relative group">
            <PlayerPreviewCard
                onClick={isEditable ? () => onCaptainChange(player) : undefined}
                player={player.preview}
                info={player.raceInfo}
                className="max-w-none"
            />
            {isRemovable && (
                <IconButton
                    onClick={() => onRemovePlayer(player)}
                    size="xs"
                    icon={<XIcon size={18} />}
                    aria-label="Remove Player"
                    className="bg-card rounded-md h-6 w-6 cursor-pointer absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                />
            )}
        </div>
    );
};

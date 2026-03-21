import { FantasyTeamLineup } from './FantasyTeamLineup';
import { FantasyTeamSummary } from './FantasyTeamSummary';

import type { FantasyTeamViewModel } from '../model';
import type { PlayerPreview } from '@/entities/player';

type FantasyTeamCardProps = FantasyTeamViewModel & {
    onClick?: (player: PlayerPreview) => void;
};

export const FantasyTeamCard = ({
    players,
    summary,
    onClick,
}: FantasyTeamCardProps) => {
    return (
        <div className="grid grid-cols-[minmax(0,1fr)_200px] gap-6 p-3 rounded-md">
            <FantasyTeamLineup players={players} onClick={onClick} />
            <FantasyTeamSummary summary={summary} />
        </div>
    );
};

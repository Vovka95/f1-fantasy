import { FantasyTeamLineup } from './FantasyTeamLineup';
import { FantasyTeamSummary } from './FantasyTeamSummary';

import type { FantasyTeamViewModel } from '../model';

export const FantasyTeamCard = ({ players, summary }: FantasyTeamViewModel) => {
    return (
        <div className="grid grid-cols-[minmax(0,1fr)_200px] gap-6 p-3 rounded-md">
            <FantasyTeamLineup players={players} />
            <FantasyTeamSummary summary={summary} />
        </div>
    );
};

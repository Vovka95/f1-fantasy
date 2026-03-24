import type { PlayerPreview } from '@/entities/player';
import type { LeaderboardUserTeam } from '../api/leaderboard-response.type';
import { LeaderboardHeader } from './LeaderboardHeader';
import { LeaderboardRow } from './LeaderboardRow';

type LeaderboardListProps = {
    teams: LeaderboardUserTeam[];
    playersPreview: PlayerPreview[];
    selectedUserId?: string;
    onClick: (userId: string) => void;
};

export const LeaderboardList = ({
    teams,
    playersPreview,
    selectedUserId,
    onClick,
}: LeaderboardListProps) => {
    return (
        <div className="flex flex-col gap-2 min-h-0 w-full rounded-md bg-card overflow-hidden">
            <LeaderboardHeader />

            <div className="flex flex-1 flex-col min-h-0 overflow-auto">
                {teams.map((team) => (
                    <LeaderboardRow
                        key={team.user_guid}
                        team={team}
                        playersPreview={playersPreview}
                        isHighlighted={team.user_guid === selectedUserId}
                        onClick={onClick}
                    />
                ))}
            </div>
        </div>
    );
};

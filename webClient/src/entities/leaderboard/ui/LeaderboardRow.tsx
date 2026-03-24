import { ChevronRightIcon } from 'lucide-react';
import type { LeaderboardUserTeam } from '../api/leaderboard-response.type';
import { TeamIcons } from './TeamIcons';
import { TrendIndicator } from './TrendIndicator';
import type { PlayerPreview } from '@/entities/player';

type LeaderboardRowProps = {
    team: LeaderboardUserTeam;
    playersPreview: PlayerPreview[];
    isHighlighted?: boolean;
    onClick: (userId: string) => void;
};

export const LeaderboardRow = ({
    team,
    playersPreview,
    isHighlighted,
    onClick,
}: LeaderboardRowProps) => {
    const teamName = decodeURIComponent(team.team_name);

    return (
        <div
            className={`
                grid grid-cols-[12fr_38fr_10fr_35fr_5fr]
                px-4 py-3
                border-b border-border
                transition
                ${isHighlighted ? 'bg-muted' : 'hover:bg-muted/50'}
            `}
            onClick={() => onClick(team.user_guid)}
        >
            <div className="flex items-center gap-2">
                <span className="font-semibold">{team.cur_rank}</span>

                <TrendIndicator trend={team.trend} />
            </div>

            <div className="flex flex-col truncate">
                <span className="font-medium truncate">{teamName}</span>
                <span className="text-xs text-muted-fg truncate">
                    {team.user_name}
                </span>
            </div>

            <div className="flex items-center justify-center font-semibold">
                {team.cur_points}
            </div>

            <div className="flex items-center justify-end gap-2 ml-6">
                <TeamIcons
                    ids={team.user_team}
                    playersPreview={playersPreview}
                />
            </div>

            <div className="flex items-center justify-center">
                <ChevronRightIcon size={16} />
            </div>
        </div>
    );
};

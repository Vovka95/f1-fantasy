import { useEffect } from 'react';

import { type PlayerPreview } from '@/entities/player';
import { type FantasyUserTeam } from '@/entities/fantasy-team';
import type { TeamOwnerType } from '@/feature/team-owner-switch';

import { TeamBuilderAction } from './TeamBuilderActions';
import { SelectedTeamPreview } from './SelectedTeamPreview';
import { TeamBuilderSelect } from './TeamBuilderSelect';

import { useGeneratedTeamBuilderStore } from '../../model';

type TeamBuilderFormProps = {
    userId: TeamOwnerType;
    playersPreview: PlayerPreview[];
    fantasyUserTeam: FantasyUserTeam;
};

export const TeamBuilderForm = ({
    userId,
    playersPreview,
    fantasyUserTeam,
}: TeamBuilderFormProps) => {
    const setInitialBudget = useGeneratedTeamBuilderStore(
        (state) => state.setInitialBudget,
    );

    const setFantasyUserTeam = useGeneratedTeamBuilderStore(
        (state) => state.setFantasyUserTeam,
    );

    const initialBudget = fantasyUserTeam.team_info.maxTeambal;

    useEffect(() => {
        if (!initialBudget) return;

        setInitialBudget(userId, initialBudget);
    }, [initialBudget, userId, setInitialBudget]);

    useEffect(() => {
        setFantasyUserTeam(userId, fantasyUserTeam, playersPreview);
    }, [userId, setFantasyUserTeam]);

    return (
        <div className="flex flex-1 min-h-0 bg-card p-3 gap-2 rounded-md flex-col items-center">
            <SelectedTeamPreview userId={userId} />

            <TeamBuilderAction userId={userId} />

            <TeamBuilderSelect
                userId={userId}
                playersPreview={playersPreview}
            />
        </div>
    );
};

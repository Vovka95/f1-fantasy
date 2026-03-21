import { useNavigate } from 'react-router-dom';

import { FantasyTeamCard } from '@/entities/fantasy-team';

import { Button, FullPageLoader } from '@/shared/ui';

import { useHomePage } from '../model/useHomePage';

export const HomePage = () => {
    const navigate = useNavigate();
    const { isLoading, teamViews, activeRaceWeekId } = useHomePage();

    if (isLoading) {
        return <FullPageLoader />;
    }

    const onManageTeamClick = () => {
        navigate('/manage-team');
    };

    return (
        <div className="flex flex-col gap-4 w-full items-center">
            <div className="w-full max-w-400 p-3">
                <div className="w-full border border-border rounded-md bg-card p-3 flex justify-between items-center">
                    <h1 className="text-xl font-black leading-none">
                        Round {activeRaceWeekId}
                    </h1>
                    <Button
                        variant="danger"
                        size="md"
                        onClick={onManageTeamClick}
                    >
                        Manage Teams
                    </Button>
                </div>
            </div>
            <div className="flex gap-4 max-w-400">
                {teamViews.map((team) => (
                    <FantasyTeamCard
                        key={team.id}
                        id={team.id}
                        players={team.players}
                        summary={team.summary}
                    />
                ))}
            </div>
        </div>
    );
};

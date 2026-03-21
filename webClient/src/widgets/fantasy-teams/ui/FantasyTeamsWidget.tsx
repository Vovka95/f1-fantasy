import {
    FantasyTeamCard,
    type FantasyTeamViewModel,
} from '@/entities/fantasy-team';

type FantasyTeamsWidgetProps = {
    teamViews: FantasyTeamViewModel[];
    type?: 'overall' | 'grandprix';
};

export const FantasyTeamsWidget = ({
    teamViews,
    type = 'overall',
}: FantasyTeamsWidgetProps) => {
    return (
        <div className="flex gap-4">
            {teamViews.map((team) => (
                <FantasyTeamCard
                    key={team.id}
                    id={team.id}
                    players={team.players}
                    summary={team.summary}
                    type={type}
                />
            ))}
        </div>
    );
};

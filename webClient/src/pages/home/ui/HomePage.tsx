import { FantasyTeamsWidget } from '@/widgets/fantasy-teams';
import { ActiveRaceWeekWidget } from '@/widgets/active-race-week';

import { FullPageLoader } from '@/shared/ui';

import { useHomePage } from '../model/useHomePage';

export const HomePage = () => {
    const { isLoading, teamViews, activeRaceWeekId } = useHomePage();

    if (isLoading) {
        return <FullPageLoader />;
    }

    return (
        <div className="flex gap-4 w-full justify-center">
            <div className="flex flex-col w-full max-w-400 gap-4">
                <ActiveRaceWeekWidget activeRaceWeekId={activeRaceWeekId!} />
                <FantasyTeamsWidget teamViews={teamViews} />
            </div>
        </div>
    );
};

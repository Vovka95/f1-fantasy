import { useState } from 'react';

import type { TeamOwnerType } from '@/feature/team-owner-switch';

import { useFantasyTeamsComparisonChart } from '../model/useFantasyTeamComparisonChart';

import { TeamComparisonChart } from '../ui/TeamComparisonChart';
import { FullPageLoader } from '@/shared/ui';
import type { TeamComparisonChartMode } from '../model/team-comparison.types';
import { TeamComparisonModeSwitch } from '../ui/TeamComparisonModeSwitch';

type TeamComparisonProps = {
    leftUserId: TeamOwnerType;
    rightUserId: TeamOwnerType;
    raceWeeks: number[];
};

export const TeamComparison = ({
    leftUserId,
    rightUserId,
    raceWeeks,
}: TeamComparisonProps) => {
    const [mode, setMode] = useState<TeamComparisonChartMode>('totalPoints');

    const { data, leftTeamName, rightTeamName, isLoading, isError } =
        useFantasyTeamsComparisonChart({
            leftUserId,
            rightUserId,
            raceWeeks,
            mode,
        });

    if (isLoading) {
        return <FullPageLoader />;
    }

    if (isError) {
        return <div>Failed to load chart</div>;
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex items-center justify-end">
                <TeamComparisonModeSwitch
                    value={mode}
                    onValueChange={setMode}
                />
            </div>
            <TeamComparisonChart
                data={data}
                leftTeamName={leftTeamName}
                rightTeamName={rightTeamName}
                mode={mode}
            />
        </div>
    );
};

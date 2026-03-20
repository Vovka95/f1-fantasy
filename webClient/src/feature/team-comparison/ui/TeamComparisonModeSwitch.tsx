import { ActivityIcon, ArrowUpNarrowWideIcon } from 'lucide-react';

import { SegmentedControl } from '@/shared/ui';
import type { TeamComparisonChartMode } from '../model/team-comparison.types';
import { TEAM_COMPARISON_CHART_MODE_LABELS } from '../model/team-comparison.constants';

type TeamComparisonModeSwitchProps = {
    value: TeamComparisonChartMode;
    onValueChange: (value: TeamComparisonChartMode) => void;
};

type TeamOwnerSwitchOptionType = {
    value: TeamComparisonChartMode;
    label: string;
    icon?: React.ReactNode;
};

const options: TeamOwnerSwitchOptionType[] = [
    {
        value: 'raceRank',
        label: TEAM_COMPARISON_CHART_MODE_LABELS.raceRank,
        icon: <ActivityIcon />,
    },
    {
        value: 'totalRank',
        label: TEAM_COMPARISON_CHART_MODE_LABELS.totalRank,
        icon: <ArrowUpNarrowWideIcon />,
    },
    {
        value: 'racePoints',
        label: TEAM_COMPARISON_CHART_MODE_LABELS.racePoints,
        icon: <ActivityIcon />,
    },
    {
        value: 'totalPoints',
        label: TEAM_COMPARISON_CHART_MODE_LABELS.totalPoints,
        icon: <ArrowUpNarrowWideIcon />,
    },
];

export const TeamComparisonModeSwitch = ({
    value,
    onValueChange,
}: TeamComparisonModeSwitchProps) => {
    return (
        <SegmentedControl
            value={value}
            onValueChange={onValueChange}
            options={options}
        />
    );
};

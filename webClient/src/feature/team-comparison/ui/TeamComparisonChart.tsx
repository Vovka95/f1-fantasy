import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

import type {
    TeamComparisonChartMode,
    TeamComparisonChartPoint,
} from '../model/team-comparison.types';
import { TEAM_COMPARISON_CHART_MODE_LABELS } from '../model/team-comparison.constants';
import { RaceWeekTick } from './RaceWeekTick';
import { useMemo } from 'react';

const TEAM_COLORS = {
    team1: '#FFAC1C',
    team2: '#954FC4',
};

type TeamComparisonChartProps = {
    data: TeamComparisonChartPoint[];
    leftTeamName: string;
    rightTeamName: string;
    mode: TeamComparisonChartMode;
};

const chartConfig: Record<
    TeamComparisonChartMode,
    {
        yAxis: any;
        label: string;
    }
> = {
    racePoints: {
        label: TEAM_COMPARISON_CHART_MODE_LABELS.racePoints,
        yAxis: { domain: [0, 'auto'] },
    },
    totalPoints: {
        label: TEAM_COMPARISON_CHART_MODE_LABELS.totalPoints,
        yAxis: { domain: [0, 'auto'] },
    },
    raceRank: {
        label: TEAM_COMPARISON_CHART_MODE_LABELS.raceRank,
        yAxis: {
            domain: [1, 100],
            reversed: true,
            allowDecimals: false,
        },
    },
    totalRank: {
        label: TEAM_COMPARISON_CHART_MODE_LABELS.totalRank,
        yAxis: {
            domain: [1, 1000],
            reversed: true,
            allowDecimals: false,
        },
    },
};

export const TeamComparisonChart = ({
    data,
    leftTeamName,
    rightTeamName,
    mode,
}: TeamComparisonChartProps) => {
    const lineType = 'monotone';

    const raceWeekMap = useMemo(() => {
        return new Map(data.map((item) => [item.raceWeek, item]));
    }, [data]);

    return (
        <div className="w-full h-90 flex flex-col gap-4 rounded-xl border border-border bg-card p-4">
            <div className="mb-4">
                <h2 className="text-lg font-semibold text-fg">
                    {chartConfig[mode].label}
                </h2>
            </div>

            <ResponsiveContainer className="flex-1">
                <LineChart data={data} margin={{ right: 10, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="raceWeek"
                        interval={0}
                        height={42}
                        tick={(props) => (
                            <RaceWeekTick
                                {...props}
                                raceWeekMap={raceWeekMap}
                            />
                        )}
                    />
                    <YAxis {...chartConfig[mode].yAxis} />
                    <Tooltip
                        formatter={(value, name) => [
                            value,
                            name === 'team1Points'
                                ? leftTeamName
                                : rightTeamName,
                        ]}
                        labelFormatter={(label) => `Race week ${label}`}
                    />
                    <Legend
                        formatter={(value) => {
                            if (value === 'team1Points') {
                                return leftTeamName;
                            }

                            if (value === 'team2Points') {
                                return rightTeamName;
                            }

                            return value;
                        }}
                    />
                    <Line
                        type={lineType}
                        dataKey="team1Points"
                        stroke={TEAM_COLORS.team1}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                    <Line
                        type={lineType}
                        dataKey="team2Points"
                        stroke={TEAM_COLORS.team2}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

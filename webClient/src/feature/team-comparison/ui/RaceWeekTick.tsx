import type { TeamComparisonChartPoint } from '../model/team-comparison.types';

type RaceWeekTickProps = {
    x?: number | string;
    y?: number | string;
    payload?: {
        value?: number;
    };
    raceWeekMap: Map<number, TeamComparisonChartPoint>;
};

export const RaceWeekTick = ({
    x = 0,
    y = 0,
    payload,
    raceWeekMap,
}: RaceWeekTickProps) => {
    const raceWeek = payload?.value;

    if (raceWeek == null) {
        return null;
    }

    const race = raceWeekMap.get(raceWeek);
    const flagImageUrl = race?.flagImageUrl;

    return (
        <g transform={`translate(${x},${y})`}>
            {flagImageUrl ? (
                <foreignObject x={-10} y={0} width={20} height={20}>
                    <img
                        src={flagImageUrl}
                        alt={`Race Week ${raceWeek}`}
                        className="h-5 w-5 rounded-full object-cover"
                    />
                </foreignObject>
            ) : (
                <text
                    x={0}
                    y={28}
                    textAnchor="middle"
                    fill="currentColor"
                    className="text-xs"
                >
                    {raceWeek === 0 ? '' : `R${raceWeek}`}
                </text>
            )}
        </g>
    );
};

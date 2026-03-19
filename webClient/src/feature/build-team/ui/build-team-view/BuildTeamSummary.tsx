import { Stat } from '@/shared/ui';

import type { BuildTeamSummaryModel } from '../../model';

import { cn } from '@/shared/lib/cn';

type BuildTeamSummaryProps = {
    summary: BuildTeamSummaryModel;
};

export const BuildTeamSummary = ({ summary }: BuildTeamSummaryProps) => {
    const {
        overallPoints,
        calculatedPoints,
        remainingBudget,
        transfersCount = 0,
        extraTransfers = 0,
        pointsWithAdditionalTransfers,
    } = summary;

    const hasPenalty = extraTransfers > 0;

    const finalPoints = pointsWithAdditionalTransfers ?? calculatedPoints;

    return (
        <div className="flex flex-1 flex-col gap-3 bg-card rounded-xl p-4 border border-border">
            <div className="flex items-end justify-between">
                <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">
                        Final Points
                    </span>

                    <span className="text-xl font-black leading-none">
                        {finalPoints}
                    </span>
                </div>

                {hasPenalty && (
                    <div className="text-right">
                        <p className="text-xs text-muted-foreground">Penalty</p>
                        <p className="text-sm font-bold text-red-500">
                            -{extraTransfers * 10}
                        </p>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
                {overallPoints !== undefined && (
                    <Stat label="Overall" value={`${overallPoints}`} />
                )}

                <Stat label="Base Score" value={`${calculatedPoints}`} />

                {remainingBudget !== undefined && (
                    <Stat label="Budget" value={`${remainingBudget}M`} />
                )}

                <Stat label="Transfers" value={`${transfersCount}`} />
            </div>

            {transfersCount > 0 && (
                <div
                    className={cn(
                        'rounded-md px-2 py-1 text-xs font-semibold',
                        hasPenalty
                            ? 'bg-red-500/10 text-red-400'
                            : 'bg-green-500/10 text-green-400',
                    )}
                >
                    {hasPenalty
                        ? `${extraTransfers} extra transfers (-${
                              extraTransfers * 10
                          } pts)`
                        : 'No transfer penalty'}
                </div>
            )}
        </div>
    );
};

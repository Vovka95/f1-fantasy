import { Stat } from '@/shared/ui';

import {
    PENALTY_FOR_EXTRA_TRANSFER,
    type BuildTeamSummaryModel,
} from '../../model';

import { cn } from '@/shared/lib/cn';

type BuildTeamSummaryProps = {
    summary: BuildTeamSummaryModel;
};

export const BuildTeamSummary = ({ summary }: BuildTeamSummaryProps) => {
    const {
        overallPoints,
        calculatedPoints,
        budget,
        remainingBudget,
        transfersCount = 0,
        extraTransfers = 0,
        pointsWithAdditionalTransfers,
    } = summary;

    const hasPenalty = extraTransfers > 0;

    const finalPoints = pointsWithAdditionalTransfers ?? calculatedPoints;

    return (
        <div className="flex flex-1 flex-col gap-3">
            {overallPoints && budget && (
                <div className="flex items-end justify-between bg-card rounded-xl p-4 border border-border">
                    <div className="flex flex-col">
                        <span className="text-xs text-muted-fg">
                            Overall Points
                        </span>

                        <span className="text-xl font-black leading-none">
                            {overallPoints}
                        </span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-xs text-muted-fg">Budget</span>

                        <span className="text-xl font-black leading-none">
                            {budget}M
                        </span>
                    </div>
                </div>
            )}

            <div className="flex flex-1 flex-col gap-3 bg-card rounded-xl p-4 border border-border">
                <div className="grid grid-cols-2 gap-2 text-xs">
                    {finalPoints !== undefined && (
                        <Stat label="Final Score" value={`${finalPoints}`} />
                    )}

                    <Stat label="Base Score" value={`${calculatedPoints}`} />

                    {hasPenalty && (
                        <div className="text-left">
                            <p className="text-xs text-muted-foreground">
                                Penalty
                            </p>
                            <p className="text-xs font-bold text-red-500">
                                -{extraTransfers * PENALTY_FOR_EXTRA_TRANSFER}
                            </p>
                        </div>
                    )}

                    {hasPenalty && <div />}

                    {remainingBudget !== undefined && (
                        <Stat label="Balance" value={`${remainingBudget}M`} />
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
                                  extraTransfers * PENALTY_FOR_EXTRA_TRANSFER
                              } pts)`
                            : 'No transfer penalty'}
                    </div>
                )}
            </div>
        </div>
    );
};

import type { BuildTeamSummaryModel } from '../model';

type BuildTeamSummaryProps = {
    summary: BuildTeamSummaryModel;
};

export const BuildTeamSummary = ({ summary }: BuildTeamSummaryProps) => {
    const { overallPoints, calculatedPoints, remainingBudget } = summary;

    return (
        <div className="flex-1 bg-card rounded-md text-sm font-extrabold p-2">
            {overallPoints && <p>Overall Points: {overallPoints} pts.</p>}
            <p>Calculated Score: {calculatedPoints} pts.</p>
            {remainingBudget && <p>Remaining budget: {remainingBudget}M</p>}
        </div>
    );
};

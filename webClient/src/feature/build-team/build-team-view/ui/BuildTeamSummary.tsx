import type { BuildTeamSummaryModel } from '../model/build-team-view.types';

type BuildTeamSummaryProps = BuildTeamSummaryModel;

export const BuildTeamSummary = ({
    overallPoints,
    calculatedPoints,
    remainingBudget,
}: BuildTeamSummaryProps) => {
    return (
        <div className="w-800 bg-card rounded-md text-sm font-extrabold p-2">
            {overallPoints && <p>Overall Points: {overallPoints} pts.</p>}
            <p>Calculated Score: {calculatedPoints} pts.</p>
            {remainingBudget && <p>Remaining budget: {remainingBudget}M</p>}
        </div>
    );
};

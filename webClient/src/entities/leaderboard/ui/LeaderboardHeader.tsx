export const LeaderboardHeader = () => {
    return (
        <div className="grid grid-cols-[12fr_38fr_10fr_35fr_5fr] px-4 py-2 text-xs text-fg border-b border-border">
            <div className="flex-1">POSITION</div>
            <div className="flex-1">NAME</div>
            <div className="text-center">PTS</div>
            <div className="text-right">TEAM</div>
            <div />
        </div>
    );
};

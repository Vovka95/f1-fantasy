export const TrendIndicator = ({ trend }: { trend: number }) => {
    if (trend > 0) {
        return <span className="text-green-500 text-xs">▲</span>;
    }

    if (trend < 0) {
        return <span className="text-red-500 text-xs">▼</span>;
    }

    return <span className="text-muted text-xs">•</span>;
};

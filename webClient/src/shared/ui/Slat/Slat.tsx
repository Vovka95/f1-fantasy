export const Stat = ({ label, value }: { label: string; value: string }) => {
    return (
        <div className="flex flex-col">
            <span className="text-muted-fg">{label}</span>
            <span className="font-bold">{value}</span>
        </div>
    );
};

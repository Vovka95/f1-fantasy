export type Player = {
    id: string;
    displayName: string;
    type: 'DRIVER' | 'CONSTRUCTOR';
    teamName: string;
    price: number;
    points: number;
    selectedPercent: number;
    valueForMoney: number;
    overtakingPts: number;
};

export type PlayerPosition = 'DRIVER' | 'CONSTRUCTOR';

export type Player = {
    id: string;
    displayName: string;
    positionName: PlayerPosition;
    teamName: string;
    price: number;
    points: number;
    selectedPercent: number;
    valueForMoney: number;
    overtakingPts: number;
};

export type PlayerPreview = {
    id: string;
    name: string;
    shortName: string;
    imageUrl: string | null;
    teamName: string;
    positionName: PlayerPosition;
    value: number;
    valueChange: number;
    overallPoints: number;
    gamedayPoints?: number;
    selectedPercentage?: number;
    isActive?: boolean;
    status?: string;
};

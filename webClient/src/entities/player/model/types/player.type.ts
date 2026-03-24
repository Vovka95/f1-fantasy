import type { PlayerPositionNameType } from '../../api/players-list-response.types';

export type Player = {
    id: string;
    displayName: string;
    positionName: PlayerPositionNameType;
    teamName: string;
    price: number;
    points: number;
    selectedPercent: number;
    valueForMoney: number;
    overtakingPts: number;

    imageUrl: string;
    avatarImageUrl: string;
};

export type PlayerPreview = {
    id: string;
    name: string;
    shortName: string;
    imageUrl: string;
    avatarImageUrl: string;
    teamName: string;
    positionName: PlayerPositionNameType;
    value: number;
    valueChange: number;
    overallPoints: number;
    gamedayPoints: number;
    selectedPercentage: number;
    isActive: boolean;
    status: string;
};

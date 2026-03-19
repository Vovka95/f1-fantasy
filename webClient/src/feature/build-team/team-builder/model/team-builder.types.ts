import type { TeamPlayer } from '@/entities/fantasy-team';

export type GeneratedTeamFormState = {
    drivers: TeamPlayer[];
    constructors: TeamPlayer[];
    initialBudget: number;
};

export type GeneratedTeam = {
    id: string;
    drivers: TeamPlayer[];
    constructors: TeamPlayer[];
    calculatedPoints: number;
    remainingBudget: number;
    createdAt: number;
};

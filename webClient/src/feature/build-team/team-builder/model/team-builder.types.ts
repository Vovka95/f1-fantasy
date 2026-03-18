import type { TeamPlayer } from '@/entities/fantasy-team';

export type GeneratedTeamFormState = {
    drivers: TeamPlayer[];
    constructors: TeamPlayer[];
};

export type GeneratedTeam = {
    id: string;
    drivers: TeamPlayer[];
    constructors: TeamPlayer[];
    createdAt: number;
};

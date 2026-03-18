import type { FantasyTeamPlayer } from '@/entities/fantasy-team/api/fantasy-team-response.type';
import type { PlayerPreview } from '@/entities/player';

export type BuilderPlayer = {
    preview: PlayerPreview;
    raceInfo: FantasyTeamPlayer;
};

export type GeneratedTeamFormState = {
    drivers: BuilderPlayer[];
    constructors: BuilderPlayer[];
};

export type GeneratedTeam = {
    id: string;
    drivers: BuilderPlayer[];
    constructors: BuilderPlayer[];
    createdAt: number;
};

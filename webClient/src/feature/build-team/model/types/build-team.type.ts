import type { TeamPlayer } from '@/entities/fantasy-team';
import type { PlayerPositionNameType } from '@/entities/player';

export type BuildTeamPlayersModel = {
    drivers: TeamPlayer[];
    constructors: TeamPlayer[];
};

export type BuildTeamSummaryModel = {
    overallPoints?: number;
    calculatedPoints: number;
    remainingBudget?: number;
};

export type BuildTeamMode = 'readonly' | 'editable';

export type BuildTeamActionModel = {
    mode: BuildTeamMode;
    onRemoveTeam?: (teamId: string) => void;
    onEditTeam?: (teamId: string) => void;
};

export type BuildTeamPlayerActionModel = {
    mode: BuildTeamMode;
    onRemovePlayer?: (player: TeamPlayer) => void;
    onCaptainChange?: (player: TeamPlayer) => void;
};

export type BuildTeamEmptySlotActionModel = {
    mode: BuildTeamMode;
    onEmptySlotClick?: (playerPositionType: PlayerPositionNameType) => void;
};

export type BuildTeamViewModel = {
    id: string;
    players: BuildTeamPlayersModel;
    summary: BuildTeamSummaryModel;
};

export type UserGeneratedTeamsState = {
    form: GeneratedTeamFormState;
    teams: BuildTeamViewModel[];
    fantasyUserTeam: BuildTeamViewModel | null;
};

export type GeneratedTeamFormState = {
    id?: string;
    drivers: TeamPlayer[];
    constructors: TeamPlayer[];
    initialBudget: number;
};

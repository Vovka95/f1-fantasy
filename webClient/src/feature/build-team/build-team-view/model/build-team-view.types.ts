import type { TeamPlayer } from '@/entities/fantasy-team';
import type { PlayerPosition } from '@/entities/player';

export const MAX_DRIVERS = 5;
export const MAX_CONSTRUCTORS = 2;

export type BuildPlayersModel = {
    drivers: TeamPlayer[];
    constructors: TeamPlayer[];
};

export type BuildTeamSummaryModel = {
    overallPoints?: number;
    calculatedPoints: number;
    remainingBudget?: number;
};

export type BuildTeamPlayerPreviewCardModel = {
    mode: 'readonly' | 'editable';
    onRemovePlayer?: (player: TeamPlayer) => void;
    onCaptainChange?: (player: TeamPlayer) => void;
    onEmptySlotClick?: (playerPositionType: PlayerPosition) => void;
};

export type BuildTeamModel = BuildTeamPlayerPreviewCardModel &
    BuildPlayersModel;

export type BuildTeamViewModel = BuildTeamSummaryModel & BuildPlayersModel;

import type { TeamPlayer } from '@/entities/fantasy-team';

export type BuildPlayersModel = {
    drivers: TeamPlayer[];
    constructors: TeamPlayer[];
};

export type BuildTeamSummaryModel = {
    overallPoints?: number;
    calculatedPoints: number;
};

export type BuildTeamPlayerPreviewCardModel = {
    mode: 'readonly' | 'editable';
    onRemovePlayer?: (player: TeamPlayer) => void;
    onCaptainChange?: (player: TeamPlayer) => void;
};

export type BuildTeamModel = BuildTeamPlayerPreviewCardModel &
    BuildPlayersModel;

export type BuildTeamViewModel = BuildTeamSummaryModel & BuildPlayersModel;

import type { PlayerPreview } from '@/entities/player';
import type { FantasyTeamPlayer } from '../../api/fantasy-team-response.type';

export type TeamPlayer = {
    preview: PlayerPreview;
    raceInfo: FantasyTeamPlayer;
};

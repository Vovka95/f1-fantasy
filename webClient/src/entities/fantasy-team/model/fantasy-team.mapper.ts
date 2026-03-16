import type { FantasyTeam } from '@/entities/fantasy-team';
import type { FantasyUserTeam } from '../../player/api/fantasy-team-response.type';

export const mapFantasyTeam = (userTeam: FantasyUserTeam): FantasyTeam => {
    return userTeam;
};

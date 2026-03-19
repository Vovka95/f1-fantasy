import type { TeamOwnerType } from '@/feature/team-owner-switch';

import type { GeneratedTeamBuilderStoreState } from '../build-team.store';
import type { BuildTeamViewModel } from '../../types';

import { getUserState } from '../build-team-store.helpers';

export const getUserFantasyTeam = (
    state: GeneratedTeamBuilderStoreState,
    userId: TeamOwnerType,
): BuildTeamViewModel => {
    return getUserState(state, userId).fantasyUserTeam;
};

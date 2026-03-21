import type { TeamOwnerType } from '@/feature/team-owner-switch';

import type { GeneratedTeamBuilderStoreState } from '../build-team.store';
import type { GeneratedTeamFormState } from '../../types';
import { getUserState } from '../build-team-store.helpers';

export const getUserGeneratedTeamForm = (
    state: GeneratedTeamBuilderStoreState,
    userId: TeamOwnerType,
): GeneratedTeamFormState => {
    return getUserState(state, userId).form;
};

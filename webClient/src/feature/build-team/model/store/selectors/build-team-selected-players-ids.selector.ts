import type { TeamOwnerType } from '@/feature/team-owner-switch';

import type { GeneratedTeamBuilderStoreState } from '../build-team.store';
import { getUserGeneratedTeamForm } from './build-team-form.selector';

export const getUserSelectedPlayerIds = (
    state: GeneratedTeamBuilderStoreState,
    userId: TeamOwnerType,
) => {
    const form = getUserGeneratedTeamForm(state, userId);

    return [
        ...form.drivers.map((p) => p.preview.id),
        ...form.constructors.map((p) => p.preview.id),
    ];
};

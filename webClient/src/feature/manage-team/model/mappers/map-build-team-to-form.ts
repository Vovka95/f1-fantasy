import type { BuildTeamViewModel, GeneratedTeamFormState } from '../types';

export const mapBuildTeamFormState = (
    team: BuildTeamViewModel,
    form: GeneratedTeamFormState,
): GeneratedTeamFormState => {
    return {
        id: team.id,
        drivers: team.players.drivers,
        constructors: team.players.constructors,
        initialBudget: form.initialBudget,
    };
};

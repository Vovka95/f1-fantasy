import { nanoid } from 'nanoid';

import type { BuildTeamViewModel, GeneratedTeamFormState } from '../../model';

import { getRemainingBudget } from './team-builder-budget.selector';

const calculatePoints = (form: GeneratedTeamFormState) => {
    return [...form.drivers, ...form.constructors].reduce((a, b) => {
        const playerPoints = b.raceInfo.iscaptain
            ? b.preview.overallPoints * 2
            : b.preview.overallPoints;

        return a + playerPoints;
    }, 0);
};

export const mapFormToGeneratedTeam = (
    form: GeneratedTeamFormState,
): BuildTeamViewModel => {
    return {
        id: nanoid(),
        players: {
            drivers: form.drivers,
            constructors: form.constructors,
        },
        summary: {
            calculatedPoints: calculatePoints(form),
            remainingBudget: getRemainingBudget(form),
        },
    };
};

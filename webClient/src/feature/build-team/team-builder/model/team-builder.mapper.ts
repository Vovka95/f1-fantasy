import { nanoid } from 'nanoid';

import type {
    GeneratedTeam,
    GeneratedTeamFormState,
} from './team-builder.types';

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
): GeneratedTeam => {
    return {
        id: nanoid(),
        drivers: form.drivers,
        constructors: form.constructors,
        calculatedPoints: calculatePoints(form),
        remainingBudget: getRemainingBudget(form),
        createdAt: Date.now(),
    };
};

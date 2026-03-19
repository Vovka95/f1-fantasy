import { nanoid } from 'nanoid';

import {
    getRemainingBudget,
    type BuildTeamViewModel,
    type GeneratedTeamFormState,
} from '..';

import { calculatePoints } from './mapper.helper';

export const mapFormStateToView = (
    form: GeneratedTeamFormState,
): BuildTeamViewModel => {
    const calculatedPoints = calculatePoints([
        ...form.drivers,
        ...form.constructors,
    ]);

    return {
        id: form.id ?? nanoid(),
        players: {
            drivers: form.drivers,
            constructors: form.constructors,
        },
        summary: {
            calculatedPoints: calculatedPoints,
            remainingBudget: getRemainingBudget(form),
        },
    };
};

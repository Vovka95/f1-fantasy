import { nanoid } from 'nanoid';

import {
    getRemainingBudget,
    type BuildTeamViewModel,
    type GeneratedTeamFormState,
} from '../../model';

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
        id: form.id ?? nanoid(),
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

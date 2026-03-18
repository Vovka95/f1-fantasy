import { nanoid } from 'nanoid';
import type {
    GeneratedTeam,
    GeneratedTeamFormState,
} from './team-builder.types';

export const mapFormToGeneratedTeam = (
    form: GeneratedTeamFormState,
): GeneratedTeam => {
    return {
        id: nanoid(),
        drivers: form.drivers,
        constructors: form.constructors,
        createdAt: Date.now(),
    };
};

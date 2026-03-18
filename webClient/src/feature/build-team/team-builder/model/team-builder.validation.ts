import type { GeneratedTeamFormState } from './team-builder.types';

export const MAX_DRIVERS = 5;
export const MAX_CONSTRUCTORS = 2;

export const validateBuilder = (form: GeneratedTeamFormState) => {
    return {
        isValid:
            form.drivers.length === MAX_DRIVERS &&
            form.constructors.length === MAX_CONSTRUCTORS,
    };
};

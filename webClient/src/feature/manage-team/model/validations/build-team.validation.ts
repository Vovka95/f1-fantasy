import { MAX_CONSTRUCTORS, MAX_DRIVERS } from '../constants';
import type { GeneratedTeamFormState } from '../types';

export const validateBuilder = (form: GeneratedTeamFormState) => {
    return {
        isValid:
            form.drivers.length === MAX_DRIVERS &&
            form.constructors.length === MAX_CONSTRUCTORS,
    };
};

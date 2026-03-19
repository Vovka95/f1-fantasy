import { nanoid } from 'nanoid';

import type { FantasyUserTeam } from '@/entities/fantasy-team';

import { calculatePoints, calculateTransfersCount } from './mapper.helper';
import type { BuildTeamViewModel, GeneratedTeamFormState } from '../types';
import {
    MAX_ALLOWED_TRANSFERS,
    PENALTY_FOR_EXTRA_TRANSFER,
} from '../constants';
import { getRemainingBudget } from '../store';

export const mapFormStateToView = (
    fantasyUserTeam: FantasyUserTeam | null,
    userBuildTeam: BuildTeamViewModel | null,
    form: GeneratedTeamFormState,
): BuildTeamViewModel => {
    const players = [...form.drivers, ...form.constructors];

    const calculatedPoints = calculatePoints(players);
    const transfersCount = calculateTransfersCount(userBuildTeam, form);

    const freeTransfers = fantasyUserTeam?.subsallowed ?? MAX_ALLOWED_TRANSFERS;
    const extraTransfers = Math.max(0, transfersCount - freeTransfers);

    const penaltyPerTransfer =
        fantasyUserTeam?.extrasubscost ?? PENALTY_FOR_EXTRA_TRANSFER;
    const penalty = extraTransfers * penaltyPerTransfer;

    const pointsWithAdditionalTransfers = calculatedPoints - penalty;

    return {
        id: form.id ?? nanoid(),
        players: {
            drivers: form.drivers,
            constructors: form.constructors,
        },
        summary: {
            calculatedPoints: calculatedPoints,
            remainingBudget: getRemainingBudget(form),
            transfersCount,
            extraTransfers,
            pointsWithAdditionalTransfers,
        },
    };
};

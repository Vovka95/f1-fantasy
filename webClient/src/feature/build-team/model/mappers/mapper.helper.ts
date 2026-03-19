import type { TeamPlayer } from '@/entities/fantasy-team';
import type { BuildTeamViewModel, GeneratedTeamFormState } from '../types';

export const calculatePoints = (players: TeamPlayer[]) => {
    return [...players].reduce((a, b) => {
        const playerPoints = b.raceInfo.iscaptain
            ? b.preview.overallPoints * 2
            : b.preview.overallPoints;

        return a + playerPoints;
    }, 0);
};

export const calculateTransfersCount = (
    baseTeam: BuildTeamViewModel | null,
    form: GeneratedTeamFormState,
): number => {
    if (!baseTeam) return 0;

    const baseIds = new Set([
        ...baseTeam.players.drivers.map((p) => p.preview.id),
        ...baseTeam.players.constructors.map((p) => p.preview.id),
    ]);

    const currentIds = new Set([
        ...form.drivers.map((p) => p.preview.id),
        ...form.constructors.map((p) => p.preview.id),
    ]);

    let changes = 0;

    for (const id of currentIds) {
        if (!baseIds.has(id)) {
            changes++;
        }
    }

    return changes;
};

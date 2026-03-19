import type { TeamPlayer } from '@/entities/fantasy-team';

export const calculatePoints = (players: TeamPlayer[]) => {
    return [...players].reduce((a, b) => {
        const playerPoints = b.raceInfo.iscaptain
            ? b.preview.overallPoints * 2
            : b.preview.overallPoints;

        return a + playerPoints;
    }, 0);
};

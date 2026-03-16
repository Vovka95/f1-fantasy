export const qk = {
    health: () => ['health'] as const,
    sessionStatus: () => ['session', 'status'] as const,
    f1: {
        all: ['f1'] as const,
        me: (userId: string) => [...qk.f1.all, , 'me', userId] as const,
        playersList: (raceWeek: number) =>
            [...qk.f1.all, , 'players', raceWeek] as const,
        fantasyTeam: (userId: string, raceWeek: number) =>
            [...qk.f1.all, , 'fantasy-team', userId, raceWeek] as const,
    },
};

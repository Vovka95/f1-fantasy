export const qk = {
    health: () => ['health'] as const,
    sessionStatus: () => ['session', 'status'] as const,
    f1: {
        all: ['f1'] as const,
        me: (userId: string) => [...qk.f1.all, , 'me', userId] as const,
        playersList: (raceWeek: number) =>
            [...qk.f1.all, , 'players', raceWeek] as const,
        fantasyTeam: (userId: string, raceWeek: number, teamNo: number) =>
            [...qk.f1.all, , 'fantasy-team', userId, raceWeek, teamNo] as const,
        userGameDays: (userId: string) =>
            [...qk.f1.all, , 'user-game-days', userId] as const,
        f1Schedule: () => [...qk.f1.all, 'f1-schedule'] as const,
        leaderboard: (leagueId: string) =>
            [...qk.f1.all, 'f1-leaderboard', leagueId] as const,
        playerStats: (playerId: string) =>
            [...qk.f1.all, 'f1-player-stats', playerId] as const,
    },
};

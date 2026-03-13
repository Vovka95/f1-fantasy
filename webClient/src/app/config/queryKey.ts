export const qk = {
    health: () => ['health'] as const,
    sessionStatus: () => ['session', 'status'] as const,
    f1: {
        all: ['f1'] as const,
        drivers: () => [...qk.f1.all, , 'drivers'] as const,
        me: (userId: string) => [...qk.f1.all, , 'me', userId] as const,
    },
};

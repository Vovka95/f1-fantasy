export const qk = {
    health: () => ['health'] as const,
    testAuth: () => ['testAuth'] as const,
    getDrivers: () => ['drivers'] as const,
    me: (userId: string) => ['me', userId] as const,
};

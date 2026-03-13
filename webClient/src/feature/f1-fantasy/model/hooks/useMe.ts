import { useQuery } from '@tanstack/react-query';

import { f1FantasyApi } from '../../api';

import { qk } from '@/app/config/queryKey';

export const useMe = (userId: string) => {
    return useQuery({
        queryKey: qk.me(userId),
        // queryFn: () => f1FantasyApi.getMe(userId),
        queryFn: () => f1FantasyApi.getMe(),
        enabled: !!userId,
        retry: false,
        staleTime: 60_000,
    });
};

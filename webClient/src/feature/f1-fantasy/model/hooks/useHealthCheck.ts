import { useQuery } from '@tanstack/react-query';

import { f1FantasyApi } from '../../api';
import { qk } from '@/app/config/queryKey';

export const useHealthCheck = (enabled: boolean = true) => {
    return useQuery({
        queryKey: qk.health(),
        queryFn: f1FantasyApi.healthCheck,
        retry: false,
        enabled,
        staleTime: 60_000,
    });
};

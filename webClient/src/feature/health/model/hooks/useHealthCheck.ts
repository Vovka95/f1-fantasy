import { useQuery } from '@tanstack/react-query';

import { healthApi } from '../../api';

import { qk } from '@/app/config/queryKey';

export const useHealthCheck = (enabled: boolean = true) => {
    return useQuery({
        queryKey: qk.health(),
        queryFn: healthApi.healthCheck,
        retry: false,
        enabled,
        staleTime: 60_000,
    });
};

import { useQuery } from '@tanstack/react-query';

import { f1FantasyApi } from '../../api';

import { qk } from '@/app/config/queryKey';

export const useDrivers = (enabled: boolean = true) => {
    return useQuery({
        queryKey: qk.f1.drivers(),
        queryFn: f1FantasyApi.getDrivers,
        retry: false,
        enabled,
        staleTime: 60_000,
    });
};

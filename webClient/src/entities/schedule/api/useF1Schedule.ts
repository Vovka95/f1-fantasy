import { useQuery } from '@tanstack/react-query';

import { getF1Schedule } from './f1-schedule.api';

import { qk } from '@/app/config/queryKey';
import { mapF1ScheduleResponse } from '../f1-schedule.mapper';

export const useF1ScheduleQuery = () => {
    return useQuery({
        queryKey: qk.f1.f1Schedule(),
        queryFn: () => getF1Schedule(),
        select: (data: Awaited<ReturnType<typeof getF1Schedule>>) =>
            mapF1ScheduleResponse(data),
        retry: false,
        enabled: true,
        staleTime: 60_000,
    });
};

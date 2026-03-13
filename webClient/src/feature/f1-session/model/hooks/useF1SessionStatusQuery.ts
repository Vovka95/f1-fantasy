import { useQuery } from '@tanstack/react-query';

import { f1SessionApi } from '../../api/f1-sessionApi';

import { useF1SessionStore } from '@/shared/store/f1-session';
import { qk } from '@/app/config/queryKey';

export const useF1SessionStatusQuery = () => {
    return useQuery({
        queryKey: qk.sessionStatus(),
        queryFn: async () => {
            const data = await f1SessionApi.getF1SessionStatus();

            useF1SessionStore.getState().setExpired(!data.isValid);
            useF1SessionStore.getState().setConfigured(!!data);

            console.log('session status', data);

            return data;
        },
        retry: false,
        refetchOnWindowFocus: true,
    });
};

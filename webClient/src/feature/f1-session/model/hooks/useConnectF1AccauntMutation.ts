import { useMutation, useQueryClient } from '@tanstack/react-query';

import { f1SessionApi } from '../../api/f1-sessionApi';

import { qk } from '@/app/config/queryKey';

export const useConnectF1AccauntMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: f1SessionApi.connectF1Accaunt,
        onSuccess: async (data) => {
            console.log('connect', data);

            await queryClient.invalidateQueries({
                queryKey: qk.sessionStatus(),
            });

            await queryClient.invalidateQueries({
                queryKey: qk.f1.all,
            });
        },
    });
};

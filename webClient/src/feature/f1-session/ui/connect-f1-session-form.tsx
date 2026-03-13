import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, FormError, FormField, Input } from '@/shared/ui';

import {
    connectF1AccauntSchema,
    useConnectF1AccauntMutation,
    type ConnectF1AccauntValues,
} from '../model';

import { cn } from '@/shared/lib/cn';

import { normalizeApiError } from '@/shared/api/error';

type ConnectF1SessionFormProps = {
    onSuccess?: () => void;
    onCancel?: () => void;
};

export const ConnectF1SessionForm = ({
    onCancel,
    onSuccess,
}: ConnectF1SessionFormProps) => {
    const connectMutation = useConnectF1AccauntMutation();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        clearErrors,
    } = useForm<ConnectF1AccauntValues>({
        resolver: zodResolver(connectF1AccauntSchema),
        defaultValues: {
            f1Fantasy007: '',
            loginSession: '',
            reese84: '',
            minUnifiedSessionToken10: '',
        },
    });

    const onSubmit = async (values: ConnectF1AccauntValues) => {
        try {
            clearErrors('root');

            await connectMutation.mutateAsync(values);

            onSuccess && onSuccess();
        } catch (error) {
            const apiError = normalizeApiError(error);

            setError('root', {
                type: 'server',
                message: Array.isArray(apiError.message)
                    ? apiError.message[0]
                    : apiError.message,
            });
        }
    };

    return (
        <form className={cn(['grid gap-4'])} onSubmit={handleSubmit(onSubmit)}>
            <FormField
                label={'F1Fantasy007'}
                htmlFor="f1Fantasy007"
                required
                error={errors.f1Fantasy007}
            >
                <Input
                    id="f1Fantasy007"
                    type="text"
                    {...register('f1Fantasy007')}
                    hasError={!!errors.f1Fantasy007}
                />
            </FormField>

            <FormField
                label={'LoginSession'}
                htmlFor="loginSession"
                required
                error={errors.loginSession}
            >
                <Input
                    id="loginSession"
                    type="text"
                    {...register('loginSession')}
                    hasError={!!errors.loginSession}
                />
            </FormField>

            <FormField
                label={'Reese84'}
                htmlFor="reese84"
                required
                error={errors.reese84}
            >
                <Input
                    id="reese84"
                    type="text"
                    {...register('reese84')}
                    hasError={!!errors.reese84}
                />
            </FormField>

            <FormField
                label={'MinUnifiedSessionToken10'}
                htmlFor="minUnifiedSessionToken10"
                required
                error={errors.minUnifiedSessionToken10}
            >
                <Input
                    id="minUnifiedSessionToken10"
                    type="text"
                    {...register('minUnifiedSessionToken10')}
                    hasError={!!errors.minUnifiedSessionToken10}
                />
            </FormField>

            {errors.root?.message && (
                <FormError message={errors.root?.message} />
            )}

            <div className="flex items-center justify-end gap-3">
                {onCancel && (
                    <Button
                        onClick={onCancel}
                        variant="secondary"
                        size="md"
                        type="button"
                        disabled={connectMutation.isPending || isSubmitting}
                        isLoading={connectMutation.isPending || isSubmitting}
                    >
                        Cancel
                    </Button>
                )}
                <Button
                    size="md"
                    type="submit"
                    disabled={connectMutation.isPending || isSubmitting}
                    isLoading={connectMutation.isPending || isSubmitting}
                >
                    Connect
                </Button>
            </div>
        </form>
    );
};

import { useDrivers, useMe } from '@/feature/f1-fantasy/model';
import { useEffect } from 'react';

export const DriversPage = () => {
    const drivers = useDrivers();
    const me = useMe('d025a628-18c6-11f1-8584-91067885f997');

    useEffect(() => {
        drivers.data && console.log('DRIVERS', drivers.data);
    }, [drivers.data]);

    useEffect(() => {
        me.data && console.log('ME', me.data);
    }, [me.data]);

    return (
        <div>
            <p>
                {me.isLoading || drivers.isLoading
                    ? 'Loading...'
                    : 'Already loaded'}
            </p>
        </div>
    );
};

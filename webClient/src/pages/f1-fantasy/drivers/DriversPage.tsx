import { useEffect } from 'react';

import { useDrivers } from '@/feature/f1-fantasy/model';

export const DriversPage = () => {
    const drivers = useDrivers();

    useEffect(() => {
        drivers.data && console.log('DRIVERS', drivers.data);
    }, [drivers.data]);

    return (
        <div>
            <p>{drivers.isLoading ? 'Loading...' : 'Drivers loaded'}</p>
        </div>
    );
};

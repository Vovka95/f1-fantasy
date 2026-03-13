import { useEffect } from 'react';

import { useMe } from '@/feature/f1-fantasy/model';

export const MePage = () => {
    const me = useMe('d025a628-18c6-11f1-8584-91067885f997');

    useEffect(() => {
        me.data && console.log('ME', me.data);
    }, [me.data]);

    return (
        <div>
            <p>{me.isLoading ? 'Loading...' : 'Me loaded'}</p>
        </div>
    );
};

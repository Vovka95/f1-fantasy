import { useHealthCheck } from '@/feature/f1-fantasy/model';

export const TestPage = () => {
    const healthQuery = useHealthCheck();

    return (
        <div>
            <h3>F1 Fantasy</h3>
            <p>{healthQuery.data}</p>
        </div>
    );
};

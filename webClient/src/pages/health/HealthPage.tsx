import { useHealthCheck } from '@/feature/health/model';

export const HealthPage = () => {
    const healthQuery = useHealthCheck();

    return (
        <div>
            <h3>F1 Fantasy</h3>
            <p>{healthQuery.data}</p>
        </div>
    );
};

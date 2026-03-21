import { useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui';

type ActiveRaceWeekWidgetProps = {
    activeRaceWeekId: number;
};

export const ActiveRaceWeekWidget = ({
    activeRaceWeekId,
}: ActiveRaceWeekWidgetProps) => {
    const navigate = useNavigate();

    const onManageTeamClick = () => {
        navigate('/manage-team');
    };

    return (
        <div className="w-full p-3">
            <div className="w-full border border-border rounded-md bg-card p-3 flex justify-between items-center">
                <h1 className="text-xl font-black leading-none">
                    Round {activeRaceWeekId}
                </h1>
                <Button variant="danger" size="md" onClick={onManageTeamClick}>
                    Manage Teams
                </Button>
            </div>
        </div>
    );
};

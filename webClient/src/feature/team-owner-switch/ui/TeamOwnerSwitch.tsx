import { VenusIcon, MarsIcon } from 'lucide-react';

import { SegmentedControl } from '@/shared/ui';

import {
    khrystynaId,
    volodymyrId,
    type TeamOwnerType,
} from '../model/team-owner.type';

export type TeamOwnerSwitchProps = {
    value: TeamOwnerType;
    onValueChange: (value: TeamOwnerType) => void;
};

type TeamOwnerSwitchOptionType = {
    value: TeamOwnerType;
    label: string;
    icon?: React.ReactNode;
};

const options: TeamOwnerSwitchOptionType[] = [
    {
        value: volodymyrId,
        label: 'vprotskyi',
        icon: <MarsIcon />,
    },
    {
        value: khrystynaId,
        label: 'Khrystyna P.',
        icon: <VenusIcon />,
    },
];

export const TeamOwnerSwitch = ({
    value,
    onValueChange,
}: TeamOwnerSwitchProps) => {
    return (
        <SegmentedControl
            className="inline-flex rounded-full bg-neutral-200 p-1"
            value={value}
            onValueChange={onValueChange}
            options={options}
        />
    );
};

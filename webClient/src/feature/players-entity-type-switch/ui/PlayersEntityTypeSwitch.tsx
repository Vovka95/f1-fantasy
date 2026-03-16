import { SegmentedControl } from '@/shared/ui';
import type { PlayersEntityType } from '../model/players-entity-type.type';

import { CarIcon, HardHatIcon } from 'lucide-react';

export type PlayersEntityTypeSwitchProps = {
    value: PlayersEntityType;
    onValueChange: (value: PlayersEntityType) => void;
};

type PlayersEntityTypeSwitchOptionType = {
    value: PlayersEntityType;
    label: string;
    icon?: React.ReactNode;
};

const options: PlayersEntityTypeSwitchOptionType[] = [
    { value: 'DRIVER' as const, label: 'Driver', icon: <HardHatIcon /> },
    { value: 'CONSTRUCTOR' as const, label: 'Constructor', icon: <CarIcon /> },
];

export const PlayersEntityTypeSwitch = ({
    value,
    onValueChange,
}: PlayersEntityTypeSwitchProps) => {
    return (
        <SegmentedControl
            className="inline-flex rounded-full bg-neutral-200 p-1"
            value={value}
            onValueChange={onValueChange}
            options={options}
        />
    );
};

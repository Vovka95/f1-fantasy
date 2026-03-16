import { Select } from '@/shared/ui';

type RaveWeekSelect = {
    value: number;
    onChange: (v: number) => void;
};

const raceWeekOptions = [
    { value: '1', label: 'Race week 1' },
    { value: '2', label: 'Race week 2' },
];

export const RaceWeekSelect = ({ value, onChange }: RaveWeekSelect) => {
    return (
        <div className="w-auto">
            <Select
                value={String(value)}
                onValueChange={(nextValue) => onChange(Number(nextValue))}
                options={raceWeekOptions}
                placeholder="Choose race week"
            />
        </div>
    );
};

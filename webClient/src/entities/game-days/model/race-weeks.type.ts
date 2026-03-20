export type RaceWeekDetailsType = {
    raceWeekId: number;
    points: number | null;
    mds: number;
    phId: number;
};

export type RaceWeeksType = {
    activeRaceWeekId: number;
    raceWeekSeries: RaceWeekDetailsType[];
};

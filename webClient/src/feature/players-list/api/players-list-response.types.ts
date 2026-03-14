type F1TimestampSet = {
    UTCTime: string;
    ISTTime: string;
    CESTTime: string;
};

type F1Meta = {
    Message: string;
    RetVal: number;
    Success: boolean;
    Timestamp: F1TimestampSet;
    StatusCode: number;
    Maintenance: string;
};

type SessionWisePoint = {
    sessionnumber: number;
    sessiontype: string;
    points: number | null;
    nonegative_points: number | null;
};

type AdditionalStats = {
    fastest_lap_pts: number;
    dotd_pts: number;
    overtaking_pts: number;
    q3_finishes_pts: number;
    top10_race_position_pts: number;
    top8_sprint_position_pts: number;
    total_position_pts: number;
    total_position_gained_lost: number;
    total_dnf_dq_pts: number;
    value_for_money: number;
};

type PlayerPosition = 'DRIVER' | 'CONSTRUCTOR';

export type PlayerResponse = {
    PlayerId: string;
    Skill: number;
    PositionName: PlayerPosition;
    Value: number;
    TeamId: string;
    FUllName: string;
    DisplayName: string;
    TeamName: string;
    Status: string;
    IsActive: string;
    DriverTLA: string;
    DriverReference: string;
    CountryName: string;
    OverallPpints: string;
    GamedayPoints: string;
    SelectedPercentage: string;
    CaptainSelectedPercentage: string;
    OldPlayerValue: number;
    BestRaceFinished: string;
    HigestGridStart: string;
    HigestChampFinish: string;
    FastestPitstopAward: string;
    BestRaceFinishCount: number;
    HighestGridStartCount: number;
    HighestChampFinishCount: number;
    FastestPitstopAwardCount: number;
    QualifyingPoints: string;
    RacePoints: string;
    SprintPoints: string;
    NoNegativePoints: string;
    F1PlayerId: string;
    FirstName: string;
    LastName: string;
    SessionWisePoints: SessionWisePoint[];
    AdditionalStats: AdditionalStats;
    old_Value: number;
    new_value: number;
    ProjectedGamedayPoints: string;
    ProjectedNoNegativePoints: string;
    ProjectedOverallPpints: string;
};

export type PlayersListResponse = {
    Data: {
        Value: PlayerResponse[];
        FeedTime: F1TimestampSet;
    };
    Meta: F1Meta;
};

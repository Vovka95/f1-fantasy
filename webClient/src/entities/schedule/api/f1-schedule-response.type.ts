import type { F1Meta } from '@/shared/model';

export type BinaryFlag = 0 | 1;
export type TernaryFlag = 0 | 1 | 2;

export type F1FantasyFixtureSessionType =
    | 'Race'
    | 'Qualifying'
    | 'Sprint Qualifying';

export type F1FantasyFixture = {
    IsFixturesAvailable: BinaryFlag;
    RaceId: number;
    GamedayId: number;
    Gameday: string;
    GameDate: string;
    TourId: number;
    PhaseId: number;
    SessionName: F1FantasyFixtureSessionType;
    SessionType: F1FantasyFixtureSessionType;
    SessionNumber: string;
    GMTOffset: string;
    Season: string;
    FOMMEETINGSESSIONKEY: string;
    GDIsLocked: BinaryFlag;
    GDIsCurrent: TernaryFlag;
    MDIsLocked: BinaryFlag;
    MDIsCurrent: TernaryFlag;
    MHIsCurrent: TernaryFlag;
    MHIsLocked: BinaryFlag;
    IsLiveFd: TernaryFlag;
    IsLive: TernaryFlag;
    MDTotalPlayers: number;
    MaxTeamPlayers: number;
    MaxTeamBalance: number;
    SubstitutionsAllowed: number;
    MaxSubstitutionsCF: number;
    SessionStartDate: string;
    SessionEndDate: string;
    SessionStartDateISO8601: string;
    SessionEndDateISO8601: string;
    MatchdayName: string;
    MatchStatus: string;
    TeamScenario: string;
    TeamScenarioStartDate: string;
    TeamScenarioEndDate: string;
    IsActiveForNewUser: BinaryFlag;
    IsPostponed: BinaryFlag;
    IsLeaderboardShow: BinaryFlag;
    CurrentGamedayId: number;
    RaceDay: number;
    MeetingId: number;
    MeetingNumber: number;
    MeetingName: string;
    MeetingOfficialName: string;
    MeetingLocation: string;
    CircuitLocation: string;
    GDStatus: number;
    CountryId: string;
    CountryName: string;
    CircuitOfficialName: string;
    IsFinalFixActive: BinaryFlag;
    NextMatchDeadline: string;
};

export type F1FantasyCircuitSessionType =
    | 'Practice'
    | 'Qualifying'
    | 'Race'
    | 'Sprint Shootout'
    | 'Sprint Qualifying';

export type F1FantasyCircuitSession = {
    id: number;
    sessionName: string;
    sessionType: F1FantasyCircuitSessionType;
    sessionNumber: number;
    sessionStartDate: string;
    sessionEndDate: string;
    gmtOffset: string | null;
    season: number;
    sessionStartDateIso8601: string;
    sessionEndDateIso8601: string;
    fomMeetingSessionKey: number;
    series: string;
    self: string;
};

export type F1FantasyCircuit = {
    MeetingId: number;
    MeetingNumber: number;
    MeetingSessions: F1FantasyCircuitSession[];
    ScheduledLapCount: string;
    ScheduledDistance: string;
    CircuitConfigId: number;
    CircuitLocation: string;
    MeetingName: string;
    MeetingOfficialName: string;
    TrackLength: string;
    FastestLapTime: string;
    FastestLapDriver: string;
    FastestLapTeam: string;
    VenueFirstSeason: string;
    MeetingLocation: string;
    CircuitShortName: string;
    CircuitOfficialName: string;
};

export type F1FantasyScheduleResponse = {
    Data: {
        fixtures: F1FantasyFixture[];
        circuit: F1FantasyCircuit[];
    };
    Meta: F1Meta;
};

import type { F1TimestampSet } from '@/shared/model';

export type PlayerStatsStat = {
    Frequency: string;
    Event: string;
    Value: number;
};

type PlayerStatsPeriod = {
    PlayerValue: number;
    OldPlayerValue: number;
    IsPlayed: number;
    IsActive: number;
    StatsWise: PlayerStatsStat[];
};

export type PlayerStatsGameday = PlayerStatsPeriod & {
    GamedayId: number;
};

export type PlayerStatsTour = PlayerStatsPeriod & {
    TourId: number;
};

type PlayerStatsRaceDay = {
    PlayerValue: number;
    OldPlayerValue: number;
    RaceDayId: number;
    DateTime: string;
    MatchStatus: string;
    MeetingLocation: string;
    MeetingNumber: number;
    MeetingName: string;
    CountryId: number;
    CountryName: string;
    CircuitOfficialName: string;
    SessionName: string;
    SessionType: string;
    SessionNumber: string;
    SessionStartDate: string;
    Season: string;
};

export type PlayerStatsFixtureRaceDay = PlayerStatsRaceDay & {
    TeamId: number;
    SelectedPercentage: string;
    CapSelectedPercentage: string;
};

export type PlayerStatsMatchRaceDay = PlayerStatsRaceDay & {
    IsPlayed: number;
    StatsWise: PlayerStatsStat[];
};

export type PlayerStatsFixture = {
    GamedayId: number;
    TourId: number;
    RaceDayWise: PlayerStatsFixtureRaceDay[];
};

export type PlayerStatsMatch = {
    GamedayId: number;
    TourId: number;
    RaceDayWise: PlayerStatsMatchRaceDay[];
};

export type PlayerStatsValue = {
    PlayerId: number;
    PlayerSkill: number;
    GamedayWiseStats: PlayerStatsGameday[];
    TourWiseStats: PlayerStatsTour[];
    FixtureWiseStats: PlayerStatsFixture[];
    MatchWiseStats: PlayerStatsMatch[];
};

export type PlayerStatsResponse = {
    Value: PlayerStatsValue;
    FeedTime: F1TimestampSet;
};

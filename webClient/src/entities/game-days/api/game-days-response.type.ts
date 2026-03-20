import type { F1Meta, F1TimestampSet } from '@/shared/model';

export type MatchdayDetailsItem = {
    mds: number;
    phId: number;
    pts: number | null;
};

export type MatchdayDetails = Record<string, MatchdayDetailsItem>;

export type BestPlayer = {
    playerid: string;
    points: number;
    playertype: 'DRIVER' | 'CONSTRUCTOR';
    skillid: number;
    gdid?: number;
};

export type RacePoints = {
    racePt: number;
    gdId: number;
    poinstDif: number;
};

export type OverallBestWeek = {
    gdid: number;
    points: number;
};

export type UserHome = {
    teanNo: number;
    ovPoints: number;
    racePoints: RacePoints;
    overallBestweek: OverallBestWeek;
    bestDriverWeek: BestPlayer[];
    bestDriverOverall: BestPlayer[];
    totalTransfer: number;
    freeTransfer: number;
    nigativeTransfer: number;
};

export type FantasyTeamOverview = {
    ftmdid: number;
    ftgdid: number;
    cugdid: number;
    cumdid: number;
    prvmdid: number;

    islastday: number;
    lastdaygdid: number;

    teamid: number;
    teamno: number;
    teamname: string;

    // boosters
    iswildcardtaken: number;
    wildcardtakengd: number;

    islimitlesstaken: number;
    limitlesstakengd: number;

    isfinalfixtaken: number;
    finalfixtakengd: number;

    isextradrstaken: number;
    extradrstakengd: number;

    isnonigativetaken: number;
    nonigativetakengd: number;

    isautopilottaken: number;
    isautopilottakengd: number;

    islateonboard: number;

    // nested
    mddetails: MatchdayDetails;
    userhome: UserHome;

    // misc
    teamcount: number;
    iswebpurifycalled: number;
    webpurifyresponse: string;
    issystemnameupd: number;
};

export type GameDaysResponse = {
    Data: {
        Value: FantasyTeamOverview[];
        FeedTime: F1TimestampSet;
    };
    Meta: F1Meta;
};

import type { F1Meta, F1TimestampSet } from '@/shared/model';

export type FantasyTeamPlayer = {
    id: string;

    isfinal: number;
    iscaptain: number;
    ismgcaptain: number;

    playerpostion: number;
};

export type FantasyTeamInfo = {
    teamBal: number;
    teamVal: number;
    maxTeambal: number;

    subsallowed: number;
    userSubsleft: number;
};

export type FantasyUserTeam = {
    gdrank: number;
    ovrank: number;

    teamno: number;
    teamname: string;

    teambal: number;
    teamval: number;

    gdpoints: number;
    ovpoints: number;

    matchday: number;

    playerid: FantasyTeamPlayer[];

    socialId: number;

    usersubs: number;
    boosterid: number;

    team_info: FantasyTeamInfo;

    fttourgdid: number;
    fttourmdid: number;

    capplayerid: string | null;
    mgcapplayerid: string | null;

    subsallowed: number;
    usersubsleft: number;
    extrasubscost: number;

    maxteambal: number;

    isaccounting: number;

    iswildcard: number | null;
    iswildcardtaken: number;
    wildcardtakengd: number | null;

    islimitlesstaken: number;
    limitlesstakengd: number | null;

    isextradrstaken: number;
    extradrstakengd: number | null;

    isfinalfixtaken: number;
    finalfixtakengd: number | null;

    isautopilottaken: number;
    autopilottakengd: number | null;

    isnonigativetaken: number;
    nonigativetakengd: number | null;

    isboostertaken: number;

    race_category: number | null;
    finalfxracecat: number | null;
    finalfxraceday: number | null;

    finalfxnewplayerid: string | null;
    finalfxoldplayerid: string | null;

    player_swap_details: unknown | null;

    is_wildcard_taken_gd_id: number | null;

    inactive_driver_penality_points: number;
};

export type FantasyTeamResponseValue = {
    mdid: number;
    retval: number;
    userTeam: FantasyUserTeam[];
};

export type FantasyTeamResponse = {
    Data: {
        Value: FantasyTeamResponseValue;
        FeedTime: F1TimestampSet;
    };
    Meta: F1Meta;
};

import type { F1TimestampSet } from '@/shared/model';

export type LeaderboardUserTeam = {
    trend: number;
    team_no: number;
    cur_rank: number;
    social_id: string;
    team_name: string;
    user_name: string;
    user_guid: string;
    user_team: string[];
    cur_points: number;
};

export type LeaderboardResponse = {
    Value: {
        leaderboard: LeaderboardUserTeam[];
    };
    FeedTime: F1TimestampSet;
};

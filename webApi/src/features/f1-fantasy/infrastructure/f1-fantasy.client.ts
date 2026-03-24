import { Injectable } from '@nestjs/common';

import {
    F1FantasyDriversInput,
    F1FantasyUserGameDaysInput,
    F1FantasyUserTeamInput,
} from '../domain/types';
import { F1FantasyApiClient } from './f1-fantasy-api.client';

@Injectable()
export class F1FantasyClient {
    private readonly fantasyBaseUrl = 'https://fantasy.formula1.com';

    constructor(private readonly f1FantasyApiClient: F1FantasyApiClient) {}

    async getPlayersFeed(input: F1FantasyDriversInput) {
        const { raceWeek, lang } = input;

        const url = `${this.fantasyBaseUrl}/feeds/drivers/${raceWeek}_${lang}.json`;

        return this.f1FantasyApiClient.getPrivate(url);
    }

    // TODO: use it on frontend
    async getPlayerStats(playerId: string) {
        const url = `${this.fantasyBaseUrl}/feeds/popup/playerstats_${playerId}.json`;

        return this.f1FantasyApiClient.getPrivate(url);
    }

    async getFantasyTeam(input: F1FantasyUserTeamInput) {
        const { userId, raceWeek, teamNo } = input;

        const url = `${this.fantasyBaseUrl}/services/user/opponentteam/opponentgamedayplayerteamget/1/${userId}/${teamNo}/${raceWeek}/1`;

        return this.f1FantasyApiClient.getPrivate(url);
    }

    async getUserGameDays(input: F1FantasyUserGameDaysInput) {
        const { userId } = input;

        const url = `${this.fantasyBaseUrl}/services/user/gameplay/${userId}/getusergamedaysv1/1`;

        return this.f1FantasyApiClient.getPrivate(url);
    }

    async getSchedule(lang: string) {
        const url = `${this.fantasyBaseUrl}/feeds/v2/schedule/raceday_${lang}.json`;

        return this.f1FantasyApiClient.getPrivate(url);
    }

    async getLeaderboard(leagueId: string) {
        // Overall
        const url = `${this.fantasyBaseUrl}/feeds/leaderboard/privateleague/list_1_${leagueId}_0_1.json`;
        // By race week
        // const url = `${this.fantasyBaseUrl}/feeds/leaderboard/privateleague/list_2_${leagueId}_${raceWeek}_1.json`;

        const res = await this.f1FantasyApiClient.getPrivate(url);

        return res;
    }
}

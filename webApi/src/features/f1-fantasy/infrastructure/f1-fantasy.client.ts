import { Injectable } from '@nestjs/common';

import { F1FantasyDriversInput, F1FantasyUserTeamInput } from '../domain/types';
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

    async getPlayerStats(playerId: string) {
        const url = `${this.fantasyBaseUrl}/feeds/popup/playerstats_${playerId}.json`;

        return this.f1FantasyApiClient.getPrivate(url);
    }

    async getFantasyTeam(input: F1FantasyUserTeamInput) {
        const { userId, raceWeek } = input;

        const url = `${this.fantasyBaseUrl}/services/user/opponentteam/opponentgamedayplayerteamget/1/${userId}/1/${raceWeek}/1`;

        return this.f1FantasyApiClient.getPrivate(url);
    }

    async getUserGameDays(input: F1FantasyUserTeamInput) {
        const { userId, raceWeek } = input;

        const url = `${this.fantasyBaseUrl}/services/user/gameplay/${userId}/getteam/1/1/${raceWeek}/1`;

        return this.f1FantasyApiClient.getPrivate(url);
    }
}

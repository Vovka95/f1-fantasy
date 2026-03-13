import { Injectable } from '@nestjs/common';

import {
    F1FantasyDriversInput,
    F1FantasyUserGameDaysInput,
} from '../domain/types';
import { F1FantasyApiClient } from './f1-fantasy-api.client';

@Injectable()
export class F1FantasyClient {
    private readonly fantasyBaseUrl = 'https://fantasy.formula1.com';

    constructor(private readonly f1FantasyApiClient: F1FantasyApiClient) {}

    async getDriversFeed(input: F1FantasyDriversInput) {
        const { seasonId, lang } = input;

        const url = `${this.fantasyBaseUrl}/feeds/drivers/${seasonId}_${lang}.json`;

        return this.f1FantasyApiClient.getPublic(url);
    }

    async getUserGameDays(input: F1FantasyUserGameDaysInput) {
        const { userId, seasonId } = input;

        // const url =
        //     `${this.fantasyBaseUrl}/services/user/gameplay/${userId}` +
        //     `/getusergamedaysv1/${seasonId}`;

        // const leagueId = 'bbcc318a-11a3-11f1-ab76-5d5c886f6f39-0-205467947';
        // const url = `https://fantasy.formula1.com/services/user/opponentteam/opponentgamedayget/1/${leagueId}/2`;

        // user leagues
        // const url = `https://fantasy.formula1.com/services/user/league/${userId}/leaguelandingv1`;

        // const url = `${this.fantasyBaseUrl}/services/user/league/${userId}/leaguelandingv1`;

        // team
        const url = `https://fantasy.formula1.com/services/user/gameplay/${userId}/getteam/1/1/2/1`;

        return this.f1FantasyApiClient.getPrivate(url);
    }
}

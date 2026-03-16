import { Injectable } from '@nestjs/common';

import { F1FantasyClient } from '../infrastructure/f1-fantasy.client';

import { F1FantasyDriversInput, F1FantasyUserTeamInput } from '../domain/types';

@Injectable()
export class F1FantasyService {
    constructor(private readonly f1FantasyClient: F1FantasyClient) {}

    async getPlayers(input: F1FantasyDriversInput) {
        return this.f1FantasyClient.getPlayersFeed(input);
    }

    async getPlayerStats(playerId: string) {
        return this.f1FantasyClient.getPlayerStats(playerId);
    }

    async getFantasyTeam(input: F1FantasyUserTeamInput) {
        return this.f1FantasyClient.getFantasyTeam(input);
    }

    async getMe(input: F1FantasyUserTeamInput) {
        return this.f1FantasyClient.getUserGameDays(input);
    }
}

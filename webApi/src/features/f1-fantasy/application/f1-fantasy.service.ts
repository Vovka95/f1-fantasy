import { Injectable } from '@nestjs/common';

import { F1FantasyClient } from '../infrastructure/f1-fantasy.client';

import {
    F1FantasyDriversInput,
    F1FantasyUserGameDaysInput,
} from '../domain/types';

@Injectable()
export class F1FantasyService {
    constructor(private readonly f1FantasyClient: F1FantasyClient) {}

    async getDrivers(input: F1FantasyDriversInput) {
        return this.f1FantasyClient.getDriversFeed(input);
    }

    async getMe(input: F1FantasyUserGameDaysInput) {
        return this.f1FantasyClient.getUserGameDays(input);
    }
}

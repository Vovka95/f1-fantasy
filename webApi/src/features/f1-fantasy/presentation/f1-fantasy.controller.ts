import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { F1FantasyService } from '../application/f1-fantasy.service';

@Controller('f1/fantasy')
export class F1FantasyController {
    constructor(private readonly f1FantasyService: F1FantasyService) {}

    @Post('test')
    async test() {
        await this.f1FantasyService.getMe({
            raceWeek: 1,
            userId: 'd025a628-18c6-11f1-8584-91067885f997',
        });

        return { ok: true };
    }

    @Get('players')
    async getF1Players(@Query('raceWeek') raceWeek: number) {
        return this.f1FantasyService.getPlayers({ raceWeek, lang: 'en' });
    }

    @Get('player-stats')
    async getF1PlayerStats(@Query('playerId') playerId: string) {
        return this.f1FantasyService.getPlayerStats(playerId);
    }

    @Get('fantasy-team')
    async getFantasyTeam(
        @Query('userId') userId: string,
        @Query('raceWeek') raceWeek: number,
    ) {
        return this.f1FantasyService.getFantasyTeam({
            userId,
            raceWeek,
        });
    }

    @Get('game-days')
    async getUserGameDays(@Query('userId') userId: string) {
        return this.f1FantasyService.getUserGameDays({ userId });
    }

    @Get('schedule')
    async getSchedule() {
        const lang = 'en';

        return this.f1FantasyService.getSchedule(lang);
    }

    @Get('me')
    async getMe() {
        return this.f1FantasyService.getMe({
            raceWeek: 2,
            userId: 'd025a628-18c6-11f1-8584-91067885f997',
        });
    }
}

import { Controller, Get, Post } from '@nestjs/common';
import { F1FantasyService } from '../application/f1-fantasy.service';

@Controller('f1/fantasy')
export class F1FantasyController {
    constructor(private readonly f1FantasyService: F1FantasyService) {}

    @Post('test')
    async test() {
        await this.f1FantasyService.getMe({
            seasonId: 1,
            userId: 'd025a628-18c6-11f1-8584-91067885f997',
        });

        return { ok: true };
    }

    @Get('drivers')
    async getDrivers() {
        return this.f1FantasyService.getDrivers({ seasonId: 2, lang: 'en' });
    }

    @Get('me')
    async getMe() {
        return this.f1FantasyService.getMe({
            seasonId: 1,
            userId: 'd025a628-18c6-11f1-8584-91067885f997',
        });
    }
}

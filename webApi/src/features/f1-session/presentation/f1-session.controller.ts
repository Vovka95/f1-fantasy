import { Body, Controller, Get, Post } from '@nestjs/common';

import { F1SessionService } from '../application/f1-session.service';

import { ConnectF1SessionDto } from '../domain/dto/connect-f1-session.dto';
import { F1SessionResponseDto } from '../domain/dto/f1-session-response.dto';

@Controller('f1/session')
export class F1SessionController {
    constructor(private readonly f1SessionService: F1SessionService) {}

    @Get('status')
    async getStatus(): Promise<F1SessionResponseDto> {
        const session = await this.f1SessionService.getSession();

        return this.f1SessionService.mapToPublic(session);
    }

    @Post('connect')
    async connectSession(
        @Body() dto: ConnectF1SessionDto,
    ): Promise<F1SessionResponseDto> {
        const session = await this.f1SessionService.saveCookies(dto);

        return this.f1SessionService.mapToPublic(session);
    }
}

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { F1SessionModule } from '../f1-session/f1-session.module';

import { F1FantasyController } from './presentation/f1-fantasy.controller';
import { F1FantasyApiClient } from './infrastructure/f1-fantasy-api.client';
import { F1FantasyClient } from './infrastructure/f1-fantasy.client';
import { F1FantasyService } from './application/f1-fantasy.service';

@Module({
    imports: [ConfigModule, HttpModule, F1SessionModule],
    controllers: [F1FantasyController],
    providers: [F1FantasyApiClient, F1FantasyClient, F1FantasyService],
    exports: [F1FantasyApiClient, F1FantasyClient, F1FantasyService],
})
export class F1FantasyModule {}

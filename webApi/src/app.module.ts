import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './infrastructure/database/database.module';

import { F1SessionModule } from './features/f1-session/f1-session.module';
import { F1FantasyModule } from './features/f1-fantasy/f1-fantasy.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        DatabaseModule,
        F1FantasyModule,
        F1SessionModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}

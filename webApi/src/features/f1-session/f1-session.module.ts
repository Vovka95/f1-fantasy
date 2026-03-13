import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { F1SessionController } from './presentation/f1-session.controller';
import { F1SessionService } from './application/f1-session.service';

import { F1Session } from './domain/entity/f1-session.entity';

@Module({
    imports: [TypeOrmModule.forFeature([F1Session])],
    controllers: [F1SessionController],
    providers: [F1SessionService],
    exports: [F1SessionService],
})
export class F1SessionModule {}

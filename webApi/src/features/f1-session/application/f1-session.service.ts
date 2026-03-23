import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { F1Session } from '../domain/entity/f1-session.entity';
import { ConnectF1SessionDto } from '../domain/dto/connect-f1-session.dto';
import { F1SessionResponseDto } from '../domain/dto/f1-session-response.dto';

import { F1_API_ERROR } from 'src/common/constants/f1-error.constants';

@Injectable()
export class F1SessionService {
    constructor(
        @InjectRepository(F1Session)
        private readonly repo: Repository<F1Session>,
    ) {}

    async saveCookies(dto: ConnectF1SessionDto) {
        const cookieHeader = [
            `F1_FANTASY_007=${dto.f1Fantasy007}`,
            `login-session=${dto.loginSession}`,
            `reese84=${dto.reese84}`,
        ].join('; ');

        let session = await this.repo.findOne({ where: { id: 1 } });

        if (!session) {
            const session = this.repo.create({
                id: 1,
                cookieHeader,
            });

            return this.repo.save(session);
        }

        await this.repo.update(
            { id: 1 },
            {
                cookieHeader,
                isValid: true,
                lastValidatedAt: null,
                expiredAt: null,
                lastError: null,
                updatedAt: new Date(),
            },
        );

        return session;
    }

    async getSession(): Promise<F1Session> {
        const session = await this.repo.findOne({ where: { id: 1 } });

        if (!session) {
            throw new NotFoundException(F1_API_ERROR.SESSION_NOT_CONFIGURED);
        }

        return session;
    }

    async getCookieHeader(): Promise<string> {
        const session = await this.getSession();

        if (!session.isValid || !session.cookieHeader) {
            throw new UnauthorizedException(F1_API_ERROR.F1_SESSION_EXPIRED);
        }

        return session.cookieHeader;
    }

    async markValid(): Promise<void> {
        await this.repo.update(1, {
            isValid: true,
            lastValidatedAt: new Date(),
            expiredAt: null,
            lastError: null,
            updatedAt: new Date(),
        });
    }

    async markExpired(errorMessage?: string): Promise<void> {
        await this.repo.update(1, {
            isValid: false,
            expiredAt: new Date(),
            lastError: errorMessage ?? 'F1 session expired',
            updatedAt: new Date(),
        });
    }

    mapToPublic(session: F1Session): F1SessionResponseDto {
        return {
            isValid: session.isValid,
            lastValidatedAt: session.lastValidatedAt,
            expiredAt: session.expiredAt,
            lastError: session.lastError,
            updatedAt: session.updatedAt,
        };
    }
}

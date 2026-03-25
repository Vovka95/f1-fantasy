import {
    BadGatewayException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import type { AxiosError, AxiosRequestConfig, Method } from 'axios';

import { F1SessionService } from 'src/features/f1-session/application/f1-session.service';

import { F1_API_ERROR } from 'src/common/constants/f1-error.constants';

@Injectable()
export class F1FantasyApiClient {
    constructor(
        private readonly httpService: HttpService,
        private readonly f1SessionService: F1SessionService,
    ) {}

    async getPrivate<T>(
        url: string,
        config?: Omit<AxiosRequestConfig, 'headers'> & {
            headers?: Record<string, string>;
        },
    ) {
        return this.sendRequest<T>('get', url, {
            isPrivate: true,
            config,
        });
    }

    async getPublic<T>(
        url: string,
        config?: Omit<AxiosRequestConfig, 'headers'> & {
            headers?: Record<string, string>;
        },
    ) {
        return this.sendRequest<T>('get', url, {
            isPrivate: false,
            config,
        });
    }

    async postPrivate<T>(
        url: string,
        body?: unknown,
        config?: Omit<AxiosRequestConfig, 'headers'> & {
            headers?: Record<string, string>;
        },
    ) {
        return this.sendRequest<T>('post', url, {
            isPrivate: true,
            body,
            config,
        });
    }

    async postPublic<T>(
        url: string,
        body?: unknown,
        config?: Omit<AxiosRequestConfig, 'headers'> & {
            headers?: Record<string, string>;
        },
    ) {
        return this.sendRequest<T>('post', url, {
            isPrivate: false,
            body,
            config,
        });
    }

    private async sendRequest<T>(
        method: Method,
        url: string,
        options: {
            isPrivate: boolean;
            body?: unknown;
            config?: Omit<AxiosRequestConfig, 'headers'> & {
                headers?: Record<string, string>;
            };
        },
    ): Promise<T> {
        const baseHeaders: Record<string, string> = {
            Accept: 'application/json, text/plain, */*',
            Referer: options.isPrivate
                ? 'https://fantasy.formula1.com/en/leagues'
                : 'https://fantasy.formula1.com/en',
            'User-Agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
        };

        if (options.isPrivate) {
            baseHeaders.Cookie = await this.f1SessionService.getCookieHeader();
        }

        if (options.config?.headers) {
            Object.assign(baseHeaders, options.config.headers);
        }

        const response =
            method === 'get'
                ? await firstValueFrom(
                      this.httpService.get<T>(url, {
                          ...options.config,
                          headers: baseHeaders,
                          validateStatus: () => true,
                      }),
                  )
                : await firstValueFrom(
                      this.httpService.post<T>(url, options.body, {
                          ...options.config,
                          headers: baseHeaders,
                          validateStatus: () => true,
                      }),
                  );

        if (response.status === 401 || response.status === 403) {
            if (options.isPrivate) {
                await this.f1SessionService.markExpired(
                    `F1 authorization failed with status ${response.status}, on url request: ${url}`,
                );

                throw new UnauthorizedException(
                    F1_API_ERROR.F1_SESSION_EXPIRED,
                );
            }

            throw new UnauthorizedException(F1_API_ERROR.F1_PUBLIC_UNAUTORIZED);
        }

        if (response.status >= 400) {
            throw new BadGatewayException(
                `F1 request failed with status ${response.status}, on url request: ${url}`,
            );
        }

        if (options.isPrivate) {
            await this.f1SessionService.markValid();
        }

        return response.data;
    }
}

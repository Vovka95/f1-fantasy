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
    ): Promise<T> {
        const cookieHeader = await this.f1SessionService.getCookieHeader();

        return this.requestPrivate<T>(
            'get',
            url,
            cookieHeader,
            undefined,
            config,
        );
    }

    async getPublic<T>(
        url: string,
        config?: Omit<AxiosRequestConfig, 'headers'> & {
            headers?: Record<string, string>;
        },
    ): Promise<T> {
        return this.requestPublic<T>('get', url, undefined, config);
    }

    async postPrivate<T>(
        url: string,
        body?: unknown,
        config?: Omit<AxiosRequestConfig, 'headers'> & {
            headers?: Record<string, string>;
        },
    ): Promise<T> {
        const cookieHeader = await this.f1SessionService.getCookieHeader();

        return this.requestPrivate<T>('post', url, cookieHeader, body, config);
    }

    async postPublic<T>(
        url: string,
        body?: unknown,
        config?: Omit<AxiosRequestConfig, 'headers'> & {
            headers?: Record<string, string>;
        },
    ): Promise<T> {
        return this.requestPublic<T>('post', url, body, config);
    }

    private async requestPrivate<T>(
        method: Method,
        url: string,
        cookieHeader: string,
        body?: unknown,
        config?: Omit<AxiosRequestConfig, 'headers'> & {
            headers?: Record<string, string>;
        },
    ): Promise<T> {
        const headers: Record<string, string> = {
            Accept: 'application/json, text/plain, */*',
            Referer: 'https://fantasy.formula1.com/en/leagues',
            'User-Agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
            Cookie: cookieHeader,
        };

        if (config?.headers) {
            Object.assign(headers, config.headers);
        }

        try {
            const response =
                method === 'get'
                    ? await firstValueFrom(
                          this.httpService.get<T>(url, {
                              ...config,
                              headers,
                              validateStatus: () => true,
                          }),
                      )
                    : await firstValueFrom(
                          this.httpService.post<T>(url, body, {
                              ...config,
                              headers,
                              validateStatus: () => true,
                          }),
                      );

            await this.f1SessionService.markValid();

            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;

            if (
                axiosError.response?.status === 401 ||
                axiosError.response?.status === 403
            ) {
                await this.f1SessionService.markExpired(
                    `F1 authorization failed with status ${axiosError.response.status}`,
                );

                throw new UnauthorizedException(
                    F1_API_ERROR.F1_SESSION_EXPIRED,
                );
            }

            throw new BadGatewayException(F1_API_ERROR.F1_PRIVATE_FAILED);
        }
    }

    private async requestPublic<T>(
        method: Method,
        url: string,
        body?: unknown,
        config?: Omit<AxiosRequestConfig, 'headers'> & {
            headers?: Record<string, string>;
        },
    ): Promise<T> {
        const headers: Record<string, string> = {
            Accept: 'application/json, text/plain, */*',
            Referer: 'https://fantasy.formula1.com/en',
            'User-Agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
        };

        if (config?.headers) {
            Object.assign(headers, config.headers);
        }

        try {
            const response =
                method === 'get'
                    ? await firstValueFrom(
                          this.httpService.get<T>(url, {
                              ...config,
                              headers,
                          }),
                      )
                    : await firstValueFrom(
                          this.httpService.post<T>(url, body, {
                              ...config,
                              headers,
                          }),
                      );

            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;

            if (
                axiosError.response?.status === 401 ||
                axiosError.response?.status === 403
            ) {
                await this.f1SessionService.markExpired(
                    `F1 authorization failed with status ${axiosError.response.status}`,
                );

                throw new UnauthorizedException(
                    F1_API_ERROR.F1_PUBLIC_UNAUTORIZED,
                );
            }

            throw new BadGatewayException(F1_API_ERROR.F1_PUBLIC_FAILED);
        }
    }
}

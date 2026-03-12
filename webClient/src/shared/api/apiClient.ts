import axios from 'axios';

import { httpConfig } from './httpConfig';

export const apiClient = axios.create({
    baseURL: httpConfig.baseUrl,
    timeout: httpConfig.timeoutMs,
});

import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';

export default class APIRequest {
  static instance: AxiosInstance;

  static init(url: string, apiKey: string) {
    APIRequest.instance = axios.create({
      baseURL: url,
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'x-api-key': apiKey,
      },
    });
  }

  static sendEvents(data: any): Promise<any> {
    return new Promise((resolve) => {
      APIRequest.instance
        .post('/events', data)
        .then((result: AxiosResponse) => {
          resolve({ data: result });
        })
        .catch((error: AxiosError) => {
          resolve({
            status: error?.response?.status || 403,
            data: error?.response?.data || { message: 'Something went wrong' },
          });
        });
    });
  }
}

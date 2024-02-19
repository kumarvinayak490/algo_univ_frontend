import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export type ResponseInterface<T> = AxiosResponse<T> | AxiosError<T>;

class ApiClient {
  constructor() {
    this._get = this._get.bind(this);
    this._post = this._post.bind(this);
    this._patch = this._patch.bind(this);
    this._put = this._put.bind(this);
    this._delete = this._delete.bind(this);
  }

  private _getClient(baseURL?: string): AxiosInstance {
    const apiClient = axios.create({
      baseURL: baseURL || "http://localhost:8000/api",
    });
    apiClient.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const token = JSON.parse(localStorage.getItem("token") || '""');
        if (token && config.headers) {
          const configHeaders = config.headers;
          configHeaders.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (err: AxiosError) => {
        return Promise.reject(err);
      }
    );

    apiClient.interceptors.response.use(
      async (response: AxiosResponse) => {
        return response.data;
      },
      async (error) => {
        const originalRequest = error.config;
        // If the error status is 401 and there is no originalRequest._retry flag,
        // it means the token has expired and we need to refresh it
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const refresh = localStorage.getItem("refresh")
              ? JSON.parse(localStorage.getItem("refresh") as string)
              : null;
            const response = await apiClient.post("/token/refresh/", {
              refresh,
            });
            const { token, refresh: newRfresh } = response.data;
            localStorage.setItem("token", token);
            localStorage.setItem("refresh", newRfresh);
            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          } catch (error) {
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      }
    );

    return apiClient;
  }

  _get<T>(url: string, config?: AxiosRequestConfig<unknown>): Promise<T> {
    const get = this._getClient().get(url, config);
    return get as unknown as Promise<T>;
  }

  _post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig<unknown>
  ): Promise<T> {
    const post = this._getClient().post(url, data, config);
    return post as unknown as Promise<T>;
  }

  _patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig<unknown>
  ): Promise<T> {
    const patch = this._getClient().patch(url, data, config);
    return patch as unknown as Promise<T & AxiosError>;
  }

  _put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig<unknown>
  ): Promise<T> {
    const put = this._getClient().put(url, data, config);

    return put as unknown as Promise<T & AxiosError>;
  }

  _delete<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig<unknown>
  ): Promise<T> {
    const configs = { ...config, data };
    const del = this._getClient().delete(url, configs);

    return del as unknown as Promise<T>;
  }
}

const Client = new ApiClient();
const get = Client._get;
const post = Client._post;
const patch = Client._patch;
const put = Client._put;
const del = Client._delete;

export { get, post, patch, put, del };

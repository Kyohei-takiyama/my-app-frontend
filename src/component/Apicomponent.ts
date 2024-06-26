import axios, {
  AxiosResponse,
  AxiosError,
  AxiosRequestConfig,
  AxiosInstance,
  Method,
} from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL //繋ぎたいサーバに変更する

export const ApiComponent = async <T>(
  method: Method, // 必須項目。get,delete,post,putなど利用可能
  url: string, //必須項目
  data?: any, //BODY部分。送りたいデータを引数で渡す
  headers?: Map<string, string>, //必要に応じて追加する
  ...requestConfig: any
): Promise<AxiosResponse<T>> => {
  const config: AxiosRequestConfig = {
    ...requestConfig,
    baseURL: API_BASE_URL,
    url: url,
    method: method,
    data,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: '',
      ...headers,
    },
  }

  const axiosInstance: AxiosInstance = axios.create()

  axiosInstance.interceptors.response.use(
    (res: AxiosResponse<T>) => res,

    //AxiosErrorはここで処理を行う
    async (error: AxiosError) => {
      console.error('error:', error)

      if (error.response?.data) {
        return error.response?.data
      }

      throw Error('AxiosError')
    },
  )

  return await axiosInstance.request<T>(config)
}

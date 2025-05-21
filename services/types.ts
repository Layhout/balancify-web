import { AxiosRequestConfig } from 'axios'

export type Timestamp = {
  created_at: string
  updated_at: string
  deleted_at?: string
}

export type PaginationResult = {
  limit: number
  count: number
  offset: number
}

export type ResponseResult<T = unknown> = {
  data: T
}

export type ResponseResultWithPagination<T = unknown> = {
  data: T
  pagination: PaginationResult
}

/* ===================================== */

export type PaginationParam = {
  offset?: number
  limit?: number
}

export type SortingParam = {
  sort?: string
  order?: 'DESC' | 'ASC'
}

export type FilterParams = {
  [key: string]: string | number | boolean | undefined
}

export type GetListParams<P> = {
  pagination?: PaginationParam
  sortings?: SortingParam[]
  filters?: FilterParams
} & P

export type RequestConfigParams<T> = {
  config?: AxiosRequestConfig
} & T

// 定义通用响应格式
export interface ResponseData<T = any> {
  code: number;
  data: T;
  message: string;
}

// 定义一些基础数据类型
export interface UserInfo {
  id: number;
  name: string;
  avatar?: string;
}

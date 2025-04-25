// 通用响应数据结构
export interface ResponseData<T = any> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}

// 用户信息接口
export interface UserInfo {
  id: number;
  name: string;
  username: string;
  avatar?: string;
  roles?: string[];
  [key: string]: any;
}

// 教师信息接口
export interface TeacherInfo {
  employeeId: string;
  name: string;
  department?: string;
  position?: string;
  [key: string]: any;
}

// 调查问卷接口
export interface Survey {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  status: number;
  [key: string]: any;
} 
import request from './request';

import type { ResponseData, UserInfo } from './typings';

// 统一的错误处理包装函数
const requestWrapper = async (requestPromise: Promise<any>) => {
  try {
    const result = await requestPromise;
    // 确保返回结果
    return result;
  } catch (error) {
    // 错误已经在request模块中进行了Toast提示，这里只需要传递错误
    throw error;
  }
};

// 示例 GET 请求
export async function getHello() {
  return requestWrapper(request<ResponseData<string>>('/api/hello'));
}

// 示例 POST 请求
export async function login(params: { username: string; password: string }) {
  return requestWrapper(request<ResponseData<UserInfo>>('/api/login', {
    method: 'POST',
    data: params,
  }));
}

// 示例 GET 带参数
export async function getUserInfo(id: number) {
  return requestWrapper(request<ResponseData<UserInfo>>(`/api/user/${id}`));
}

// 获取教师信息
export async function getLoginTeacherInfo() {
  return requestWrapper(request<ResponseData>('/m/teacherinfo/findByEmployeeId'));
}

// 获取调查列表
export async function getSurveyList(params?: object) {
  return requestWrapper(request<ResponseData>('/api/open/h5/survey/list', {
    method: 'GET',
    params,
  }));
}
import { Toast } from 'antd-mobile';
import { extend } from 'umi-request';

// 创建统一错误处理
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// 错误处理方法
const errorHandler = (error) => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    Toast.show({
      content: `请求错误: ${errorText}`,
    });
  } else if (!response) {
    Toast.show({
      content: '网络异常，无法连接服务器',
    });
  }
  return Promise.reject(error); // 确保错误被正确传递
};

// 创建请求实例
const request = extend({
  errorHandler,
  credentials: 'include', // 默认请求带上cookie
  timeout: 10000, // 10秒超时
});

// 请求拦截器，添加token等通用信息
request.interceptors.request.use((url, options) => {
  const token = localStorage.getItem('token');
  const headers = {
    ...options.headers,
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return {
    url,
    options: { ...options, headers },
  };
});

// 响应拦截器
request.interceptors.response.use(async (response) => {
  const res = await response.clone().json();

  // 401 处理 - 放在最前面
  if (res.code === 401) {
    // localStorage.removeItem('token');
    // Toast.show({
    //   content: '登录已过期，请重新登录',
    // });
    // setTimeout(() => {
    //   window.location.href = '/login';
    // }, 1000);
    // // 抛出特定的错误类型，会被全局 unhandledrejection 捕获
    // const authError = new Error('未登录或登录已过期');
    // authError.name = 'AuthError';
    // authError.info = res;
    // setTimeout(() => {
    //   throw authError;  // 使用 setTimeout 确保错误被全局捕获
    // }, 0);
    // 返回一个永远pending的Promise，阻止后续代码执行
    // return new Promise(() => { });
  }

  // 成功逻辑
  if (res.code === 0 || res.code === 200) {
    return res.data || res;
  }

  // 其他业务错误逻辑
  const error = new Error(res?.message || res?.msg || '请求失败');
  error.name = 'BusinessError';
  error.info = res;
  error.response = response;

  Toast.show({
    content: res.message || '请求失败',
    position: 'bottom',
  });

  throw error;
});

export default request;
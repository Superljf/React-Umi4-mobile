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


  let testToken = "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX3R5cGUiOiIwIiwidXNlcl9pZCI6MSwibG9naW5fdHlwZSI6IkxpbmtXZUNoYXRBUEkiLCJ1c2VyX25hbWUiOiJhZG1pbiIsInVzZXJfa2V5IjoiZTM0OTM1NmMtOGZiZi00ZmI1LTlkODktNzJjODI1ZjU5OTI5IiwiY29ycF9uYW1lIjoi5b-r5LmQ5pif6L6wIiwiY29ycF9pZCI6Ind3M2RmZTc4NTk5Y2UyN2M4ZSJ9.mhZHhxB45JL8TDrOPLLjk63vbQBMFZPM3BnYL4WeiscHDr9dM65rGnC54gHE9n4VSy74uwWwrUtRuheP4zklWA"
  headers.Authorization = `Bearer ${testToken}`
  // if (token) { 
  //   headers.Authorization = `Bearer ${token}`;
  // }

  return {
    url,
    options: { ...options, headers },
  };
});

// 响应拦截器
request.interceptors.response.use(async (response) => {
  // 先克隆响应防止多次读取
  const res = await response.clone().json();
  console.log("🚀 ~ request.interceptors.response.use ~ res:", res)

  // 成功逻辑
  if (res.code === 0 || res.code === 200) {

    return res.data || res; // ✅ resolve 成功数据（业务层的 data）
  }

  // 错误逻辑
  const error = new Error(res.message || '请求失败');
  error.name = 'BusinessError';
  error.info = res;
  error.response = response;

  Toast.show({
    content: res.message || '请求失败',
    position: 'bottom',
  });
  if (res.code === 401) {
    localStorage.removeItem('token');
    // 可加跳转：window.location.href = '/login';
  }

  throw error; // ✅ 使用 throw 代替 Promise.reject 确保错误被捕获
});

export default request;
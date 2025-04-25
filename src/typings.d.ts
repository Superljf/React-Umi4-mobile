declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.jpg';

// 添加postcss-px-to-viewport声明
declare module 'postcss-px-to-viewport';

interface Window {
  [key: string]: any;
} 
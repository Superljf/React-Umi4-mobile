import React from 'react';

// 学习图标
export const StudyIcon: React.FC<{ color?: string; size?: number }> = ({ 
  color = '#FF7676', 
  size = 24 
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5ZM8 17C7.45 17 7 16.55 7 16V8C7 7.45 7.45 7 8 7C8.55 7 9 7.45 9 8V16C9 16.55 8.55 17 8 17ZM12 17C11.45 17 11 16.55 11 16V8C11 7.45 11.45 7 12 7C12.55 7 13 7.45 13 8V16C13 16.55 12.55 17 12 17ZM16 17C15.45 17 15 16.55 15 16V8C15 7.45 15.45 7 16 7C16.55 7 17 7.45 17 8V16C17 16.55 16.55 17 16 17Z" fill={color}/>
  </svg>
);

// 搜索图标
export const SearchIcon: React.FC<{ color?: string; size?: number }> = ({ 
  color = '#FFA940', 
  size = 24 
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill={color}/>
  </svg>
);

// 助手图标
export const AssistantIcon: React.FC<{ color?: string; size?: number }> = ({ 
  color = '#666', 
  size = 24 
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill={color}/>
  </svg>
);

// Logo图标
export const LogoIcon: React.FC<{ color?: string; size?: number }> = ({ 
  color = '#FF5252', 
  size = 24 
}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18ZM12 3L1 9L12 15L21 10.09V17H23V9L12 3Z" fill={color}/>
  </svg>
);

import { useState, useCallback } from 'react';
import { getUserInfo } from '@/services/api';
import type { UserInfo } from '@/services/typings';

export default function useGlobal() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [title, setTitle] = useState<string>('默认标题');

  // 获取用户信息
  const fetchUserInfo = useCallback(async (id: number) => {
    try {
      const response = await getUserInfo(id);
      if (response.code === 0) {
        setUserInfo(response.data);
      }
    } catch (error) {
      console.error('获取用户信息失败:', error);
    }
  }, []);

  // 更新标题
  const updateTitle = useCallback((newTitle: string) => {
    setTitle(newTitle);
  }, []);

  return {
    userInfo,
    title,
    fetchUserInfo,
    updateTitle,
  };
}

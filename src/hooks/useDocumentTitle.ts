import { useEffect } from 'react';

/**
 * 自定义钩子，用于设置文档标题
 * @param title 要设置的标题
 * @param restoreOnUnmount 组件卸载时是否恢复原始标题，默认为 false
 */
export default function useDocumentTitle(
  title: string,
  restoreOnUnmount: boolean = false
): void {
  useEffect(() => {
    // 保存原始标题
    const originalTitle = document.title;
    
    // 设置新标题
    document.title = title;
    
    // 组件卸载时恢复原始标题
    return () => {
      if (restoreOnUnmount) {
        document.title = originalTitle;
      }
    };
  }, [title, restoreOnUnmount]);
} 
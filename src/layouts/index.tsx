import { useEffect } from 'react';
import { NavBar, TabBar } from 'antd-mobile';
import { useNavigate, Outlet, useLocation } from 'umi';
import {
  AppOutline,
  MessageOutline,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons';
import styles from './index.less';
import { useModel } from 'umi';
import useRouteTitle from '@/hooks/useRouteTitle';

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { title: globalTitle, updateTitle } = useModel('useGlobal');
  // 获取当前路由的标题
  const routeTitle = useRouteTitle(globalTitle);

  const tabs = [
    {
      key: '/',
      title: '首页',
      icon: <AppOutline />,
    },
    {
      key: '/message',
      title: '消息',
      icon: <MessageOutline />,
    },
    {
      key: '/todo',
      title: '待办',
      icon: <UnorderedListOutline />,
    },
    {
      key: '/me',
      title: '我的',
      icon: <UserOutline />,
    },
  ];

  // 使用 useEffect 在路由变化时更新全局标题
  useEffect(() => {
    // 更新全局标题，这样其他组件也可以访问到当前路由标题
    updateTitle(routeTitle);
  }, [location.pathname, routeTitle, updateTitle]);

  return (
    <div className={styles.layout}>
      {/* <div className={styles.header}>
        <NavBar onBack={() => navigate(-1)}>{routeTitle}</NavBar>
      </div> */}

      <div className={styles.content}>
        <Outlet />
      </div>

      {/* <div className={styles.footer}>
        <TabBar
          activeKey={location.pathname}
          onChange={(value) => navigate(value)}
        >
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div> */}
    </div>
  );
}

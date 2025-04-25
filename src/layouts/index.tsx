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

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { title } = useModel('useGlobal');

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

  return (
    <div className={styles.layout}>
      <div className={styles.header}>
        <NavBar onBack={() => navigate(-1)}>{title}</NavBar>
      </div>

      <div className={styles.content}>
        <Outlet />
      </div>

      <div className={styles.footer}>
        <TabBar
          activeKey={location.pathname}
          onChange={(value) => navigate(value)}
        >
          {tabs.map((item) => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  );
}

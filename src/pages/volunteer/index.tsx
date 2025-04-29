import React from 'react';
import { useNavigate } from 'umi';
import styles from './index.less';
import { LogoIcon, StudyIcon, SearchIcon, AssistantIcon } from './components/Icons';

const VolunteerPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {/* 头部区域 */}
      <div className={styles.header}>
        <div className={styles.logo}>快乐学习</div>
        <div className={styles.title}>中考志愿推荐</div>
      </div>

      {/* 内容区域 */}
      <div className={styles.content}>
        <div className={styles.loginTip}>
          <div className={styles.loginIcon}>
            <LogoIcon size={20} />
            <span className={styles.badge}>Hi</span>
          </div>
          <div className={styles.loginText}>请点此登录</div>
          <div className={styles.loginDesc}>登录后可模拟填报志愿题目~</div>
        </div>

        {/* 功能入口 */}
        <div className={styles.menuList}>
          <div className={styles.menuItem} onClick={() => navigate('/volunteer/recommend')}>
            <div className={styles.menuInfo}>
              <div className={styles.menuTitle}>中考志愿推荐</div>
              <div className={styles.menuArrow}>›</div>
            </div>
            <div className={styles.menuIcon}>
              <div className={styles.iconBox} style={{ backgroundColor: '#FFF0EB' }}>
                <StudyIcon size={24} />
              </div>
            </div>
          </div>

          <div className={styles.menuItem} onClick={() => navigate('/volunteer/search')}>
            <div className={styles.menuInfo}>
              <div className={styles.menuTitle}>定向数据查询</div>
              <div className={styles.menuArrow}>›</div>
            </div>
            <div className={styles.menuIcon}>
              <div className={styles.iconBox} style={{ backgroundColor: '#FFF8EB' }}>
                <SearchIcon size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部区域 */}
      <div className={styles.footer}>
        <div className={styles.assistant}>
          <div className={styles.assistantIcon}>
            <AssistantIcon size={24} />
          </div>
          <div className={styles.assistantText}>中招政策小助手</div>
        </div>
        <div className={styles.disclaimer}>
          本系统仅用于辅助用户对中考生进行志愿模拟，未用于商业用途
          请使用者自行评估风险并承担责任。
        </div>
      </div>

      {/* 底部导航条 */}
      <div className={styles.bottomBar}></div>
    </div>
  );
};

export default VolunteerPage;

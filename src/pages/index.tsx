import React, { useEffect } from 'react';
import { Button, Space, Toast, DotLoading, ErrorBlock } from 'antd-mobile';
import { useRequest } from 'ahooks';
import { getHello, getLoginTeacherInfo, getSurveyList } from '@/services/api';
import styles from './index.less';
import { useModel, useNavigate } from 'umi';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { title, userInfo, updateTitle, fetchUserInfo } = useModel('useGlobal');

  const {
    data: surveyList,
    loading: surveyListLoading,
    error: surveyListError,
    run: fetchSurveyList,
  } = useRequest((params) => getSurveyList(params), {
    manual: true,
    onSuccess: (res) => {
      console.log('调查列表获取成功:', res);
      Toast.show({
        content: '调查列表获取成功',
      });
    },
    onError: (error) => {
      console.error('调查列表获取失败:', error);
    },
  });
  console.log('🚀 ~ surveyList:', surveyList);

  // 调用方式
  useEffect(() => {
    fetchSurveyList({
      pageSize: 10,
      pageNum: 1,
    });
  }, []);

  const handleClick = async () => {
    updateTitle('新标题');
    Toast.show({
      content: '更新标题成功！',
      position: 'bottom',
    });
  };

  const handleFetchUser = () => {
    fetchUserInfo(1); // 假设用户ID为1
  };

  const renderSurveyList = () => {
    if (surveyListLoading)
      return (
        <div>
          加载调查列表... <DotLoading />
        </div>
      );
    if (surveyListError) return <div>获取调查列表失败</div>;
    if (surveyList?.data && Array.isArray(surveyList.data)) {
      return (
        <div className={styles.surveyList}>
          <h3>调查问卷列表</h3>
          {surveyList.data.length > 0 ? (
            <ul>
              {surveyList.data.map((survey: any) => (
                <li key={survey.id}>
                  <h4>{survey.title}</h4>
                  <p>{survey.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>暂无调查问卷</p>
          )}
        </div>
      );
    }
    return <div>暂无调查问卷数据</div>;
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {userInfo && <div>欢迎, {userInfo.name}</div>}

        <Space direction='vertical' style={{ width: '100%' }}>
          <Button color='primary' onClick={handleClick}>
            更新标题并刷新数据
          </Button>
          <Button color='success' onClick={handleFetchUser}>
            获取用户信息
          </Button>
          <Button
            color='warning'
            onClick={() => {
              fetchSurveyList({
                pageSize: 10,
                pageNum: 1,
              });
            }}
          >
            刷新所有数据
          </Button>
          <Button
            color='default'
            onClick={() => navigate('/volunteer')}
          >
            进入志愿填报模拟页面
          </Button>
        </Space>
        {renderSurveyList()}
      </div>
    </div>
  );
};

export default HomePage;

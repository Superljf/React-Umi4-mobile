import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Radio, Space, Toast } from 'antd-mobile';
import styles from './index.less';
import { getSmsCode, submitSurvey } from '@/services/api';
import { useSearchParams } from 'umi';

const HomePage: React.FC = () => {
  const [form] = Form.useForm();
  const [canSubmit, setCanSubmit] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [phoneValue, setPhoneValue] = useState('');

  const [params] = useSearchParams();
  const cid = params.get('cid') || '';

  // 监听表单变化，判断是否可以提交
  const onValuesChange = (changedValues: any) => {
    // 如果手机号变化了，更新 phoneValue
    if ('phone' in changedValues) {
      //只有当手机号符合格式时，才更新 phoneValue
      if (/^1[3-9]\d{9}$/.test(changedValues.phone)) {
        setPhoneValue(changedValues.phone || '');
      } else {
        setPhoneValue('');
      }
    }

    const values = form.getFieldsValue();
    const isComplete =
      values.name &&
      values.phone &&
      values.verifyCode &&
      values.grade &&
      values.district;

    setCanSubmit(isComplete);
  };

  // 获取验证码
  const getVerifyCode = async () => {
    const phone = form.getFieldValue('phone');
    if (!phone) {
      Toast.show({
        content: '请先输入手机号码',
        position: 'bottom',
      });
      return;
    }
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      Toast.show({
        content: '请输入正确的手机号码',
        position: 'bottom',
      });
      return;
    }

    try {
      const res = await getSmsCode(phone, cid);
      // 开始倒计时
      setCountdown(60);
      Toast.show({
        content: '验证码已发送',
        position: 'bottom',
      });
    } catch (error: any) {
      setCountdown(0);
      Toast.show({
        content: error.message,
      });
    }
  };

  // 倒计时逻辑
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // 提交表单
  const onFinish = async (values: any) => {
    // 判断手机号是否符合
    if (!/^1[3-9]\d{9}$/.test(values.phone)) {
      Toast.show({
        content: '请输入正确的手机号码',
        position: 'bottom',
      });
      return;
    }

    const answerInfo = [
      {
        formCodeId: 18,
        formType: '数字文本框',
        label: '联系人电话',
        crmLabel: '联系人电话',
        tag: 'el-input',
        defaultValue: '',
        isCrm: true,
        modelValue: values.phone,
        required: true,
        captcha: values.verifyCode,
        hasCaptcha: true,
        checkTel: true,
      },
      {
        formCodeId: 32,
        formType: '文本框',
        label: '学生姓名',
        crmLabel: '学生姓名',
        tag: 'el-input',
        defaultValue: '',
        isCrm: true,
        modelValue: values.name,
      },
      {
        formCodeId: 2,
        formType: '文本框',
        label: '9月在读年级',
        tag: 'el-input',
        defaultValue: '',
        isCrm: false,
        modelValue: values.grade,
      },
      {
        formCodeId: 2,
        formType: '文本框',
        label: '居住片区',
        tag: 'el-input',
        defaultValue: '',
        isCrm: false,
        modelValue: values.district,
      },
    ];
    try {
      const params = {
        mobile: values.phone,
        name: values.name,
        city: '',
        answer: JSON.stringify(answerInfo),
        dataSource: '知乎落地页',
        surveyChannelIds: [cid],
      };
      await submitSurvey(params);
      Toast.show({
        content: '提交成功',
        icon: 'success',
      });
      // 转化代码;
      window.zhad.push({ eventtype: 'js_submit' });
    } catch (error: any) {
      Toast.show({
        content: error.message,
      });
    }
  };

  return (
    <div className={styles.container}>
      <img
        className={styles.bg}
        src={require('@/assets/images/bg.jpg')}
        alt='背景'
      />
      <div className={styles.formContainer}>
        <Form
          form={form}
          layout='vertical'
          onValuesChange={onValuesChange}
          onFinish={onFinish}
          footer={
            <div className={styles.footer}>
              <Button
                block
                type='submit'
                color='primary'
                disabled={!canSubmit}
                className={styles.submitBtn}
                style={{
                  border: 'none',
                  backgroundColor: canSubmit ? '#E70027' : '#fa8ea0',
                }}
              >
                立即提交
              </Button>
              <div className={styles.tips}>老师将在24小时内回电哦</div>
            </div>
          }
        >
          <Form.Item name='name' label='学员姓名' rules={[{ required: true }]}>
            <Input placeholder='请输入学员姓名' />
          </Form.Item>

          <Form.Item
            name='phone'
            label='联系电话'
            validateTrigger={['onBlur']}
            rules={[
              { required: true, message: '请输入联系电话' },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '请输入正确的手机号码',
                validateTrigger: ['onBlur'],
              },
            ]}
          >
            <Input maxLength={11} placeholder='请输入联系电话' type='tel' />
          </Form.Item>

          <div className={styles.verifyCodeContainer}>
            <Form.Item
              name='verifyCode'
              label='验证码'
              rules={[{ required: true }]}
              className={styles.verifyCode}
              extra={
                <div
                  className={styles.verifyCodeBtn}
                  style={{
                    color: countdown > 0 || !phoneValue ? '#999' : '#E70027',
                  }}
                  onClick={countdown > 0 ? undefined : getVerifyCode}
                >
                  {countdown > 0 ? `${countdown}秒后重新获取` : '获取验证码'}
                </div>
              }
            >
              <Input type='tel' maxLength={4} placeholder='请输入验证码' />
            </Form.Item>
          </div>

          <Form.Item
            name='grade'
            label='9月在读年级'
            rules={[{ required: true }]}
          >
            <Radio.Group>
              <Space wrap>
                <Radio value='新初一'>新初一</Radio>
                <Radio value='新初二'>新初二</Radio>
                <Radio value='新初三'>新初三</Radio>
                <Radio value='新高一'>新高一</Radio>
                <Radio value='新高二'>新高二</Radio>
                <Radio value='新高三'>新高三</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name='district'
            label='居住片区'
            rules={[{ required: true }]}
          >
            <Radio.Group>
              <Space wrap>
                <Radio value='思北片区'>思北片区</Radio>
                <Radio value='文灶片区'>文灶片区</Radio>
                <Radio value='吕厝片区'>吕厝片区</Radio>
                <Radio value='瑞景片区'>瑞景片区</Radio>
                <Radio value='南山片区'>南山片区</Radio>
                <Radio value='海沧片区'>海沧片区</Radio>
                <Radio value='集美片区'>集美片区</Radio>
                <Radio value='杏林片区'>杏林片区</Radio>
                <Radio value='同安片区'>同安片区</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default HomePage;

import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { Row, Col, Form, Input, Checkbox, Button, Spin, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { setCurrent as setCurrentMenuItem } from '../store/slices/menuSlice';
import { signIn as signInAction } from '../store/slices/userSlice';
import { RootState } from '../store';
import styles from '../styles/SignIn.module.less';

type FinishHandler = (
  values: {
    email: string,
    password: string,
    remember: boolean
  }
) => void;

const SignIn: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentMenuItem({ current: 'sign-in' }));
  }, [dispatch]);

  const isLoading = useSelector((state: RootState) => state.user.isLoading);

  const signIn = (email: string, password: string, remember: boolean): void => {
    const arg = {
      email,
      password,
      callbackSuccess: () => {
        message.success('User is successfully logged in!');
        dispatch(setCurrentMenuItem({ current: 'home' }));
        setTimeout(() => {
          router.push('/');
        }, 2000);
      },
      callbackFail: (errorMessage) => message.error(errorMessage)
    };
    dispatch(signInAction(arg));
  };

  const onFinish: FinishHandler = ({ email, password, remember }) => {
    signIn(email, password, remember);
  };

  const onFinishFailed = (e: ValidateErrorEntity) => {
    message.error(e.errorFields[0].errors[0]);
  };

  const passwordRules = [
    { required: true, message: 'Please input your password!' },
    { min: 6, message: 'Password should be at least 6 characters' },
  ];
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <Row>
        <Col
          lg={{ span: 6, offset: 9 }}
          md={{ span: 8, offset: 8 }}
          sm={{ span: 14, offset: 5 }}
          xs={{ span: 20, offset: 2 }}
        >
          { isLoading 
            ? <Spin size="large" className={styles.spin} /> 
            : (
                <Form
                  className={styles.form}
                  name="sign-in"
                  initialValues={{ remember: false }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    className={styles.formItem}
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                  >
                    <Input prefix={<UserOutlined />} placeholder="Email" />
                  </Form.Item>
      
                  <Form.Item
                    className={styles.formItem}
                    name="password"
                    rules={passwordRules}
                  >
                    <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                  </Form.Item>
      
                  <Form.Item
                    className={styles.formItem}
                    name="remember"
                    valuePropName="checked"
                  >
                    <Checkbox>Remember me</Checkbox>
                  </Form.Item>
      
                  <Form.Item>
                    <Button type="primary" htmlType="submit" className={styles.button}>
                      Sign In
                    </Button>
                  </Form.Item>
                </Form>
              )
          }        
        </Col>
      </Row>
    </>
  );
};

export default SignIn;

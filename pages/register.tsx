import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { ValidateErrorEntity } from 'rc-field-form/lib/interface';
import { Row, Col, Form, Input, Button, Spin, message } from 'antd';
import { setCurrent as setCurrentMenuItem } from '../store/slices/menuSlice';
import { registerUser } from '../store/slices/userSlice';
import { RootState } from '../store';
import styles from '../styles/Register.module.less';

type FinishHandler = (
  values: {
    email: string,
    password1: string,
    password2: string,
  }
) => void;

const Register: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentMenuItem({ current: 'register' }));
  }, [dispatch]);

  const isLoading = useSelector((state: RootState) => state.user.isLoading);

  const register = (email: string, password: string): void => {
    const arg = {
      email,
      password,
      callbackSuccess: () => {
        message.success('User is successfully registered!');
        dispatch(setCurrentMenuItem({ current: 'home' }));
        setTimeout(() => {
          router.push('/');
        }, 2000);
      },
      callbackFail: (errorMessage) => message.error(errorMessage)
    };
    dispatch(registerUser(arg));
  };

  const onFinish: FinishHandler = ({ email, password1, password2 }) => {
    if (password1 !== password2) {
      message.error('Passwords are not equal!');
      return;
    }

    register(email, password1);
  };

  const onFinishFailed = (e: ValidateErrorEntity) => {
    message.error(e.errorFields[0].errors[0]);
  };

  const password1Rules = [
    { required: true, message: 'Please input your password!' },
    { min: 6, message: 'Password should be at least 6 characters' },
  ];

  const password2Rules = [
    { required: true, message: 'Please input your password again!' },
    { min: 6, message: 'Password should be at least 6 characters' },
  ];

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Row>
        <Col
          lg={{ span: 10, offset: 7 }}
          md={{ span: 14, offset: 5 }}
          sm={{ span: 16, offset: 4 }}
          xs={{ span: 20, offset: 2 }}
        >
          { isLoading 
            ? <Spin size="large" className={styles.spin} /> 
            : (
                <Form
                  className={styles.form}
                  name="register"
                  labelCol={{sm: { span: 8 }}}
                  wrapperCol={{sm: { span: 16 }}}
                  initialValues={{ remember: true }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                  >
                    <Input />
                  </Form.Item>
      
                  <Form.Item label="Password" name="password1" rules={password1Rules}>
                    <Input.Password />
                  </Form.Item>
      
                  <Form.Item label="Password again" name="password2" rules={password2Rules}>
                    <Input.Password />
                  </Form.Item>
      
                  <Form.Item wrapperCol={{sm: { offset: 8, span: 16 }}}>
                    <Button type="primary" htmlType="submit" className={styles.button}>
                      Register
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

export default Register;

import React from 'react';
import Head from 'next/head';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Alert } from 'antd';
import { useDispatch } from 'react-redux';
import { setCurrent as setCurrentMenuItem } from '../store/slices/menuSlice';

type EffectCallbackReturnType = () => any;

const NotFound: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  dispatch(setCurrentMenuItem({ current: '' }));

  useEffect((): EffectCallbackReturnType => {
    setTimeout(() => router.push('/'), 2000);
    return () => dispatch(setCurrentMenuItem({ current: 'home' }));
  }, [router, dispatch]);

  return (
    <>
      <Head>
        <title>404 - Not found</title>
      </Head>
      <Row>
        <Col span="12" offset="6">
          <Alert
            style={{ marginTop: 50 }}
            message="Error"
            description="404 - Not found"
            type="error"
            showIcon
          />
        </Col>
      </Row>
    </>
  );
}

export default NotFound;

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Row, Col, Alert } from 'antd';
import { useDispatch } from 'react-redux';
import { setCurrent as setCurrentMenuItem } from '../store/menuSlice';

export default function NotFound() {
  const router = useRouter();
  const dispatch = useDispatch();
  dispatch(setCurrentMenuItem({ current: '' }));

  useEffect(() => {
    setTimeout(() => router.push('/'), 2000);
    return () => dispatch(setCurrentMenuItem({ current: 'home' }));
  }, [router, dispatch]);

  return (
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
  );
}

import React, { useEffect } from 'react';
import Head from 'next/head';
import { Spin, message } from 'antd';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrent as setCurrentMenuItem } from '../store/slices/menuSlice';
import { signOut } from '../store/slices/userSlice';
import { RootState } from '../store';
import styles from '../styles/SignOut.module.less';

const SignOut: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  
  useEffect(() => {
    dispatch(setCurrentMenuItem({ current: 'sign-out' }));

    const arg = {
      callbackSuccess: () => {
        dispatch(setCurrentMenuItem({ current: 'home' }));
        router.push('/');
      },
      callbackFail: (errorMessage: string) => {
        message.error('Sign out error! Try again.');
      }
    };
    dispatch(signOut(arg));
  }, [dispatch, router]);

  const isLoading = useSelector((state: RootState) => state.user.isLoading);

  return (
    <>
      <Head>
        <title>Sign Out</title>
      </Head>
      {isLoading ? (
        <Spin size="large" className={styles.spin} />
      ) : null}
    </>
  );
};

export default SignOut;

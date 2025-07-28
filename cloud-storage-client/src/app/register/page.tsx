'use client';

import Link from 'next/link';
import s from '../../styles/Login.module.scss';
import { checkIfAuthenticated } from '@/utils';
import { useEffect } from 'react';

export default function Login() {
  useEffect(() => {
    checkIfAuthenticated();
  }, []);

  return (
    <div className={s['login-container']}>
      <h2 className="text-2xl font-bold font-display">FileStore</h2>
      <div className="flex flex-col justify-center min-h-full px-8 items-start">
        <p className="text-5xl text-husky font-semibold font-display">
          Create new account <span className={s.blueDot}></span>
        </p>
        <span className="my-3 text-sm text-silver-fox font-display">
          Already A Member?{' '}
          <Link className="" href="/login">
            Log in
          </Link>
        </span>
      </div>
    </div>
  );
}

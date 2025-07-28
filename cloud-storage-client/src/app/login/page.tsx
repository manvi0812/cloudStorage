'use client';

import Link from 'next/link';
import s from '../../styles/Login.module.scss';
import { checkIfAuthenticated } from '@/utils';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IFormInput {
  mail: string;
  password: string;
}

export default function Login() {
  useEffect(() => {
    checkIfAuthenticated();
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <div className={s['login-container']}>
      <h2 className="text-2xl font-bold font-display">FileStore</h2>
      <div className="flex flex-col justify-center min-h-full px-8 items-start">
        <p className="text-5xl text-husky font-semibold font-display">
          Login to your account <span className={s.blueDot}></span>
        </p>
        <span className="my-3 text-sm text-silver-fox font-display">
          Don't have an account?{' '}
          <Link className="text-out-of-the-blue hover:underline" href="/register">
            Create an account
          </Link>
        </span>
        <form className={`${s.loginForm} font-display`} onSubmit={handleSubmit(onSubmit)}>
          <label className={s.loginLabel}>Email</label>
          <input
            className={s.loginInput}
            {...register('mail', {
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              required: 'Email Address is required',
            })}
            aria-invalid={errors.mail ? 'true' : 'false'}
          />
          {errors.mail &&
            (errors?.mail?.type === 'pattern' ? (
              <p className={s.errorText}>Enter correct Email</p>
            ) : (
              <p className={s.errorText} role="alert">
                {errors.mail.message}
              </p>
            ))}
          <label className={s.loginLabel}>Password</label>
          <input
            className={s.loginInput}
            {...register('password', { required: 'Password is required' })}
            aria-invalid={errors.password ? 'true' : 'false'}
          />
          {errors.password && (
            <p className={s.errorText} role="alert">
              {errors.password.message}
            </p>
          )}

          <div className="flex w-full gap-2">
            <button className={s.registerBtn}>
              <Link href="/register">Create Account</Link>
            </button>

            <input className={s.button} type="submit" defaultValue="Login" />
          </div>
        </form>
      </div>
    </div>
  );
}

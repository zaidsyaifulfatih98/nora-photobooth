
'use client';

import { useState } from 'react';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import axios, { AxiosError } from 'axios';
import { registerSchema, RegisterFormData } from '@/validators/auth.register.validator';
import { ZodError } from 'zod';

const emptyForm: RegisterFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: 'CASHIER',
};

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState<RegisterFormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
    setServerError('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError('');
    setSuccessMessage('');

    // Zod validation
    const result = registerSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof RegisterFormData, string>> = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof RegisterFormData;
        if (!fieldErrors[field]) fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/register`,
        result.data,
        {
          withCredentials: true,
        },
      );
      setSuccessMessage('User registered successfully!');
      setForm(emptyForm);
    } catch (err) {
      const error = err as AxiosError<{ massage?: string; message?: string }>;
      setServerError(
        error.response?.data?.massage ||
          error.response?.data?.message ||
          'Registration failed. Please try again.',
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center px-4'>
      <div className='w-full max-w-md rounded-2xl bg-white shadow-xl p-8'>
        {/* Logo */}
        <div className='flex flex-col items-center mb-6'>
          <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white font-bold'>
            S
          </div>
          <h1 className='text-xl font-semibold text-gray-900'>SkyPOS</h1>
          <p className='text-sm text-gray-500'>Point of Sale Management</p>
        </div>

        {/* Title */}
        <h2 className='mb-6 text-center text-lg font-semibold text-gray-800'>
          Create your account
        </h2>

        {serverError && (
          <div className='mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600'>
            {serverError}
          </div>
        )}

        {successMessage && (
          <div className='mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-2.5 text-sm text-green-600'>
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* First Name & Last Name */}
          <div className='mb-4 flex gap-3'>
            <div className='flex-1'>
              <label className='mb-1 block text-sm font-medium text-gray-700'>
                First Name
              </label>
              <input
                type='text'
                name='firstName'
                value={form.firstName}
                onChange={handleChange}
                placeholder='John'
                className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-1 ${
                  errors.firstName
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                }`}
              />
              {errors.firstName && (
                <p className='mt-1 text-xs text-red-500'>{errors.firstName}</p>
              )}
            </div>
            <div className='flex-1'>
              <label className='mb-1 block text-sm font-medium text-gray-700'>
                Last Name
              </label>
              <input
                type='text'
                name='lastName'
                value={form.lastName}
                onChange={handleChange}
                placeholder='Doe'
                className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-1 ${
                  errors.lastName
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                }`}
              />
              {errors.lastName && (
                <p className='mt-1 text-xs text-red-500'>{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Email */}
          <div className='mb-4'>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Email Address
            </label>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder='name@company.com'
              className={`w-full rounded-lg border px-4 py-2.5 text-sm focus:outline-none focus:ring-1 ${
                errors.email
                  ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
            />
            {errors.email && (
              <p className='mt-1 text-xs text-red-500'>{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className='mb-4'>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Password
            </label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={form.password}
                onChange={handleChange}
                placeholder='Enter your password'
                className={`w-full rounded-lg border px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-1 ${
                  errors.password
                    ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
                    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                }`}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600'
              >
                {showPassword ? (
                  <HiOutlineEyeOff className='h-5 w-5' />
                ) : (
                  <HiOutlineEye className='h-5 w-5' />
                )}
              </button>
            </div>
            {errors.password && (
              <p className='mt-1 text-xs text-red-500'>{errors.password}</p>
            )}
          </div>

          {/* Role */}
          <div className='mb-6'>
            <label className='mb-1 block text-sm font-medium text-gray-700'>
              Role
            </label>
            <select
              name='role'
              value={form.role}
              onChange={handleChange}
              className={`w-full rounded-lg border bg-white px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-1 ${
                errors.role
                  ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
              }`}
            >
              <option value='CASHIER'>Cashier</option>
              <option value='SUPER_ADMIN'>Super Admin</option>
            </select>
            {errors.role && (
              <p className='mt-1 text-xs text-red-500'>{errors.role}</p>
            )}
          </div>

          {/* Button */}
          <button
            type='submit'
            disabled={isLoading}
            className='mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed'
          >
            {isLoading ? 'Registering...' : 'Register →'}
          </button>
        </form>

        {/* Footer */}
        <div className='flex items-center justify-between text-xs text-gray-400'>
          <span>SkyPOS Enterprise v2.4.1</span>
          <div className='flex gap-4'>
            <a href='#' className='hover:text-gray-600'>
              Support
            </a>
            <a href='#' className='hover:text-gray-600'>
              Privacy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

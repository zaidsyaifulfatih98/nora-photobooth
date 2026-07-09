import bcrypt from 'bcrypt';
import prisma from '../configs/pool-connection.config';
import { AppError } from '../utils/app-error.utils';
import { createToken } from '../utils/jwt.utils';
import { JWT_TOKEN_SECRET_KEY } from '../configs/dotenv.config';

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'SUPER_ADMIN' | 'ADMIN';
}

export async function loginService({ email, password }: LoginPayload) {
  const user = await prisma.user.findFirst({
    where: { email, deletedAt: null },
  });

  if (!user) {
    throw AppError('Email or password is incorrect', 401);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw AppError('Email or password is incorrect', 401);
  }

  const token = createToken(
    { id: user.id, role: user.role },
    JWT_TOKEN_SECRET_KEY as string,
    { expiresIn: '1d' },
  );

  return {
    token,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
  };
}

export async function registerService(data: RegisterPayload) {
  const existingUser = await prisma.user.findFirst({
    where: { email: data.email, deletedAt: null },
  });

  if (existingUser) {
    throw AppError('Email is already registered', 400);
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await prisma.user.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: hashedPassword,
      role: data.role,
    },
  });

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  };
}

export async function getCurrentUserService(id: string) {
  const user = await prisma.user.findFirst({
    where: { id, deletedAt: null },
  });

  if (!user) {
    throw AppError('User not found', 404);
  }

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  };
}

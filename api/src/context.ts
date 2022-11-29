import jwt from 'jsonwebtoken';
import { inferAsyncReturnType } from '@trpc/server';
import type { CreateFastifyContextOptions } from '@trpc/server/adapters/fastify';
import { prisma } from './providers/prisma';

export async function createContext({ req, res }: CreateFastifyContextOptions) {
  async function getUserFromHeaders() {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader) {
        return null;
      }

      const [schema, token] = authHeader.split(' ');

      if (schema !== 'Bearer' || !token) {
        return null;
      }

      const { sub: userId } = jwt.verify(token, process.env.JWT_SECRET ?? '');

      const user = await prisma.user.findUnique({
        where: {
          id: userId as string
        }
      });

      return user;
    } catch (error) {
      return null;
    }
  }

  const user = await getUserFromHeaders();

  return { req, res, user };
}

export type Context = inferAsyncReturnType<typeof createContext>;
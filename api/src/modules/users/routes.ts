import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { t } from '../../trpcInstance';
import { prisma } from '../../providers/prisma';

import { EMAIL_NOT_FOUND, INVALID_PASSWORD } from '../../lang/strings';

export const usersRoutes = t.router({
  login: t.procedure
    .input(z.object({
      email: z.string().email(),
      password: z.string()
    })).mutation(async ({ input }) => {
      const user = await prisma.user.findUnique({
        where: {
          email: input.email,
        }
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: EMAIL_NOT_FOUND,
        });
      }

      const passwordsMatch = await bcrypt.compare(input.password, user.password);

      if (!passwordsMatch) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: INVALID_PASSWORD,
        });
      }

      const token = jwt.sign({}, process.env.JWT_SECRET ?? '', {
        subject: user.id,
        expiresIn: process.env.JWT_EXPIRES_IN
      });

      return { token }
    }),
})
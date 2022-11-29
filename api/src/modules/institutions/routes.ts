import { z } from 'zod';
import bcrypt from 'bcrypt';
import { UserType } from '@prisma/client';

import { t } from '../../trpcInstance';
import { prisma } from '../../providers/prisma';

export const institutionsRoutes = t.router({
  create: t.procedure
    .input(z.object({
      email: z.string().email(),
      password: z.string().min(8),
      name: z.string(),
      cnpj: z.string().regex(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})-(\d{2})$/)
    })).mutation(async ({ input }) => {
      const {
        email,
        password,
        name,
        cnpj,
      } = input;

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          type: UserType.INSTITUTION,
          institution: {
            create: {
              cnpj,
              name,
            }
          }
        }
      });

      return user;
    }),
})
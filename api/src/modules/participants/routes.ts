import { UserType } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { t } from '../../trpcInstance';
import { prisma } from '../../providers/prisma';

import { EMAIL_NOT_FOUND, INVALID_PASSWORD } from '../../lang/strings';

export const participantsRoutes = t.router({
  create: t.procedure
    .input(z.object({
      email: z.string().email(),
      password: z.string().min(8),
      name: z.string().min(1),
      cpf: z.string().regex(/^(\d{3})\.(\d{3})\.(\d{3})-(\d{2})$/),
      birthday: z.date(),
    })).mutation(async ({ input }) => {
      const {
        email,
        password,
        name,
        cpf,
        birthday,
      } = input;

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          type: UserType.PARTICIPANT,
          participant: {
            create: {
              full_name: name,
              cpf,
              birthday,
            }
          }
        }
      });
      
      return user;
    }),
})
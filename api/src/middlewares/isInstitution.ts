import { UserType } from '@prisma/client';
import { TRPCError } from '@trpc/server';

import { t } from '../trpcInstance';
import { prisma } from '../providers/prisma';

export const isInstitution = t.middleware(async ({ ctx, next }) => {
  console.log(ctx.user)
  if (ctx.user?.type !== UserType.INSTITUTION) {
    throw new TRPCError({
      code: 'UNAUTHORIZED'
    });
  }

  const institution = await prisma.institution.findUnique({
    where: {
      user_id: ctx.user.id
    }
  });

  if (!institution) {
    throw new TRPCError({
      code: 'UNAUTHORIZED'
    });
  }

  return next({
    ctx: {
      user: ctx.user,
      institution
    }
  })
});
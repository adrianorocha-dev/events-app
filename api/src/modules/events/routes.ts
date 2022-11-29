import { z } from 'zod';
import { t } from '../../trpcInstance';
import { isInstitution } from '../../middlewares/isInstitution';
import { prisma } from '../../providers/prisma';

export const eventsRoutes = t.router({
  create: t.procedure
    .use(isInstitution)
    .input(z.object({
      name: z.string(),
      description: z.string().optional(),
      location: z.string(),
      starts_at: z.date(),
      ends_at: z.date(),
      schedule: z.array(z.object({
        description: z.string(),
        starts_at: z.date(),
        ends_at: z.date(),
      })).optional(),
    })).mutation(async ({ ctx, input }) => {
      const {
        name,
        description,
        location,
        starts_at,
        ends_at,
        schedule
      } = input;

      const event = await prisma.event.create({
        data: {
          institution_id: ctx.institution.id,
          name,
          description,
          location,
          starts_at,
          ends_at,
          cover_img: 'https://loremflickr.com/320/240',
          schedule: {
            createMany: {
              data: schedule ?? []
            }
          }
        }
      });

      return event;
    })
})
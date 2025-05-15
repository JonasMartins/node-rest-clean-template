import { z } from 'zod';

export const addChargesSchema = z
  .array(
    z.object({
      chargeId: z.string(),
      partnerId: z.string(),
      amount: z.number(),
      reference: z.string(),
      timestamp: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Invalid date string format',
      }),
    })
  )
  .nonempty();

export type AddChargesValidator = z.infer<typeof addChargesSchema>;

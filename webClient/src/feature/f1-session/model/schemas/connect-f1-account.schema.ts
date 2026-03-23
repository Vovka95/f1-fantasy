import { z } from 'zod';

const f1Fantasy007 = z.string().min(1, 'Required');
const loginSession = z.string().min(1, 'Required');
const reese84 = z.string().min(1, 'Required');

export const connectF1AccauntSchema = z.object({
    f1Fantasy007,
    loginSession,
    reese84,
});

export type ConnectF1AccauntValues = z.infer<typeof connectF1AccauntSchema>;

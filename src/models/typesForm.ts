import {z} from "zod";

export const registerSchema = z
    .object({
        username: z
            .string()
            .min(4, 'Username must be at least 4 characters long')
            .max(20, "Username can't be longer than 20 characters"),
        password: z.string().min(6, 'Password must be at least 6 characters long'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords must match',
        path: ['confirmPassword'],
    })
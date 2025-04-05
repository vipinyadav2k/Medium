import z from 'zod';

export const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4),
    name: z.string().optional(),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const blogSchema = z.object({
    title: z.string(),
    content: z.string(),
});

export type BlogSchema = z.infer<typeof blogSchema>;

export const blogUpdateSchema = z.object({
    id: z.number(),
    title: z.string(),
    content: z.string(),
});

export type BlogUpdateSchema = z.infer<typeof blogUpdateSchema>;
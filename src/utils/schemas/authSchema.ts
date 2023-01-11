import * as z from 'zod';

export const loginSchema = z.object({
  username: z.string().min(3, {
    message: 'username must be at least 3 characters',
  }),
  password: z
    .string({
      required_error: 'password is required',
    })
    .min(8, {
      message: 'password must be at least 8 characters',
    }),
});

export const signUpSchema = loginSchema.extend({
  email: z.string().email(),
});

export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;

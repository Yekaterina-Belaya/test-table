import * as v from 'valibot';

export const LoginSchema = v.object({
  login: v.pipe(v.string(), v.minLength(1, 'Поле обязательно')),
  password: v.pipe(v.string(), v.minLength(1, 'Поле обязательно')),
  remember: v.pipe(v.boolean()),
});

export type LoginInput = v.InferOutput<typeof LoginSchema>;

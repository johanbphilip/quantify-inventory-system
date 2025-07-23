'use client';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Label } from '../ui/label';
import { useActionState, useEffect } from 'react';
import { login } from '@/lib/actions/login';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const [state, action] = useActionState(login, undefined);
  useEffect(() => {
    if (state?.redirect) {
      router.push(state.redirect);
    }
  }, [state]);
  return (
    <Card className="w-2/3  border-none">
      <CardHeader>
        <CardTitle>
          <h1 className="text-4xl font-bold">Welcome Back!</h1>
        </CardTitle>
        <CardDescription>
          <p className="text-muted-foreground">
            Please enter your credentials to access your account.
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" action={action}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <input
              type="email"
              placeholder="Enter your email"
              id="email"
              name="email"
              className="border rounded-md p-2"
            />
            {state?.error?.email && (
              <p className="text-red-500 text-sm">{state.error.email}</p>
            )}
          </div>

          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/recover-password"
              className="ml-auto text-primary text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            name="password"
            className="border rounded-md p-2"
          />
          {state?.error?.password && (
            <p className="text-red-500 text-sm">{state.error.password}</p>
          )}
          <button
            type="submit"
            className="bg-primary rounded-md p-2 text-white font-semibold"
          >
            Login
          </button>
          <p className="w-full text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/auth/sign-up" className="text-primary">
              Register here
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

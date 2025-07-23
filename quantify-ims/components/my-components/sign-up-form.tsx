'use client';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Label } from '../ui/label';
import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '@/lib/actions/sign-up';

export default function SignUpForm() {
  const router = useRouter();
  const [state, action] = useActionState(signUp, undefined);
  useEffect(() => {
    if (state?.redirect) {
      router.push(state.redirect);
    }
  }, [state]);
  return (
    <Card className="border-none">
      <CardHeader>
        <CardTitle>
          <h1 className="text-4xl font-bold">Welcome To Quantify!</h1>
        </CardTitle>
        <CardDescription>
          <p className="text-muted-foreground">
            Your one stop shop for all things inventory.
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-4" action={action}>
          <div className="flex flex-row gap-4 items-center">
            {' '}
            <div className="flex flex-col gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <input
                type="firstName"
                placeholder="John "
                id="firstName"
                name="firstName"
                className="border rounded-md p-2"
              />
              {state?.error?.firstName && (
                <p className="text-red-500 text-sm">{state.error.firstName}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="firstName">Last Name</Label>
              <input
                type="lastName"
                placeholder="Doe"
                id="lastName"
                name="lastName"
                className="border rounded-md p-2"
              />
              {state?.error?.lastName && (
                <p className="text-red-500 text-sm">{state.error.lastName}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Organization</Label>
            <input
              type="organization"
              placeholder="Enter your organization"
              id="organization"
              name="organization"
              className="border rounded-md p-2"
            />
            {state?.error?.organization && (
              <p className="text-red-500 text-sm">{state.error.organization}</p>
            )}
          </div>
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

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
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
          </div>
          <button
            type="submit"
            className="bg-primary rounded-md p-2 text-white font-semibold"
          >
            Sign Up
          </button>
          <p className="w-full text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-primary">
              Login here
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

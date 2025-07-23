import SignUpForm from '@/components/my-components/sign-up-form';
import { SignUpFormSchema } from '@/lib/types/sign-up-form';

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center w-1/2 h-screen p-10">
      <SignUpForm />
    </div>
  );
}

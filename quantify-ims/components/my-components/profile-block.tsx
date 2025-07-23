'use client';
import { useAuth } from '@/lib/providers/auth-provider';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export function ProfileBlock() {
  const { user } = useAuth();

  return (
    <div className="border rounded-md p-5">
      <div className="flex flex-row gap-10">
        <Avatar className="size-30 rounded-lg grayscale">
          <AvatarImage
            src={'./favicon.ico'}
            alt={`${user?.user_metadata.first_name} ${user?.user_metadata.last_name}'s image`}
          />
          <AvatarFallback className="rounded-lg">CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <p className="font-semibold text-2xl">
              {user?.user_metadata.first_name} {user?.user_metadata.last_name}
            </p>
            <p className="text-muted-foreground">{user?.id}</p>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col">
              <p className="text-muted-foreground">Organization</p>
              <p className="font-semibold">
                {user?.user_metadata.organization}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-muted-foreground">Email</p>
              <p className="">{user?.user_metadata.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

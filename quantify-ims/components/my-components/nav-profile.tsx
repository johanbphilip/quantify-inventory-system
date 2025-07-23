import {
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  BellDot,
  CircleUser,
  CreditCard,
  EllipsisVertical,
  LogOutIcon,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { signOut } from '@/lib/actions/sign-out';
import { User } from '@/lib/types/user';
import Link from 'next/link';
import { useAuth } from '@/lib/providers/auth-provider';

export function NavProfile() {
  const { user, loading } = useAuth();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage
                  src={'./favicon.ico'}
                  alt={`${user?.user_metadata.first_name} ${user?.user_metadata.last_name}'s image`}
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{`${user?.user_metadata.first_name} ${user?.user_metadata.last_name}`}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user?.user_metadata.email}
                </span>
              </div>
              <EllipsisVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={'./favicon.ico'}
                    alt={`${user?.user_metadata.first_name} ${user?.user_metadata.last_name}'s image`}
                  />
                  <AvatarFallback className="rounded-lg">QA</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{`${user?.user_metadata.first_name} ${user?.user_metadata.last_name}`}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user?.user_metadata.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <CircleUser />
                <Link href={'/account'}>Account</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard /> Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BellDot /> Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => await signOut()}
              className="p-0"
            >
              <SidebarMenuButton>
                <LogOutIcon /> Log Out
              </SidebarMenuButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

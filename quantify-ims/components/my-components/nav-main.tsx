import { type LucideIcon } from 'lucide-react';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { PlusIcon } from 'lucide-react';
import Link from 'next/link';

export function NavMain({
  items,
}: {
  items: { title: string; url: string; icon: LucideIcon }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            {/* <SidebarMenuButton
              className="bg-accent-foreground text-primary-foreground duration-500 ease-in-out hover:bg-primary hover:text-primary-foreground mb-2 "
              tooltip={'Quick Create'}
              onClick={() => {
                // Handle quick create action here
              }}
            >
              <PlusIcon />
              <span>Quick Create</span>
            </SidebarMenuButton> */}
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu className="gap-2">
          {items.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link href={item.url}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

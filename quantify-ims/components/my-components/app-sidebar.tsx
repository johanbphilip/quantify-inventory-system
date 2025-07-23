'use client';
import {
  ArrowUpCircleIcon,
  BellIcon,
  ChartColumnBig,
  Circle,
  Component,
  HeartIcon,
  HistoryIcon,
  LayoutDashboard,
  SearchIcon,
  Settings,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { NavMain } from './nav-main';
import { NavGeneral } from './nav-general';
import { ModeToggle } from './mode-toggle';
import { NavProfile } from './nav-profile';

// Menu items.
const data = {
  user: {
    name: 'Johan Philip',
    email: 'johan@johan.com',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: LayoutDashboard,
    },
    // {
    //   title: 'All Products',
    //   url: '/all-products',
    //   icon: BoxIcon,
    // },
    {
      title: 'Search',
      url: '/search',
      icon: SearchIcon,
    },

    {
      title: 'Favourites',
      url: '/favourites',
      icon: HeartIcon,
    },
    {
      title: 'Status',
      url: '/status',
      icon: Circle,
    },
    {
      title: 'Categories',
      url: '/categories',
      icon: Component,
    },
  ],
  navGeneral: [
    {
      title: 'Analytics',
      url: '/analytics',
      icon: ChartColumnBig,
    },
    {
      title: 'History',
      url: '/history',
      icon: HistoryIcon,
    },
    {
      title: 'Notifications',
      url: '/notifications',
      icon: BellIcon,
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings,
    },
  ],
};

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href={'#'}>
                <ArrowUpCircleIcon />
                <span className="text-lg font-bold text-primary">
                  Quantify IMS
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <SidebarSeparator />
        <NavGeneral items={data.navGeneral} />
        <SidebarSeparator />
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter className="mb-20">
        <NavProfile />
        <ModeToggle />
      </SidebarFooter>
    </Sidebar>
  );
}

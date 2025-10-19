"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  HeartPulse,
  FileText,
  Bot,
  Users,
  Settings,
} from "lucide-react";
import { Logo } from "@/components/icons";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/symptom-tracker", label: "Symptom Tracker", icon: HeartPulse },
  { href: "/report-summarizer", label: "Report Summarizer", icon: FileText },
  { href: "/skincare-ai", label: "Skincare AI", icon: Bot },
  { href: "/volunteers", label: "Volunteers", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold font-headline">Cureva</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  isActive={
                    item.href === "/"
                      ? pathname === item.href
                      : pathname.startsWith(item.href)
                  }
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}

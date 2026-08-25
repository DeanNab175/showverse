"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  User,
  Briefcase,
  Wrench,
  Sparkles,
  Compass,
  Share2,
  Settings,
  FileText,
} from "lucide-react";

import { cn } from "@/lib/utils";

const ADMIN_NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/home", label: "Home", icon: Home },
  { href: "/admin/about", label: "About", icon: User },
  { href: "/admin/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/admin/skills", label: "Skills", icon: Sparkles },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/navbar", label: "Navbar Links", icon: Compass },
  { href: "/admin/social-links", label: "Social Links", icon: Share2 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/metadata", label: "Page Metadata", icon: FileText },
] as const;

function AdminSidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="h-full">
      <ul className="flex flex-row lg:flex-col gap-2 flex-wrap">
        {ADMIN_NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/admin" ? pathname === href : pathname.startsWith(href);

          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-primary text-button-primary-txt"
                    : "text-body-txt hover:bg-surface-bg"
                )}
              >
                <Icon className="size-5 shrink-0" />
                <span className="hidden lg:inline">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default AdminSidebarNav;

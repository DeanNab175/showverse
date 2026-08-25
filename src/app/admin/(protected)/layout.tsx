import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import Heading from "@/components/typography/heading";
import AdminSidebarNav from "@/components/admin/admin-sidebar-nav";

import SignOutButton from "./sign-out-button";

interface AdminLayoutProps {
  children: React.ReactNode;
}

async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await auth();

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-dvh bg-page-bg text-body-txt">
      <div className="container mx-auto px-3 grid gap-4 min-h-dvh lg:grid-cols-[auto_1fr]">
        <aside className="lg:col-start-1 lg:py-6">
          <div className="mb-6 hidden lg:block">
            <Heading level={2} className="text-2xl font-extrabold text-primary">
              ShowVerse
            </Heading>
            <p className="text-xs-plus text-body-txt/60">Admin</p>
          </div>

          <AdminSidebarNav />

          <div className="mt-6 hidden lg:block">
            <SignOutButton />
          </div>
        </aside>

        <div className="lg:col-start-2 flex flex-col min-h-dvh">
          <header className="flex items-center justify-between px-3 py-4 border-b border-body-txt/10 lg:hidden">
            <span className="text-xl font-medium">ShowVerse Admin</span>
            <SignOutButton />
          </header>

          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;

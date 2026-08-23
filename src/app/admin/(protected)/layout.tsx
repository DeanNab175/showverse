import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

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
      <header className="flex items-center justify-between px-6 py-4 border-b border-body-txt/10">
        <span className="font-medium">ShowVerse Admin</span>
        <SignOutButton />
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}

export default AdminLayout;

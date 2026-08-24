import Link from "next/link";

function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-lg font-medium mb-4">Dashboard</h1>
      <ul className="flex flex-col gap-2">
        <li>
          <Link href="/admin/navbar" className="hover:text-primary">
            Navbar links
          </Link>
        </li>
        <li>
          <Link href="/admin/social-links" className="hover:text-primary">
            Social links
          </Link>
        </li>
        <li>
          <Link href="/admin/settings" className="hover:text-primary">
            Site settings
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default AdminDashboardPage;

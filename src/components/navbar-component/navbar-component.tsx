"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import navbarLinks from "@/constants/navbar-links";

function NavbarComponent() {
  const pathname = usePathname();

  return (
    <nav className="border border-gray-200 h-full">
      <ul>
        {navbarLinks.map((link) => (
          <li key={link.id} className="text-center">
            <Link
              href={link.href}
              className={`link ${pathname === link.href ? "active" : ""}`}
            >
              <span className="block w-6 h-6">
                <i className={`icon ${link.iconClass}`}></i>
              </span>
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavbarComponent;

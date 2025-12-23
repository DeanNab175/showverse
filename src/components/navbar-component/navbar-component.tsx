"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import navbarLinks from "@/constants/navbar-links";

function NavbarComponent() {
  const pathname = usePathname();

  return (
    <nav className="main-nav h-full grid items-center">
      <ul className="flex flex-col gap-7">
        {navbarLinks.map((link) => (
          <li key={link.id} className="text-center">
            <Link
              href={link.href}
              className={`menu-nav-link link ${
                pathname === link.href ? "active" : ""
              }`}
            >
              <span
                className={`${link.iconFontSizeClass} icon w-12 h-12 mx-auto mb-2 rounded-xl flex items-center justify-center`}
              >
                <i className={link.iconClass}></i>
              </span>
              <span className="text-sm">{link.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavbarComponent;

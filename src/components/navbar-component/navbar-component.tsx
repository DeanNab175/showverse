"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";

import navbarLinks from "@/constants/navbar-links";

function NavbarComponent() {
  const pathname = usePathname();
  const navIndicatorRef = useRef<HTMLDivElement | null>(null);
  const hasInitialized = useRef(false);

  const isMobile = useMediaQuery({ maxWidth: 639 }); // < 640px
  const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 }); // 640px - 1023px
  const isDesktop = useMediaQuery({ minWidth: 1024 }); // >= 1024px

  // Additional granular breakpoints if needed
  const isSmallMobile = useMediaQuery({ maxWidth: 479 }); // < 480px
  const isLargeDesktop = useMediaQuery({ minWidth: 1280 }); // >= xl

  useGSAP(
    () => {
      const activeLink = document.querySelector(
        ".menu-nav-link.active .menu-nav-icon"
      );
      const indicator = navIndicatorRef.current;

      if (!activeLink || !indicator) return;

      const navRect = indicator.parentElement?.getBoundingClientRect();
      if (!navRect) return;

      const iconRect = activeLink.getBoundingClientRect();
      const targetY = iconRect.top - navRect.top;
      const targetX = iconRect.left - navRect.left;

      if (!hasInitialized.current) {
        gsap.fromTo(
          indicator,
          { x: 0, y: 0, opacity: 0 },
          {
            x: targetX,
            y: targetY,
            opacity: 1,
            duration: 0.6,
            ease: "bounce.out",
          }
        );
        hasInitialized.current = true;
      } else {
        gsap.to(indicator, {
          x: targetX,
          y: targetY,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
        });
      }
    },
    { dependencies: [pathname, isMobile, isTablet, isDesktop] }
  );

  return (
    <nav className="main-nav h-full grid justify-center lg:items-center relative isolate">
      <div
        ref={navIndicatorRef}
        className="active-nav-indicator -z-10 w-12 h-12 rounded-xl absolute top-0 left-0 bg-primary opacity-0"
      ></div>

      <ul className="flex flex-row lg:flex-col gap-7">
        {navbarLinks.map((link) => {
          const isActiveLink = pathname === link.href;

          return (
            <li key={link.id} className="text-center">
              <Link
                href={link.href}
                className={`menu-nav-link link ${isActiveLink ? "active" : ""}`}
              >
                <span
                  className={`${link.iconFontSizeClass} ${isActiveLink ? "text-navbar-link-icon-active" : ""} menu-nav-icon text-body-txt w-12 h-12 mx-auto mb-2 rounded-xl flex items-center justify-center`}
                >
                  <i className={link.iconClass}></i>
                </span>
                <span className="menu-nav-text text-sm text-body-txt">
                  {link.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavbarComponent;

/* 
  // For horizontal layout: If you need it to work for both horizontal (mobile) and vertical (desktop) layouts, you can enhance it:
  useGSAP(() => {
    const activeLink = document.querySelector('.menu-nav-link.active .icon');
    
    if (activeLink && navIndicatorRef.current) {
      const iconRect = activeLink.getBoundingClientRect();
      const navRect = navIndicatorRef.current.parentElement?.getBoundingClientRect();
      
      if (navRect) {
        const targetY = iconRect.top - navRect.top;
        const targetX = iconRect.left - navRect.left;
        
        // Check if layout is horizontal or vertical
        const isHorizontal = window.innerWidth < 1024; // lg breakpoint
        
        gsap.to(navIndicatorRef.current, {
          x: isHorizontal ? targetX : 0,
          y: isHorizontal ? 0 : targetY,
          duration: 0.6,
          ease: "power2.inOut",
        });
      }
    }
  }, { dependencies: [pathname] });
  */

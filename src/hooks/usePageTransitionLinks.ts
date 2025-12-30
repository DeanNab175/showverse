import { useEffect } from "react";

interface UsePageTransitionLinksProps {
  currentPathname: string;
  isTransitioning: React.RefObject<boolean>;
  hasPlayedInitial: React.RefObject<boolean>;
  onNavigate: (url: string) => void;
  linksSelector?: string;
}

export function usePageTransitionLinks({
  currentPathname,
  isTransitioning,
  hasPlayedInitial,
  onNavigate,
  linksSelector = ".menu-nav-link",
}: UsePageTransitionLinksProps) {
  useEffect(() => {
    const handleClick = (e: Event) => {
      e.preventDefault();
      const href = (e.currentTarget as HTMLAnchorElement).getAttribute("href");

      if (!href) return;

      const url = new URL(href, window.location.origin).pathname;

      if (url !== currentPathname && !isTransitioning.current) {
        isTransitioning.current = true;
        hasPlayedInitial.current = false;
        onNavigate(url);
      }
    };

    const links = document.querySelectorAll(linksSelector);
    links.forEach((link) => link.addEventListener("click", handleClick));

    return () => {
      links.forEach((link) => link.removeEventListener("click", handleClick));
    };
  }, [currentPathname, isTransitioning, hasPlayedInitial, onNavigate]);
}

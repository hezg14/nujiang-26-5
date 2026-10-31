"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { isAnchor, path } from "@/lib/paths";
import { useRafScroll } from "@/lib/useRafScroll";
import type { Dict, NavItem } from "@/lib/types";

/** Anchors scroll within the home page; route items need the client router. */
function NavItemLink({
  item,
  locale,
  active,
  className,
  onClick,
  tabIndex,
}: {
  item: NavItem;
  locale: string;
  active: boolean;
  className: string;
  onClick?: () => void;
  tabIndex?: number;
}) {
  const href = path(locale, item.href);
  const ariaCurrent = active ? (isAnchor(item.href) ? "true" : "page") : undefined;
  const shared = {
    "data-active": active,
    "aria-current": ariaCurrent,
    className,
    onClick,
    tabIndex,
  } as const;

  return isAnchor(item.href) ? (
    <a href={href} {...shared}>
      {item.label}
    </a>
  ) : (
    <Link href={href} {...shared}>
      {item.label}
    </Link>
  );
}

export default function SiteHeader({
  dict,
  locale,
}: {
  dict: Dict;
  locale: string;
}) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [scheme, setScheme] = useState<"light" | "dark">("light");
  const headerRef = useRef<HTMLElement | null>(null);
  const bandsRef = useRef<HTMLElement[]>([]);
  const pathname = usePathname();

  const sectionIds = dict.nav
    .filter((n) => isAnchor(n.href))
    .map((n) => n.href.slice(1));

  // Dark bands are collected once per page — querying the DOM on every frame
  // would be the expensive part of the scheme probe.
  useEffect(() => {
    bandsRef.current = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scheme='dark']")
    );
  }, [pathname]);

  // Scroll spy: the last section whose top has passed a probe line a third of
  // the way down the viewport. Computed from scroll position rather than
  // IntersectionObserver, which misses transitions on anchor jumps.
  useRafScroll(() => {
    const onHome = pathname === path(locale) || pathname === `${path(locale)}/`;
    if (!onHome) {
      setActiveId("");
      return;
    }

    const probe = window.scrollY + window.innerHeight * 0.32;
    let current = "";
    for (const id of sectionIds) {
      const section = document.getElementById(id);
      if (section && section.offsetTop <= probe) current = id;
    }
    setActiveId((prev) => (prev === current ? prev : current));
  }, pathname);

  // Colour scheme: flip the token set while a dark band sits under the bar.
  useRafScroll(() => {
    const header = headerRef.current;
    if (!header) return;

    const probe = header.getBoundingClientRect().bottom - 4;
    const overDark = bandsRef.current.some((band) => {
      const rect = band.getBoundingClientRect();
      return rect.top <= probe && rect.bottom > probe;
    });
    const next = overDark ? "dark" : "light";
    setScheme((prev) => (prev === next ? prev : next));
  }, pathname);

  const isActive = (href: string) => {
    if (isAnchor(href)) return activeId === href.slice(1);
    return pathname.startsWith(path(locale, href));
  };

  const navClassName = (active: boolean) =>
    `nav-link text-sm ${active ? "text-ink" : "text-ink-2 hover:text-ink"}`;

  return (
    <header
      ref={headerRef}
      data-header-scheme={scheme}
      className="site-header sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-4">
        <Link href={path(locale)} className="flex items-baseline gap-2">
          <span className="font-serif text-xl font-semibold tracking-tight">
            {dict.brand.name}
          </span>
          <span className="font-mono text-micro uppercase tracking-[0.25em] text-ink-3">
            {dict.brand.chinese}
          </span>
          <span
            aria-hidden
            className="font-mono text-micro tabular-nums tracking-[0.18em] text-accent"
          >
            26.5
          </span>
        </Link>

        <nav className="hidden items-center gap-5 md:flex lg:gap-6">
          {dict.nav.map((item) => (
            <NavItemLink
              key={item.href}
              item={item}
              locale={locale}
              active={isActive(item.href)}
              className={navClassName(isActive(item.href))}
            />
          ))}
          <LanguageSwitcher locale={locale} />
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher locale={locale} />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="relative -mr-2 h-9 w-9 text-ink-2 transition-colors hover:text-ink"
          >
            <span
              aria-hidden
              className={`absolute left-2 right-2 h-[1.5px] rounded-full bg-current transition-all duration-300 ${
                open ? "top-1/2 rotate-45" : "top-[13px]"
              }`}
            />
            <span
              aria-hidden
              className={`absolute left-2 right-2 h-[1.5px] rounded-full bg-current transition-all duration-300 ${
                open ? "top-1/2 -rotate-45" : "bottom-[13px]"
              }`}
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={`overflow-hidden border-line bg-paper transition-[max-height,opacity] duration-300 md:hidden ${
          open ? "max-h-96 border-t opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 py-2">
          {dict.nav.map((item) => (
            <NavItemLink
              key={item.href}
              item={item}
              locale={locale}
              active={isActive(item.href)}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className={`block border-l-2 py-2.5 pl-3 text-sm transition-colors ${
                isActive(item.href)
                  ? "border-accent text-ink"
                  : "border-transparent text-ink-2"
              }`}
            />
          ))}
        </div>
      </div>
    </header>
  );
}

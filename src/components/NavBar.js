"use client";

import logo from "@/assets/images/arphatech_logo.png";
import { dashboardRoutes } from "@/constants/dashboardRoutes";
import { navMenu as navigation } from "@/constants/navMenu";
import {
  FORGOT_PASSWORD_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REGISTER_ROUTE,
  REGISTER_STUDENT_ROUTE,
  REGISTER_TEACHER_ROUTE,
} from "@/constants/routes";
import { useAuthStore } from "@/stores/authStore";
import {
  ArrowRight,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  UserRound,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Profile from "./Profile";

const NavBar = () => {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const hideNavBarRoutes = [
    LOGIN_ROUTE,
    REGISTER_ROUTE,
    FORGOT_PASSWORD_ROUTE,
    REGISTER_STUDENT_ROUTE,
    REGISTER_TEACHER_ROUTE,
  ];

  const handleLogout = async () => {
    const message = await logout();
    console.log(message);
    toast.success(message);
  };

  const dashboardHref =
    dashboardRoutes[user?.role?.toLowerCase()] || "/dashboard";

  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      setMobileOpen(false);
    }
  }, [pathname]);

  const isActive = (href) => {
    if (href === HOME_ROUTE) return pathname === HOME_ROUTE;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const linkClass = (href) =>
    `inline-flex w-fit items-center gap-2 rounded-lg px-3 py-0.5 text-sm font-medium
    transition-colors duration-200 relative
    after:absolute after:bottom-0 after:left-3 after:h-0.5
    after:bg-primary after:transition-all after:duration-300
    ${
      isActive(href)
        ? "text-primary after:w-[calc(100%-1.5rem)]"
        : "text-slate-600 hover:text-primary after:w-0 hover:after:w-[calc(100%-1.5rem)]"
    }`;

  const submitSearch = (event) => {
    event.preventDefault();

    const query = searchValue.trim();
    if (!query) return;

    router.push(`/courses?search=${encodeURIComponent(query)}`);
  };

  if (hideNavBarRoutes.includes(pathname)) return null;

  return (
    <>
      <header className="sticky top-4 z-50 left-0 right-0 mx-auto w-[95%] rounded-3xl border-slate-200/80 bg-white drop-shadow-lg backdrop-blur-xl">
        {/* Top navigation */}
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-12 items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href={HOME_ROUTE}
              className="group flex shrink-0 items-center gap-2.5"
              aria-label="EduLearn home"
            >
              <Image
                src={logo}
                alt="Logo"
                width="auto"
                height="auto"
                loading="eager"
                className="h-10 w-10"
              />
              <span className="text-xl font-extrabold tracking-tight text-primary sm:text-2xl">
                EduLearn
              </span>
            </Link>

            {/* Desktop navigation links */}
            <div className="hidden border-slate-100 lg:block">
              <nav
                aria-label="Main navigation"
                className="mx-auto flex max-w-360 items-center gap-1 px-4 py-2 sm:px-6 lg:px-8"
              >
                {navigation.map((item) => {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={linkClass(item.href)}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center justify-center gap-2 md:pl-48 md:mr-4 lg:mr-0 lg:pl-0">
              {/* Desktop search */}
              <div className="hidden max-w-xl items-center rounded-2xl border border-slate-200 focus-within:border-slate-500 bg-slate-50 px-3 transition-all md:flex">
                <Search size={19} className="shrink-0 text-slate-400" />
                <input
                  type="search"
                  name="search"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="Search..."
                  aria-label="Search"
                  className="h-8 w-full bg-transparent px-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>

              {/* Desktop authentication */}
              <div className="hidden shrink-0 items-center gap-3 md:flex">
                {user ? (
                  <Profile />
                ) : (
                  <>
                    <Link
                      href={LOGIN_ROUTE}
                      className="rounded-2xl px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200 hover:text-primary"
                    >
                      Log In
                    </Link>

                    <Link
                      href={REGISTER_ROUTE}
                      className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-2 text-sm font-semibold text-white shadow-md shadow-primary/15 transition-all hover:bg-primary/80 hover:shadow-lg"
                    >
                      Get Started
                      <ArrowRight size={16} />
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition-colors hover:border-primary/30 hover:bg-primary/5 hover:text-primary lg:hidden"
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
            >
              {mobileOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile backdrop and dropdown */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-[2px] lg:hidden"
          />

          {/* Mobile Dropdown */}
          <div
            id="mobile-navigation"
            className="absolute left-0 right-0 top-20 z-50 mx-auto mt-3 flex w-[95%] flex-col gap-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-2xl lg:hidden"
          >
            {/* Mobile Search */}
            <div className="relative md:hidden">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <form onSubmit={submitSearch}>
                <input
                  type="search"
                  name="search"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  placeholder="Search courses..."
                  aria-label="Search courses"
                  className="h-11 w-full rounded-full border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none transition focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20"
                />
              </form>
            </div>

            {/* Navigation Links */}
            <nav
              aria-label="Mobile navigation"
              className="border-t border-slate-100 pt-3"
            >
              <p className="mb-3 px-2 text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                Explore
              </p>

              <ul className="flex flex-col gap-1">
                {navigation.map((item) => {
                  const active = isActive(item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between rounded-xl px-3 py-3 transition-colors ${
                          active
                            ? "bg-primary/[0.07] font-semibold text-primary"
                            : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                        }`}
                      >
                        <span className="text-sm font-semibold">
                          {item.label}
                        </span>

                        <ChevronRight
                          size={17}
                          className={active ? "text-primary" : "text-slate-300"}
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Authenticated User Links */}
            {user && (
              <div className="space-y-1 border-t border-slate-100 pt-3">
                <Link
                  href={dashboardHref}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl bg-amber-50 px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-amber-100"
                >
                  <LayoutDashboard size={19} className="text-primary" />
                  Dashboard
                </Link>

                <Link
                  href={PROFILE_ROUTE}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-primary"
                >
                  <UserRound size={19} />
                  My Profile
                </Link>
              </div>
            )}

            {/* Authentication Footer */}
            <div className="border-t border-slate-100 pt-4">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <UserRound size={21} />
                    </span>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-slate-800">
                        {user.full_name || "My Account"}
                      </p>

                      <p className="truncate text-xs capitalize text-slate-500">
                        {user.role || "Member"}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-100 bg-white py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut size={17} />
                    Log Out
                  </button>
                  )
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 md:hidden">
                  <Link
                    href={LOGIN_ROUTE}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary/30 hover:text-primary"
                  >
                    Log In
                  </Link>

                  <Link
                    href={REGISTER_ROUTE}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90"
                  >
                    Get Started
                    <ArrowRight size={16} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default NavBar;

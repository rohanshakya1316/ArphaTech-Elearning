"use client";

import {
  GraduationCap,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  dashboardNavigation,
  roleLabels,
} from "@/constants/dashboardNavigation";
import Image from "next/image";

const SidebarNavItem = ({ item, pathname, collapsed, onNavigate }) => {
  const Icon = item.icon;

  const isActive =
    pathname === item.href ||
    (item.href !== "/student/dashboard" &&
      item.href !== "/teacher/dashboard" &&
      item.href !== "/admin/dashboard" &&
      pathname.startsWith(`${item.href}/`));

  // Dashboard routes should also be active on their nested pages.
  const isDashboard = [
    "/student/dashboard",
    "/teacher/dashboard",
    "/admin/dashboard",
  ].includes(item.href);

  const active = isActive || (isDashboard && pathname.startsWith(item.href));

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      title={collapsed ? item.label : undefined}
      className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
        active
          ? "bg-primary/10 text-primary"
          : "text-body hover:bg-background hover:text-primary"
      } ${collapsed ? "justify-center px-2" : ""}`}
    >
      {active && (
        <span className="absolute left-0 top-1/2 h-6 w-0.75 -translate-y-1/2 rounded-r-full bg-primary" />
      )}

      <Icon size={19} strokeWidth={active ? 2.2 : 1.8} className="shrink-0" />

      {!collapsed && (
        <>
          <span className="flex-1 truncate">{item.label}</span>

          {item.badge && (
            <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-white">
              {item.badge}
            </span>
          )}
        </>
      )}
    </Link>
  );
};

export default function DashboardSidebar({
  role,
  user = {},
  mobileOpen = false,
  onClose,
  onLogout,
  collapsed = false,
  onToggleCollapsed,
}) {
  const pathname = usePathname();

  const normalizedRole = role?.toLowerCase();
  const navigation = dashboardNavigation[normalizedRole] || [];

  const displayName = user.full_name || user.name || "User";
  const email = user.email || "";
  const profileImage = user.profile_image || user.profile_picture;

  const handleNavigate = () => {
    onClose?.();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-dark-bg/50 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex flex-col
          border-r border-slate-200 bg-card
          transition-all duration-300 ease-in-out
          ${collapsed ? "w-19" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Brand */}
        <div
          className={`flex h-19 shrink-0 items-center border-b border-slate-100 ${
            collapsed ? "justify-center px-3" : "justify-between px-5"
          }`}
        >
          <Link
            href="/"
            onClick={handleNavigate}
            className="flex min-w-0 items-center gap-2.5"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
              <GraduationCap size={22} strokeWidth={2} />
            </div>

            {!collapsed && (
              <div className="min-w-0">
                <p className="text-lg font-bold tracking-tight text-heading">
                  Edu<span className="text-primary">Learn</span>
                </p>
                <p className="text-[10px] font-medium uppercase tracking-[1.4px] text-muted">
                  {roleLabels[normalizedRole] || "Dashboard"}
                </p>
              </div>
            )}
          </Link>

          {/* Mobile close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-body hover:bg-background lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-7 overflow-y-auto overflow-x-hidden px-3 py-6">
          {navigation.map((group) => (
            <div key={group.title}>
              {!collapsed && (
                <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-[1.4px] text-muted">
                  {group.title}
                </p>
              )}

              <div className="space-y-1">
                {group.items.map((item) => (
                  <SidebarNavItem
                    key={item.href}
                    item={item}
                    pathname={pathname}
                    collapsed={collapsed}
                    onNavigate={handleNavigate}
                  />
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="shrink-0 border-t border-slate-100 p-3">
          <div
            className={`flex items-center gap-3 rounded-lg p-2 ${
              collapsed ? "justify-center" : ""
            }`}
          >
            {profileImage ? (
              <Image
                src={profileImage}
                alt={displayName}
                className="h-9 w-9 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}

            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-heading">
                  {displayName}
                </p>
                <p className="truncate text-xs text-muted">
                  {email || roleLabels[normalizedRole]}
                </p>
              </div>
            )}

            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                title="Logout"
                aria-label="Logout"
                className="shrink-0 rounded-lg p-2 text-muted transition-colors hover:bg-red-50 hover:text-error"
              >
                <LogOut size={17} />
              </button>
            )}
          </div>

          {/* Desktop collapse control */}
          <button
            type="button"
            onClick={onToggleCollapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="mt-3 hidden w-full items-center justify-center gap-2 rounded-lg border border-slate-200 py-2 text-xs font-medium text-body transition-colors hover:bg-background hover:text-primary lg:flex"
          >
            {collapsed ? (
              <PanelLeftOpen size={17} />
            ) : (
              <>
                <PanelLeftClose size={17} />
                Collapse sidebar
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}

"use client";

import { useState } from "react";
import { Menu, Bell } from "lucide-react";
import DashboardSidebar from "./DashboardSidebar";

export default function DashboardLayout({ role, user, onLogout, children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar
        role={role}
        user={user}
        onLogout={onLogout}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        collapsed={collapsed}
        onToggleCollapsed={handleToggleSidebar}
      />

      <div
        className={`min-h-screen transition-[padding] duration-300 ${
          collapsed ? "lg:pl-19" : "lg:pl-64"
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-19 items-center justify-between border-b border-slate-200 bg-card px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open sidebar"
              className="rounded-lg p-2 text-body hover:bg-background hover:text-primary lg:hidden"
            >
              <Menu size={22} />
            </button>

            <div>
              <h2 className="text-sm font-semibold text-heading">
                {role.charAt(0).toUpperCase() + role.slice(1)} Dashboard
              </h2>
              <p className="hidden text-xs text-muted sm:block">
                Manage your workspace
              </p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Notifications"
            className="relative rounded-lg p-2 text-body hover:bg-background hover:text-primary"
          >
            <Bell size={20} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-error" />
          </button>
        </header>

        {/* Page content */}
        <main className="mx-auto w-full max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="mt-9 border-t border-slate-200 py-5">
          <p className="text-center text-xs text-muted">
            © 2026 EduLearn. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}

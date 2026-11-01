import { dashboardRoutes } from "@/constants/dashboardRoutes";
import { PROFILE_ROUTE } from "@/constants/routes";
import { useAuthStore } from "@/stores/authStore";
import { ChevronDown, LayoutDashboard, LogOut, UserRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

const Profile = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [profileOpen, setProfileOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setProfileOpen(false);
    };
    document.addEventListener("mousedown", closeDropdown);
    return () => document.removeEventListener("mousedown", closeDropdown);
  }, []);

  const handleLogout = async () => {
    const message = await logout();
    console.log(message);
    toast.success(message);
  };

  const dashboardHref =
    dashboardRoutes[user?.role?.toLowerCase()] || "/dashboard";
  return (
    <>
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          onClick={() => setProfileOpen(!profileOpen)}
          aria-expanded={profileOpen}
          aria-label="Open profile menu"
          className="flex items-center gap-2 rounded-xl p-1.5 pr-3"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
            <UserRound size={20} />
          </span>

          <span className="max-w-27.5 truncate text-sm font-semibold text-slate-700">
            {user.full_name || "My Account"}
          </span>

          <ChevronDown
            size={16}
            className={`text-slate-400 transition-transform ${
              profileOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {profileOpen && (
          <div className="absolute right-0 top-full mt-3 w-56 overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-xl shadow-slate-900/10">
            <Link
              href={PROFILE_ROUTE}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary"
            >
              <UserRound size={17} />
              My Profile
            </Link>

            <Link
              href={dashboardHref}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary"
            >
              <LayoutDashboard size={17} />
              My Dashboard
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-600 hover:bg-red-50"
            >
              <LogOut size={17} />
              Log Out
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;

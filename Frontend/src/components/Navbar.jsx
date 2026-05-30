import { LogOut, Moon, Sun, UserCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";

function Navbar({ userName }) {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-[#080c16]/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/dashboard" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-500 text-lg font-black text-white shadow-lg shadow-cyan-500/20 dark:bg-cyan-400 dark:text-slate-950">
            TM
          </span>
          <div>
            <p className="text-base font-semibold text-slate-950 dark:text-white">
              Task Manager
            </p>
            <p className="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">
              Focused workspace
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 transition hover:border-cyan-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <div className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 sm:flex dark:border-white/10 dark:bg-white/5">
            <UserCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
            <div className="text-right">
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                {userName || "User"}
              </p>
              <p className="text-xs text-slate-500">Signed in</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-700 dark:border-white/10 dark:text-slate-200 dark:hover:border-red-400/60 dark:hover:bg-red-500/10 dark:hover:text-red-200"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

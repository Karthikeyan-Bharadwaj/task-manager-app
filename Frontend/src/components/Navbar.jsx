import { Link, useNavigate } from "react-router-dom";

function Navbar({ userName }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <header className="border-b border-white/10 bg-[#080c16]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/dashboard" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-cyan-400 text-lg font-black text-slate-950">
            TM
          </span>
          <div>
            <p className="text-base font-semibold text-white">Task Manager</p>
            <p className="hidden text-xs text-slate-400 sm:block">
              Focused workspace
            </p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-slate-200">
              {userName || "User"}
            </p>
            <p className="text-xs text-slate-500">Signed in</p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-red-400/60 hover:bg-red-500/10 hover:text-red-200"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

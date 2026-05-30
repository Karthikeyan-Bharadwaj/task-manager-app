import { useState } from "react";
import {
  CheckCircle2,
  ClipboardList,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Moon,
  Sun,
  Timer,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import api, { getErrorMessage } from "../services/api";

function Login() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await api.post("/auth/login", form);
      localStorage.setItem("token", data.token);

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(getErrorMessage(err, "Unable to login"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950 transition dark:bg-[#070a12] dark:text-white">
      <div className="mx-auto grid min-h-screen w-full max-w-6xl items-center gap-8 px-4 py-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <section className="hidden lg:block">
          <div className="mb-7 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-lg bg-cyan-500 font-black text-white shadow-lg shadow-cyan-500/25 dark:bg-cyan-400 dark:text-slate-950">
              TM
            </div>
            <div>
              <p className="text-lg font-bold">Task Manager</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                A sharper workspace for daily execution
              </p>
            </div>
          </div>

          <h1 className="max-w-xl text-5xl font-black leading-tight tracking-normal text-slate-950 dark:text-white">
            Manage tasks, track progress, and finish work on time.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 dark:text-slate-400">
            Sign in to organize your daily work, update task stages, and keep
            everything in one focused dashboard.
          </p>

          <div className="mt-8 grid max-w-xl gap-4 sm:grid-cols-3">
            {[
              { icon: ClipboardList, label: "Create tasks" },
              { icon: Timer, label: "Track progress" },
              { icon: CheckCircle2, label: "Mark complete" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/5"
              >
                <Icon className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
                <p className="mt-3 text-sm font-semibold text-slate-800 dark:text-slate-100">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full max-w-md justify-self-center">
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-cyan-500 font-black text-white dark:bg-cyan-400 dark:text-slate-950">
                TM
              </div>
              <p className="font-bold">Task Manager</p>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:border-cyan-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/60 dark:border-white/10 dark:bg-[#0b1120] dark:shadow-black/30"
        >
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-950 dark:text-white">
                Welcome back
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Sign in to manage your tasks.
              </p>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="hidden h-10 w-10 shrink-0 place-items-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700 transition hover:border-cyan-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 lg:grid"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-400/30 dark:bg-red-500/10 dark:text-red-200">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 dark:border-white/10 dark:bg-[#111827] dark:text-white dark:placeholder:text-slate-600 dark:focus:border-cyan-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-11 pr-12 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 dark:border-white/10 dark:bg-[#111827] dark:text-white dark:placeholder:text-slate-600 dark:focus:border-cyan-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-lg text-slate-500 transition hover:bg-slate-200/70 dark:text-slate-400 dark:hover:bg-white/5"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-cyan-500 px-4 py-3 font-bold text-white transition hover:bg-cyan-600 disabled:opacity-60 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
            New here?{" "}
            <Link
              to="/register"
              className="font-semibold text-cyan-600 hover:text-cyan-700 dark:text-cyan-300 dark:hover:text-cyan-200"
            >
              Create an account
            </Link>
          </p>
        </form>
      </section>
      </div>
    </main>
  );
}

export default Login;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api, { getErrorMessage } from "../services/api";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const { data } = await api.post("/auth/register", form);
      setSuccess(data.message || "Account created successfully");
      setTimeout(() => navigate("/login"), 700);
    } catch (err) {
      setError(getErrorMessage(err, "Unable to create account"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[#070a12] px-4 py-10">
      <section className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-lg bg-cyan-400 font-black text-slate-950">
            TM
          </div>
          <h1 className="text-3xl font-bold text-white">Create account</h1>
          <p className="mt-2 text-sm text-slate-400">
            Start organizing your work in minutes.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-white/10 bg-[#0b1120] p-6 shadow-2xl shadow-black/30"
        >
          {error && (
            <div className="mb-4 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
              {success}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                autoComplete="name"
                placeholder="Your name"
                className="w-full rounded-lg border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-200"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength="6"
                autoComplete="new-password"
                placeholder="At least 6 characters"
                className="w-full rounded-lg border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-lg bg-cyan-400 px-4 py-3 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>

          <p className="mt-5 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-cyan-300 hover:text-cyan-200"
            >
              Login
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default Register;

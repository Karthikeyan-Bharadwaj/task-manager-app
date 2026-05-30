import { useEffect, useState } from "react";

const stages = ["Todo", "In Progress", "Done"];

function TaskModal({ open, task, onClose, onSubmit, loading }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    stage: "Todo",
  });

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title || "",
        description: task.description || "",
        stage: task.stage || "Todo",
      });
    } else {
      setForm({
        title: "",
        description: "",
        stage: "Todo",
      });
    }
  }, [task, open]);

  if (!open) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-lg border border-white/10 bg-[#0b1120] shadow-2xl shadow-black/40">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-white">
              {task ? "Edit task" : "Create task"}
            </h2>
            <p className="text-sm text-slate-400">
              Keep the details concise and actionable.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-xl leading-none text-slate-300 transition hover:bg-white/5 disabled:opacity-60"
            aria-label="Close modal"
          >
            x
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Title
            </label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              placeholder="Design dashboard layout"
              className="w-full rounded-lg border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              placeholder="Add context, blockers, or next actions."
              className="w-full resize-none rounded-lg border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
            />
          </div>

          <div>
            <label
              htmlFor="stage"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Stage
            </label>
            <select
              id="stage"
              name="stage"
              value={form.stage}
              onChange={handleChange}
              className="w-full rounded-lg border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none transition focus:border-cyan-400"
            >
              {stages.map((stage) => (
                <option key={stage} value={stage}>
                  {stage}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border border-white/10 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/5 disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-60"
            >
              {loading ? "Saving..." : task ? "Save changes" : "Create task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;

import { useEffect, useState } from "react";
import { AlignLeft, ClipboardPen, Layers3, Save, X } from "lucide-react";

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
      <div className="w-full max-w-xl rounded-lg border border-slate-200 bg-white shadow-2xl shadow-black/20 dark:border-white/10 dark:bg-[#0b1120] dark:shadow-black/40">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-white/10">
          <div>
            <h2 className="inline-flex items-center gap-2 text-lg font-semibold text-slate-950 dark:text-white">
              <ClipboardPen className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
              {task ? "Edit task" : "Create task"}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Keep the details concise and actionable.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100 disabled:opacity-60 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
            aria-label="Close modal"
            title="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-5">
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Title
            </label>
            <div className="relative">
              <ClipboardPen className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="Design dashboard layout"
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 dark:border-white/10 dark:bg-[#111827] dark:text-white dark:placeholder:text-slate-600 dark:focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Description
            </label>
            <div className="relative">
              <AlignLeft className="pointer-events-none absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                placeholder="Add context, blockers, or next actions."
                className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 dark:border-white/10 dark:bg-[#111827] dark:text-white dark:placeholder:text-slate-600 dark:focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="stage"
              className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
            >
              Stage
            </label>
            <div className="relative">
              <Layers3 className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <select
                id="stage"
                name="stage"
                value={form.stage}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-slate-950 outline-none transition focus:border-cyan-500 dark:border-white/10 dark:bg-[#111827] dark:text-white dark:focus:border-cyan-400"
              >
                {stages.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-cyan-600 disabled:opacity-60 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
            >
              <Save className="h-4 w-4" />
              {loading ? "Saving..." : task ? "Save changes" : "Create task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;

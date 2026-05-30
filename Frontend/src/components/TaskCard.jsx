import { CalendarDays, Pencil, Trash2 } from "lucide-react";

const stageStyles = {
  Todo: "border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-500/30 dark:bg-slate-500/10 dark:text-slate-200",
  "In Progress":
    "border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-400/30 dark:bg-cyan-400/10 dark:text-cyan-200",
  Done: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-200",
};

function TaskCard({ task, onEdit, onDelete, deleting }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-cyan-300 hover:shadow-md dark:border-white/10 dark:bg-[#0d1424] dark:shadow-lg dark:shadow-black/20 dark:hover:border-cyan-400/35">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="break-words text-lg font-semibold text-slate-950 dark:text-white">
            {task.title}
          </h3>
          <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-slate-500">
            <CalendarDays className="h-3.5 w-3.5" />
            {new Date(task.updatedAt || task.createdAt).toLocaleDateString()}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full border px-3 py-1 text-xs font-semibold ${
            stageStyles[task.stage] || stageStyles.Todo
          }`}
        >
          {task.stage}
        </span>
      </div>

      <p className="mt-4 min-h-12 break-words text-sm leading-6 text-slate-600 dark:text-slate-300">
        {task.description || "No description added."}
      </p>

      <div className="mt-5 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700 dark:border-white/10 dark:text-slate-200 dark:hover:border-cyan-400/50 dark:hover:bg-cyan-400/10 dark:hover:text-cyan-100"
        >
          <Pencil className="h-4 w-4" />
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(task._id)}
          disabled={deleting}
          className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 transition hover:border-red-300 hover:bg-red-50 disabled:opacity-60 dark:border-red-400/20 dark:text-red-200 dark:hover:border-red-400/60 dark:hover:bg-red-500/10"
        >
          <Trash2 className="h-4 w-4" />
          {deleting ? "Deleting" : "Delete"}
        </button>
      </div>
    </article>
  );
}

export default TaskCard;

const stageStyles = {
  Todo: "border-slate-500/30 bg-slate-500/10 text-slate-200",
  "In Progress": "border-cyan-400/30 bg-cyan-400/10 text-cyan-200",
  Done: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
};

function TaskCard({ task, onEdit, onDelete, deleting }) {
  return (
    <article className="rounded-lg border border-white/10 bg-[#0d1424] p-5 shadow-lg shadow-black/20 transition hover:border-cyan-400/35">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="break-words text-lg font-semibold text-white">
            {task.title}
          </h3>
          <p className="mt-1 text-xs text-slate-500">
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

      <p className="mt-4 min-h-12 break-words text-sm leading-6 text-slate-300">
        {task.description || "No description added."}
      </p>

      <div className="mt-5 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/50 hover:bg-cyan-400/10 hover:text-cyan-100"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => onDelete(task._id)}
          disabled={deleting}
          className="rounded-lg border border-red-400/20 px-3 py-2 text-sm font-semibold text-red-200 transition hover:border-red-400/60 hover:bg-red-500/10 disabled:opacity-60"
        >
          {deleting ? "Deleting" : "Delete"}
        </button>
      </div>
    </article>
  );
}

export default TaskCard;

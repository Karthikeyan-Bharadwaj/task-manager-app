import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  CircleDashed,
  ClipboardList,
  ListTodo,
  LoaderCircle,
  Plus,
  Sparkles,
} from "lucide-react";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import api, { getErrorMessage } from "../services/api";

const stages = ["Todo", "In Progress", "Done"];

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  }, []);

  const groupedTasks = useMemo(() => {
    return stages.reduce((groups, stage) => {
      groups[stage] = tasks.filter((task) => task.stage === stage);
      return groups;
    }, {});
  }, [tasks]);

  const fetchTasks = async () => {
    setError("");
    setLoading(true);

    try {
      const { data } = await api.get("/tasks");
      setTasks(data.tasks || []);
    } catch (err) {
      setError(getErrorMessage(err, "Unable to fetch tasks"));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const openCreateModal = () => {
    setSelectedTask(null);
    setModalOpen(true);
  };

  const openEditModal = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;
    setModalOpen(false);
    setSelectedTask(null);
  };

  const handleSubmitTask = async (payload) => {
    setError("");
    setSaving(true);

    try {
      if (selectedTask) {
        const { data } = await api.put(`/tasks/${selectedTask._id}`, payload);
        setTasks((current) =>
          current.map((task) =>
            task._id === selectedTask._id ? data.task : task
          )
        );
      } else {
        const { data } = await api.post("/tasks", payload);
        setTasks((current) => [data.task, ...current]);
      }

      closeModal();
    } catch (err) {
      setError(getErrorMessage(err, "Unable to save task"));
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const confirmed = window.confirm("Delete this task?");
    if (!confirmed) return;

    setError("");
    setDeletingId(taskId);

    try {
      await api.delete(`/tasks/${taskId}`);
      setTasks((current) => current.filter((task) => task._id !== taskId));
    } catch (err) {
      setError(getErrorMessage(err, "Unable to delete task"));
    } finally {
      setDeletingId("");
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = groupedTasks.Done?.length || 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 transition dark:bg-[#070a12] dark:text-white">
      <Navbar userName={user.name} />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="mb-6 flex flex-col gap-4 border-b border-slate-200 pb-6 dark:border-white/10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-300">
              <Sparkles className="h-4 w-4" />
              Dashboard
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white sm:text-4xl">
              Your tasks
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              Track every task from first idea to done, with each item securely
              scoped to your account.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-cyan-600 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300 sm:w-auto"
          >
            <Plus className="h-5 w-5" />
            New Task
          </button>
        </section>

        <section className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#0b1120]">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400">Total</p>
              <ClipboardList className="h-5 w-5 text-slate-500 dark:text-slate-400" />
            </div>
            <p className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">
              {totalTasks}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#0b1120]">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                In Progress
              </p>
              <LoaderCircle className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
            </div>
            <p className="mt-2 text-3xl font-bold text-cyan-600 dark:text-cyan-200">
              {groupedTasks["In Progress"]?.length || 0}
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#0b1120]">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500 dark:text-slate-400">Done</p>
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
            </div>
            <p className="mt-2 text-3xl font-bold text-emerald-600 dark:text-emerald-200">
              {completedTasks}
            </p>
          </div>
        </section>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-400/30 dark:bg-red-500/10 dark:text-red-200">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid min-h-72 place-items-center rounded-lg border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#0b1120]">
            <p className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
              <LoaderCircle className="h-5 w-5 animate-spin" />
              Loading tasks...
            </p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="grid min-h-72 place-items-center rounded-lg border border-dashed border-slate-300 bg-white px-6 text-center shadow-sm dark:border-white/15 dark:bg-[#0b1120]">
            <div>
              <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-lg bg-cyan-50 text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-300">
                <ListTodo className="h-6 w-6" />
              </div>
              <h2 className="text-xl font-semibold text-slate-950 dark:text-white">
                No tasks yet
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Create your first task and start moving work forward.
              </p>
              <button
                type="button"
                onClick={openCreateModal}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-cyan-600 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
              >
                <Plus className="h-5 w-5" />
                Create Task
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-3">
            {stages.map((stage) => (
              <section key={stage} className="min-w-0">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="inline-flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                    <CircleDashed className="h-4 w-4 text-cyan-600 dark:text-cyan-300" />
                    {stage}
                  </h2>
                  <span className="rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-500 dark:border-white/10 dark:text-slate-400">
                    {groupedTasks[stage]?.length || 0}
                  </span>
                </div>

                <div className="space-y-4">
                  {groupedTasks[stage]?.length ? (
                    groupedTasks[stage].map((task) => (
                      <TaskCard
                        key={task._id}
                        task={task}
                        onEdit={openEditModal}
                        onDelete={handleDeleteTask}
                        deleting={deletingId === task._id}
                      />
                    ))
                  ) : (
                    <div className="rounded-lg border border-dashed border-slate-200 bg-white p-5 text-center text-sm text-slate-500 dark:border-white/10 dark:bg-[#0b1120]">
                      No tasks in this stage
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      <TaskModal
        open={modalOpen}
        task={selectedTask}
        onClose={closeModal}
        onSubmit={handleSubmitTask}
        loading={saving}
      />
    </div>
  );
}

export default Dashboard;

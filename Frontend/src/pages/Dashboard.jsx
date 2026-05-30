import { useEffect, useMemo, useState } from "react";
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
    <div className="min-h-screen bg-[#070a12]">
      <Navbar userName={user.name} />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <section className="mb-6 flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-300">
              Dashboard
            </p>
            <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
              Your tasks
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Track every task from first idea to done, with each item securely
              scoped to your account.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="w-full rounded-lg bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 sm:w-auto"
          >
            New Task
          </button>
        </section>

        <section className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-[#0b1120] p-4">
            <p className="text-sm text-slate-400">Total</p>
            <p className="mt-2 text-3xl font-bold text-white">{totalTasks}</p>
          </div>
          <div className="rounded-lg border border-white/10 bg-[#0b1120] p-4">
            <p className="text-sm text-slate-400">In Progress</p>
            <p className="mt-2 text-3xl font-bold text-cyan-200">
              {groupedTasks["In Progress"]?.length || 0}
            </p>
          </div>
          <div className="rounded-lg border border-white/10 bg-[#0b1120] p-4">
            <p className="text-sm text-slate-400">Done</p>
            <p className="mt-2 text-3xl font-bold text-emerald-200">
              {completedTasks}
            </p>
          </div>
        </section>

        {error && (
          <div className="mb-6 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid min-h-72 place-items-center rounded-lg border border-white/10 bg-[#0b1120]">
            <p className="text-sm font-medium text-slate-400">
              Loading tasks...
            </p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="grid min-h-72 place-items-center rounded-lg border border-dashed border-white/15 bg-[#0b1120] px-6 text-center">
            <div>
              <h2 className="text-xl font-semibold text-white">
                No tasks yet
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Create your first task and start moving work forward.
              </p>
              <button
                type="button"
                onClick={openCreateModal}
                className="mt-5 rounded-lg bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Create Task
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-3">
            {stages.map((stage) => (
              <section key={stage} className="min-w-0">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="font-semibold text-white">{stage}</h2>
                  <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-slate-400">
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
                    <div className="rounded-lg border border-dashed border-white/10 bg-[#0b1120] p-5 text-center text-sm text-slate-500">
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

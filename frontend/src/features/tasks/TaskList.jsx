import { useDispatch, useSelector } from "react-redux";
import { deleteTask, fetchTasks } from "./tasksSlice";
import { useEffect, useState } from "react";

const TaskList = ({ onEdit }) => {
  const dispatch = useDispatch();
  const { tasks, loading, totalPages, currentPage } = useSelector((state) => state.tasks);

  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchTasks({ page, keyword, status, startDate, endDate }));
  }, [dispatch, page, keyword, status, startDate, endDate]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    dispatch(fetchTasks({ page: 1, keyword, status, startDate, endDate }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id)).then(() => {
      dispatch(fetchTasks({ page, keyword, status, startDate, endDate }));
    });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Your Tasks</h2>

      {/* Filters */}
      <form onSubmit={handleSearch} className="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search by name"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="p-2 border rounded w-full sm:w-48 cursor-pointer"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 border rounded w-full sm:w-40 cursor-pointer"
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="DONE">Done</option>
        </select>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border rounded cursor-pointer"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border rounded cursor-pointer"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 cursor-pointer">
          Search
        </button>
      </form>

      {/* Task List */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <ul className="space-y-2">
          {tasks?.map((task) => (
            <li
              key={task._id}
              className="bg-gray-100 p-3 rounded flex items-start justify-between"
            >
              <div className="flex-1 pr-4">
                <p className="font-medium text-left">{task.name}</p>
                <p className="text-sm text-gray-600 text-left">{task.description}</p>
                <p className="text-sm mt-1 text-left">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${
                      task.status === "DONE" ? "bg-green-200 text-green-700" : "bg-yellow-200 text-yellow-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </p>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <button
                  onClick={() => onEdit(task)}
                  className="text-blue-500 hover:underline cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-500 hover:underline cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TaskList;

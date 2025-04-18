import { useState } from 'react';
import TaskForm from '../features/tasks/TaskForm';
import TaskList from '../features/tasks/TaskList';

const TasksPage = () => {
  const [taskToEdit, setTaskToEdit] = useState(null);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Tasks</h1>
      <TaskForm taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} />
      <hr className="my-6" />
      <TaskList onEdit={setTaskToEdit} />
    </div>
  );
};

export default TasksPage;

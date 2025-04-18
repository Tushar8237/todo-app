import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addTask, updateTask } from './tasksSlice';
import { useEffect } from 'react';

const TaskForm = ({ taskToEdit, setTaskToEdit }) => {
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();

    useEffect(() => {
        if (taskToEdit) {
            reset(taskToEdit);
        }
    }, [taskToEdit, reset]);

    const onSubmit = (data) => {
        if (taskToEdit) {
            dispatch(updateTask({ id: taskToEdit._id, updates: data }));
        } else {
            dispatch(addTask(data));
        }
        reset();
        setTaskToEdit(null);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input
                placeholder="Title"
                {...register('name', { required: true })}
                className="w-full border px-3 py-2 rounded"
            />
            <textarea
                placeholder="Description"
                {...register('description')}
                className="w-full border px-3 py-2 rounded"
            />
            <button
                type="submit"
                className="bg-blue-600 cursor-pointer text-white py-2 px-4 rounded hover:bg-blue-700"
            >
                {taskToEdit ? 'Update Task' : 'Add Task'}
            </button>
        </form>
    );
};

export default TaskForm;

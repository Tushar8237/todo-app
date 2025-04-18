import Task from "../models/task.model.js";

// Create new task
export const createTask = async (req, res, next) => {
    try {
      const { name, description } = req.body;
  
      if (!name) {
        return res.status(400).json({ message: 'Task name is required' });
      }
  
      const task = new Task({
        name,
        description,
        user: req.user._id,
      });
  
      const savedTask = await task.save();
      res.status(201).json(savedTask);
    } catch (error) {
      console.error('Create Task Error:', error);
      res.status(500).json({ message: 'Server error while creating task' });
    }
  };
  

// Get tasks with filters, sear and pagination
// export const getTasks = async (req, res, next) => {
//     try {
//         const { page = 1, keyword = "", status, startDate, endDate } = req.query;

//         const query = {
//             user: req.user._id,
//             name: { $regex: keyword, $options: "i" },
//         };

//         if (status) query.status = status;

//         if (startDate || endDate) {
//             query.createdAt = {};

//             if (startDate) query.createdAt.$gte = new Date(startDate);
//             if (endDate) query.createdAt.$lte = new Date(endDate);
//         }

//         const pageSize = 10;
//         const skip = (Number(page) - 1) * pageSize;

//         const tasks = await Task.find(query)
//             .sort({ createdAt: -1 })
//             .skip(skip)
//             .limit(pageSize);

//         const totalTasks = await Task.countDocuments(query);

//         res.json({
//             tasks,
//             totalPages: Math.ceil(totalTasks / pageSize),
//             currentPage: Number(page),
//         });
//     } catch (error) {
//         res.status(500).json({ message: "Server Error" });
//         next(error);
//     }
// };
export const getTasks = async (req, res, next) => {
    try {
        const { page = 1, keyword = "", status, startDate, endDate } = req.query;

        const query = {
            user: req.user._id,
            name: { $regex: keyword, $options: "i" },
        };

        if (status) {
            query.status = status;
        }

        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(endDate);
        }

        const pageSize = 10;
        const skip = (Number(page) - 1) * pageSize;

        const [tasks, totalTasks] = await Promise.all([
            Task.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(pageSize),
            Task.countDocuments(query),
        ]);

        const totalPages = Math.ceil(totalTasks / pageSize);

        res.status(200).json({
            tasks,
            totalTasks,
            totalPages,
            currentPage: Number(page),
        });
    } catch (error) {
        console.error("Error in getTasks:", error);
        res.status(500).json({ message: "Server Error" });
        next(error);
    }
};


// Update task

export const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        const { name, description, status } = req.body;

        task.name = name ?? task.name;
        task.description = description ?? task.description;
        task.status = status ?? task.status;

        const updatedTask = await task.save();

        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
        next(error);
    }
};

// Delete task
export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
        next(error);
    }
};

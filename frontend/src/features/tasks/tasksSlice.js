// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "../../api/axios";

// // Add token header
// const authHeader = (getState) => {
//   const token = getState().auth?.user?.token;
//   return { headers: { Authorization: `Bearer ${token}` } };
// };

// // Get all tasks
// export const fetchTasks = createAsyncThunk(
//   "/tasks",
//   async (_, { getState }) => {
//     const res = await axios.get("/tasks", authHeader(getState));
//     return res.data;
//   }
// );

// // Create a new task
// export const addTask = createAsyncThunk(
//   // "tasks/addTask",
//   "tasks/addTask",
//   async (taskData, { getState }) => {
//     const res = await axios.post("/tasks/add", taskData, authHeader(getState));
//     return res.data;
//   }
// );

// // Update task
// export const updateTask = createAsyncThunk(
//   "tasks/updateTask",
//   async ({ id, updates }, { getState }) => {
//     const res = await axios.put(
//       `/tasks/${id}`,
//       updates,
//       authHeader(getState)
//     );
//     return res.data;
//   }
// );

// // Delete task
// export const deleteTask = createAsyncThunk(
//   "tasks/deleteTask",
//   async (id, { getState }) => {
//     await axios.delete(`/tasks/${id}`, authHeader(getState));
//     return id;
//   }
// );

// const tasksSlice = createSlice({
//   name: "tasks",
//   initialState: {
//     tasks: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       // Fetch all task
//       .addCase(fetchTasks.pending, (state) => {
//         state.loading = true;
//       })
//       // Task status
//       .addCase(fetchTasks.fulfilled, (state, action) => {
//         state.loading = false;
//         state.tasks = action.payload;
//       })

//       // Add task
//       .addCase(addTask.fulfilled, (state, action) => {
//         state.tasks.push(action.payload);
//       })

//       // Update task
//       .addCase(updateTask.fulfilled, (state, action) => {
//         const index = state.tasks.findIndex(
//           (t) => t._id === action.payload._id
//         );
//         if (index !== -1) state.tasks[index] = action.payload;
//       })

//       // Delete task
//       .addCase(deleteTask.fulfilled, (state, action) => {
//         state.tasks = state.tasks.filter((t) => t._id !== action.payload);
//       });
//   },
// });

// export default tasksSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";

// Auth header
const authHeader = (getState) => {
  const token = getState().auth?.user?.token;
  return { headers: { Authorization: `Bearer ${token}` } };
};

// Get tasks with filters and pagination
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (params = {}, { getState }) => {
    const {
      page = 1,
      keyword = "",
      status = "",
      startDate = "",
      endDate = "",
    } = params;
    const query = `?page=${page}&keyword=${keyword}&status=${status}&startDate=${startDate}&endDate=${endDate}`;
    const res = await axios.get(`/tasks${query}`, authHeader(getState));
    return res.data;
  }
);

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (taskData, { getState }) => {
    const res = await axios.post("/tasks/add", taskData, authHeader(getState));
    return res.data;
  }
);

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async ({ id, updates }, { getState }) => {
    const res = await axios.put(`/tasks/${id}`, updates, authHeader(getState));
    return res.data;
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (id, { getState }) => {
    await axios.delete(`/tasks/${id}`, authHeader(getState));
    return id;
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
    totalPages: 1,
    currentPage: 1,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (t) => t._id === action.payload._id
        );
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((t) => t._id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;

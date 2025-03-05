import { Hono } from "hono";

const route = new Hono();

// Temporary in-memory storage
let tasks = [
  {
    id: 1,
    title: "Buy groceries",
    description: "Milk, eggs, bread",
    completed: false,
  },
  {
    id: 2,
    title: "Finish project",
    description: "Complete the API documentation",
    completed: true,
  },
];

// Get all tasks
route.get("/tasks", (c) => {
  return c.json(tasks);
});

// Get a single task
route.get("/tasks/:id", (c) => {
  const id = Number(c.req.param("id"));
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return c.json({ error: "Task not found" }, 404);
  }
  return c.json(task);
});

// Create a task
route.post("/tasks", async (c) => {
  const taskData = await c.req.json();
  const newId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
  const newTask = { id: newId, ...taskData };
  tasks.push(newTask);
  return c.json(newTask, 201);
});

// Update a task
route.put("/tasks/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    return c.json({ error: "Task not found" }, 404);
  }

  const updateData = await c.req.json();
  const updatedTask = { ...tasks[taskIndex], ...updateData, id };
  tasks[taskIndex] = updatedTask;

  return c.json(updatedTask);
});

// Delete a task
route.delete("/tasks/:id", (c) => {
  const id = Number(c.req.param("id"));
  const initialLength = tasks.length;
  tasks = tasks.filter((t) => t.id !== id);

  if (tasks.length === initialLength) {
    return c.json({ error: "Task not found" }, 404);
  }

  return c.json({ message: "Task deleted successfully" });
});

export default route;

// backend/tasks.js
import express from 'express';
import db from './db.js';

const router = express.Router();

// Get the number of tasks due today
router.get('/tasks/today', (req, res) => {
  const query = `
    SELECT COUNT(*) AS taskCount
    FROM tasks
    WHERE DATE(due_date) = CURDATE() 
      AND due_date > NOW()
      AND (status = 'pas commencé' OR status = 'en cours')
  `;
  
  db.query(query, (err, results) => { 
    if (err) {
      console.error('Error fetching tasks due today:', err);
      return res.status(500).send('Server Error');
    }
    res.json({ taskCount: results[0].taskCount });
  });
});

// Get all tasks due today and order by priority, filter by status
router.get('/tasks', (req, res) => {
  const query = `
    SELECT * 
    FROM tasks
    WHERE DATE(due_date) = CURDATE() 
      AND due_date > NOW()
      AND (status = 'pas commencé' OR status = 'en cours')
    ORDER BY FIELD(priority, 'urgent', 'important', 'moins important')
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching tasks:', err);
      return res.status(500).send('Server Error');
    }
    res.json(results); 
  });
});

// Update a task
router.put("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const { task_name, category, priority, due_date } = req.body;

  if (!task_name || !category || !priority || !due_date) {
    return res.status(400).send("Missing required fields");
  }

  const query = `
    UPDATE tasks
    SET task_name = ?, category = ?, priority = ?, due_date = ?
    WHERE id = ?
  `;

  db.query(
    query,
    [task_name, category, priority, due_date, taskId],
    (err, result) => {
      if (err) {
        console.error("Error updating task:", err);
        return res.status(500).send("Server error");
      }
      if (result.affectedRows === 0) {
        return res.status(404).send("Task not found");
      }
      res.json({ id: taskId, task_name, category, priority, due_date });
    }
  );
});

export default router;

import { Task } from '../models/Task';
import { Op } from 'sequelize';

// Create a task
export const createTask = async (req: any, res: any) => {
  try {
    const { title, description, dueDate, status } = req.body;
    const userId = req.user?.userId; // Access the user ID from the JWT payload
   
    // Validate inputs
    if (!title || !description || !dueDate || !status) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (new Date(dueDate) < new Date()) {
      return res.status(400).json({ message: 'Due date cannot be in the past' });
    }

    const task = await Task.create({ title, description, dueDate, status, userId });
    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating task', error });
  }
};

// Get all tasks
export const getTasks = async (req: any, res: any) => {
  try {
    const { status, dueDate } = req.body;
    const userId = req.user?.userId; // Access the user ID from the JWT payload
    
    const whereClause: any = { userId };

    if (status) {
      whereClause.status = status;
    }

    if (dueDate) {
      whereClause.dueDate = {
        [Op.lte]: new Date(dueDate as string),
      };
    }

    const tasks = await Task.findAll({ where: whereClause });
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving tasks', error });
  }
};

// Update a task
export const updateTask = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, status } = req.body;
    const userId = req.user?.userId;

    const task = await Task.findOne({ where: { id, userId } });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.status = status || task.status;

    await task.save();
    return res.status(200).json({message : "Task Updated Successfully", data :task});
  } catch (error) {
    return res.status(500).json({ message: 'Error updating task', error });
  }
};

// Delete a task
export const deleteTask = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const task = await Task.findOne({ where: { id, userId } });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();
    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting task', error });
  }
};

// Get task status count
export const getTaskCount = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { startDate, endDate, status } = req.body;
    const allstatus = ['Pending', 'In Progress', 'Completed'];

    const userId = req.user?.userId;

    // Validate dates
    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }



    const count = await Task.count({
      where: {
        userId,
        status : status || allstatus,
        dueDate: {
          [Op.between]: [new Date(startDate as string), new Date(endDate as string)],
        },
      },
    });

    return res.status(200).json({ count });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching task count', error });
  }
};

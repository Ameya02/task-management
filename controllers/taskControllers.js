const Task = require("../models/taskModels");

const createTask = async (req, res) => {
    const { title, description,status, dueDate } = req.body;

    if (!title || !description || !status || !dueDate) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }

    const task = await Task.create({
        title,
        description,
        status,
        dueDate,
    });

    if(!task){
        res.status(400).json({ error: 'Failed to create a task' });
        return;
    }
    res.status(200).json({msg: 'Task created successfully'});
    return;
};

const getTasks = async (req, res) => { 
    const tasks = await Task.find();
    if(!tasks){
        res.status(400).json({ error: 'Failed to get tasks' });
        return;
    }
    res.status(200).json(tasks);
    return;
};

const updateTasks = async (req, res) => {
    const taskId = req.params.id;

    const tasks = await Task.findById(taskId);
    if(!tasks) {
        res.status(404).json({ error: 'Task not found' });
        return;
    }
    // added because now using backend only if using frontend then we do not need this  conditional checking anymore
    const newTask = await Task.findByIdAndUpdate(taskId,{
        title: req.body.title ? req.body.title : tasks.title,
        description: tasks.description ? tasks.description : tasks,
        dueDate: req.body.dueDate ? req.body.dueDate : tasks.dueDate,
    });


    if(!newTask){
        res.status(400).json({ error: 'Failed to update a task' });
        return;
    }
    res.status(200).json({msg: 'Task updated successfully'});
    return;
}

const updateStatus = async (req, res) => {
    const taskId = req.params.id;

    const task = await Task.findById(taskId);
    if(!task) {
        res.status(404).json({ error: 'Task not found' });
        return;
    }
    if(req.body.status == task.status)
    {
        res.status(400).json({ error: 'Task already in this status' });
        return;
    }
     await Task.findByIdAndUpdate(task.id, {status: req.body.status});
     res.status(200).json({msg: 'Task status updated successfully'});
     return;
}
const deleteTasks = async (req, res) => {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);
    if(!task) {
        res.status(404).json({ error: 'Task not found' });
        return;
    }
    await Task.findByIdAndDelete(taskId);
    res.status(200).json({msg: 'Task deleted successfully'});
}
module.exports = {createTask, getTasks, updateTasks,updateStatus, deleteTasks}



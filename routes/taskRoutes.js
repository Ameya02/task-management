const { createTask, getTasks, updateTasks, deleteTasks, updateStatus } = require('../controllers/taskControllers');

const router = require('express').Router();
router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTasks);
router.delete("/:id", deleteTasks);
router.put("/status/:id", updateStatus);

module.exports = router;
//TASKS ROUTER
const express = require("express");
const Tasks = require("./model");

const router = express.Router();

router.get("/", (req, res, next) => {
  Tasks.find()
    .then((tasks) => {
      tasks.forEach((task) => {
        if (task.task_completed === 1) {
          task.task_completed = true;
        } else {
          task.task_completed = false;
        }
      });

      res.json(tasks);
    })
    .catch(next);
});

router.get("/:task_id", (req, res, next) => {
  Tasks.findById(req.params.task_id)
    .then((task) => {
      if (task.task_completed === 1) {
        task.task_completed = true;
      } else {
        task.task_completed = false;
      }

      res.json(task);
    })
    .catch(next);
});

router.post("/", async (req, res, next) => {
  try {
    const tasks = await Tasks.create(req.body);
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

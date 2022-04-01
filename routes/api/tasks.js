const express = require("express");
const router = express.Router();

const { getAllTask, postCreateTask, putUpdateTask, deleteTask } = require("../../controllers/task");

/**
 * @route GET api/todo
 * @description get all todo
 * @access public
 */
router.get("/", getAllTask);

/**
 * @route POST api/todo
 * @description add a new todo
 * @access public
 */
router.post("/", postCreateTask);

/**
 * @route PUT api/todo/:id
 * @description update todo
 * @access public
 */
router.put("/:id", putUpdateTask);

/**
 * @route DELETE api/todo/:id
 * @description delete todo
 * @access public
 */
router.delete("/:id", deleteTask);

module.exports = router;

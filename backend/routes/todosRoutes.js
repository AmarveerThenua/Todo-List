import {
    addTodo,
    getTodos,
    deleteTodo,
    completedTodo,
    editTodo
} from "../controllers/todosController.js"

import protect from "../middleware/authMiddleware.js"

import express from "express"
const router = express.Router()


router.post('/addtodo', protect, addTodo)
router.get("/gettodos/:userId", protect, getTodos)
router.delete("/delete/:todoId", protect, deleteTodo)
router.patch('/completed/:todoId', protect, completedTodo)
router.patch('/edit/:todoId', protect, editTodo)

export default router
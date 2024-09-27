"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let todos = [];
const router = (0, express_1.Router)();
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text
    };
    todos.push(newTodo);
    res.status(201).json({ msg: "success" });
});
router.put('/todo/:todoId', (req, res, next) => {
    const params = req.params;
    const body = req.body;
    const todoId = params.todoId;
    const todoIndex = todos.findIndex(todoItem => todoItem.id === todoId);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
        res.status(200).json({ message: "Updated the todo", todo: todos[todoIndex] });
    }
    else {
        res.status(404).json({ msg: "COuld not find todos for this ID" });
    }
});
router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params;
    todos = todos.filter(todoItem => todoItem.id !== params.todoId);
    res.status(200).json({ msg: "deleted the todo" });
});
exports.default = router;

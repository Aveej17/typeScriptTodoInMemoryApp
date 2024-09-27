import { Todo } from "../models/todo";

import { Router } from 'express';

let todos  : Todo [] = [];

type RequestBody = {text: string};
type RequestParams = {todoId : string};

const router = Router();

router.get('/', (req, res, next)=>{
    res.status(200).json({todos: todos});
});

router.post('/todo', (req, res, next)=>{
    const body = req.body as RequestBody;
    const newTodo : Todo = {
        id :new Date().toISOString(),
        text : body.text
    };

    todos.push(newTodo);

    res.status(201).json({msg: "success"});
})

router.put('/todo/:todoId', (req, res, next)=>{
    const params = req.params as RequestParams;
    const body = req.body as RequestBody;
    const todoId  = params.todoId;
    const todoIndex = todos.findIndex(todoItem => todoItem.id === todoId)

    if(todoIndex>= 0){
        todos[todoIndex] = {id : todos[todoIndex].id, text: body.text};
        
        res.status(200).json({message: "Updated the todo", todo: todos[todoIndex]});
    }
    else{
        res.status(404).json({msg:"COuld not find todos for this ID"});
    }
});

router.delete('/todo/:todoId', (req, res, next)=>{
    const params = req.params as RequestParams;
    todos = todos.filter(todoItem => todoItem.id !== params.todoId);
    res.status(200).json({msg: "deleted the todo"});
})

export default router;
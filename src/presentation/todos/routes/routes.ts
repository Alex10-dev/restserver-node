import { Router } from "express";
import { TodoController } from "../controllers/controller";

export class TodoRoutes {

    public static get routes(): Router {

        const router = Router();

        const todoController =  new TodoController();

        // router.get('/api/todos', (req, res) => todoController.getTodos(req, res) );
        router.get('/', todoController.getTodos);
        router.get('/:id', todoController.getTodoById);

        //create new todo
        router.post('/create-todo', todoController.createNewTodo);

        //update todo
        router.put('/update-todo/:id', todoController.updateTodo);

        //delete todo
        router.delete('/:id', todoController.deleteTodo);

        return router;
    }
}
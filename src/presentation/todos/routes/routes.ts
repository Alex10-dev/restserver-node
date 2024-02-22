import { Router } from "express";
import { TodoController } from "../controllers/controller";
import { todoDatasourceImpl } from "../../../infrastructure/datasources/todo.datasource.impl";
import { todoRepositoryImpl } from "../../../infrastructure/repositories/todo.repository.impl";

export class TodoRoutes {

    public static get routes(): Router {

        const router = Router();

        const datasource = new todoDatasourceImpl;
        const repository = new todoRepositoryImpl( datasource );

        const todoController =  new TodoController( repository );

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
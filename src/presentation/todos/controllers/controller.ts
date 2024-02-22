import { Request, Response } from "express"
import { CreateTodoDTO } from "../../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDTO } from "../../../domain/dtos/todos/update-todo.dto";
import { TodoRepository } from "../../../domain/repositories/todo.repository";
import { GetTodos } from "../../../domain/use-cases/todos/get-todos";
import { GetTodoById } from "../../../domain/use-cases/todos/get-one-todo";
import { CreateTodo } from "../../../domain/use-cases/todos/create-todo";
import { UpdateTodoById } from "../../../domain/use-cases/todos/update-todo";
import { DeleteTodo } from "../../../domain/use-cases/todos/delete-todo";

export class TodoController {

    constructor(
        private readonly todoRepository: TodoRepository,
    ){}

    public getTodos = (req: Request, res: Response) => {
        
        new GetTodos( this.todoRepository ).execute()
            .then( todos => res.status(200).json( todos ))
            .catch( error => res.status(400).json({ error }) );
    };

    public getTodoById = (req: Request, res: Response) => {

        const id = Number(req.params.id);

        new GetTodoById( this.todoRepository ).execute( id )
            .then( todo => res.status(200).json( todo ))
            .catch( error => res.status(400).json({ error }) );
    };

    public createNewTodo = ( req: Request, res: Response ) => {
        const [error, createTodoDTO] = CreateTodoDTO.createFromRequestBody(req.body);
        if( error ) return res.status(400).json({ error });
        
        new CreateTodo( this.todoRepository ).execute( createTodoDTO! )
            .then( todos => res.status(200).json( todos ))
            .catch( error => res.status(400).json({ error }) );
    };

    public updateTodo = ( req: Request, res: Response ) => {

        const id = Number(req.params.id);
        const [ error, updateTodoDTO ] = UpdateTodoDTO.createFromRequestBody({...req.body, id});
        
        if( error ) return res.status(400).json({ error });

        new UpdateTodoById( this.todoRepository ).execute( updateTodoDTO! )
            .then( todos => res.status(200).json( todos ))
            .catch( error => res.status(400).json({ error }) );
    };

    public deleteTodo = ( req: Request, res: Response ) => {

        const id = Number(req.params.id);
        
        new DeleteTodo( this.todoRepository ).execute( id )
            .then( todos => res.status(200).json( todos ))
            .catch( error => res.status(400).json({ error }) );
    }
}
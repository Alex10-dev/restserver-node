import { Request, Response } from "express"
import { prisma } from "../../../data/postgres";
import { CreateTodoDTO } from "../../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDTO } from "../../../domain/dtos/todos/update-todo.dto";
import { TodoRepository } from "../../../domain/repositories/todo.repository";

export class TodoController {

    constructor(
        private readonly todoRepository: TodoRepository,
    ){}

    public getTodos = async(req: Request, res: Response) => {

        const todos = await this.todoRepository.getAll();
        return res.json( todos );
    };

    public getTodoById = async(req: Request, res: Response) => {

        const id = Number(req.params.id);

        try {
            const todo = await this.todoRepository.findById( id );
            res.status(200).json(todo);
        } catch(error) {
            res.status(400).json(error);
        }
    };

    public createNewTodo = async( req: Request, res: Response ) => {
        const [error, createTodoDTO] = CreateTodoDTO.createFromRequestBody(req.body);
        if( error ) return res.status(400).json({ error });
        
        try {
            const todo = await this.todoRepository.create( createTodoDTO! );
            res.status(200).json( todo );

        } catch( error ){
            res.status(400).json( error );
        }
    };

    public updateTodo = async( req: Request, res: Response ) => {

        const id = Number(req.params.id);
        const [ error, updateTodoDTO ] = UpdateTodoDTO.createFromRequestBody({...req.body, id});
        
        if( error ) return res.status(400).json({ error });

        try {
            const todo = await this.todoRepository.updateById( updateTodoDTO! );
            return res.status(200).json(todo);

        } catch ( error ) {
            res.status(400).json({ error: error, msg: 'Something went wrong' });
        }
    };

    public deleteTodo = async( req: Request, res: Response ) => {

        const id = Number(req.params.id);
        try {
            const deletedTodo = await this.todoRepository.deleteById( id );
            return res.status(200).json(deletedTodo);
            
        } catch ( error ) {
            res.status(400).json( error );
        }
    }
}
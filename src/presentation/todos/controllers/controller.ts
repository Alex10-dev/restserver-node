import { Request, Response } from "express"
import { prisma } from "../../../data/postgres";
import { CreateTodoDTO } from "../../../domain/dtos/todos/create-todo.dto";

export class TodoController {

    constructor(){}

    public getTodos = async(req: Request, res: Response) => {

        const todos = await prisma.todo.findMany();

        return res.status(200).json( todos );
    };

    public getTodoById = async(req: Request, res: Response) => {

        const id = Number(req.params.id);

        const todo = await prisma.todo.findUnique({
            where: {
                id: id
            }
        })

        if( !todo ) return res.status(200).json({
            message: `Object with id: ${id} doesn't exist in the database`,
        });

        return res.status(200).json( todo );
    };

    public createNewTodo = async( req: Request, res: Response ) => {

       // const { text } = req.body;
       const [error, createTodoDTO] = CreateTodoDTO.create(req.body);
       if( error ) return res.status(400).json({ error });

       /* if( !text ) return res.status(400).json({
        error: 'TEXT PROPERTY IS REQUIRED',
       }); */

       const newTodo = await prisma.todo.create({
        data: createTodoDTO!
       });

       res.status(200).json( newTodo );
    };

    public updateTodo = async( req: Request, res: Response ) => {

        const id = Number(req.params.id);
        const { text } = req.body;
        try {
            const updateTodo = await prisma.todo.update({
                where: { id: id, },
                data: { text: text, }
            });

            return res.status(200).json(updateTodo);

        } catch ( error ) {
            res.status(400).json({
                error: error,
            })
        }
    };

    public deleteTodo = async( req: Request, res: Response ) => {

        const id = Number(req.params.id);
        try {
            const deletedTodo = await prisma.todo.delete({
                where: { id: id, },
            });

            return res.status(200).json(deletedTodo);
            
        } catch ( error ) {
            res.status(400).json({
                error: error,
            })
        }
    }
}
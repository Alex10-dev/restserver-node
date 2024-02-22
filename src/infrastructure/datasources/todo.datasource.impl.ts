import { prisma } from "../../data/postgres";
import { TodoDatasource } from "../../domain/datasources/todo.datasource";
import { CreateTodoDTO } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDTO } from "../../domain/dtos/todos/update-todo.dto";
import { TodoEntity } from "../../domain/entities/todo.entity";

export class todoDatasourceImpl implements TodoDatasource {
    
    async create(createTodoDTO: CreateTodoDTO): Promise<TodoEntity> {
        
        const newTodo = await prisma.todo.create({
            data: createTodoDTO!
        });

        return TodoEntity.fromJSON( newTodo );
    }
    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map( todo => TodoEntity.fromJSON( todo ));
    }
    async findById(id: number): Promise<TodoEntity> {
        const todo = await prisma.todo.findUnique({
            where: { id: id }
        });

        if( !todo ) throw `Can't find todo with id: ${ id }`;
        return TodoEntity.fromJSON( todo );
    }
    async updateById(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity> {
        await this.findById( updateTodoDTO.id );

        const updatedTodo = await prisma.todo.update({
            where: { id: updateTodoDTO!.id, },
            data: { 
                text: updateTodoDTO!.text,
                completedAt: updateTodoDTO!.completedAt,
            }
        });

        return TodoEntity.fromJSON( updatedTodo );
    }
    async deleteById(id: number): Promise<TodoEntity> {
        await this.findById( id );

        const deletedTodo = await prisma.todo.delete({
            where: { id: id, },
        });

        return TodoEntity.fromJSON( deletedTodo );
    }

}
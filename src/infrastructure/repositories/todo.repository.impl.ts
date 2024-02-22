import { CreateTodoDTO } from "../../domain/dtos/todos/create-todo.dto";
import { UpdateTodoDTO } from "../../domain/dtos/todos/update-todo.dto";
import { TodoEntity } from "../../domain/entities/todo.entity";
import { TodoRepository } from "../../domain/repositories/todo.repository";

import { TodoDatasource } from "../../domain/datasources/todo.datasource";

export class todoRepositoryImpl implements TodoRepository {

    constructor(
        private readonly datasource: TodoDatasource
    ){}

    create(createTodoDTO: CreateTodoDTO): Promise<TodoEntity> {
        return this.datasource.create(createTodoDTO);
    }
    getAll(): Promise<TodoEntity[]> {
        return this.datasource.getAll();
    }
    findById(id: number): Promise<TodoEntity> {
        return this.datasource.findById( id );
    }
    updateById(updateTodoDTO: UpdateTodoDTO): Promise<TodoEntity> {
        return this.datasource.updateById( updateTodoDTO );
    }
    deleteById(id: number): Promise<TodoEntity> {
        return this.datasource.deleteById( id );
    }

}
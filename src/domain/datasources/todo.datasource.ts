import { CreateTodoDTO } from "../dtos/todos/create-todo.dto";
import { UpdateTodoDTO } from "../dtos/todos/update-todo.dto";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoDatasource {

    abstract create( createTodoDTO: CreateTodoDTO ): Promise<TodoEntity>;

    abstract getAll(): Promise<TodoEntity[]>;

    abstract findById( id: number ): Promise<TodoEntity>;

    abstract updateById( updateTodoDTO: UpdateTodoDTO ): Promise<TodoEntity>;

    abstract deleteById( id: number ): Promise<TodoEntity>;
}
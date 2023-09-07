
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class TodoInput {
    description: string;
    checked?: Nullable<boolean>;
}

export class Todo {
    id?: Nullable<string>;
    description: string;
    checked?: Nullable<boolean>;
    createdAt?: Nullable<string>;
    updatedAt?: Nullable<string>;
}

export class DeleteResult {
    raw?: Nullable<Nullable<string>[]>;
    affected?: Nullable<number>;
}

export abstract class IQuery {
    abstract todos(): Nullable<Nullable<Todo>[]> | Promise<Nullable<Nullable<Todo>[]>>;
}

export abstract class IMutation {
    abstract createTodo(createTodoInput?: Nullable<TodoInput>): Nullable<Todo> | Promise<Nullable<Todo>>;

    abstract updateTodo(id?: Nullable<string>, updateTodoInput?: Nullable<TodoInput>): Nullable<Todo> | Promise<Nullable<Todo>>;

    abstract removeTodo(id?: Nullable<string>): Nullable<DeleteResult> | Promise<Nullable<DeleteResult>>;
}

type Nullable<T> = T | null;

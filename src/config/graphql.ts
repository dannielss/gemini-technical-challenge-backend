
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
    userId: string;
}

export class CreateUserInput {
    name: string;
    email: string;
    password: string;
}

export class UpdateUserInput {
    name?: Nullable<string>;
    email?: Nullable<string>;
}

export class User {
    id: string;
    name: string;
    email: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    password: string;
}

export class Auth {
    user: User;
    token: string;
}

export abstract class IMutation {
    abstract signIn(email: string, password: string): Auth | Promise<Auth>;

    abstract createTodo(createTodoInput: TodoInput): Nullable<Todo> | Promise<Nullable<Todo>>;

    abstract updateTodo(id: string, updateTodoInput: TodoInput): Nullable<UpdateResult> | Promise<Nullable<UpdateResult>>;

    abstract removeTodo(id: string): Nullable<DeleteResult> | Promise<Nullable<DeleteResult>>;

    abstract createUser(createUserInput?: Nullable<CreateUserInput>): User | Promise<User>;

    abstract updateUser(id: string, updateUserInput?: Nullable<UpdateUserInput>): UpdateResult | Promise<UpdateResult>;
}

export class Todo {
    id: string;
    description: string;
    checked: boolean;
    userId: string;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export class DeleteResult {
    raw?: Nullable<Nullable<string>[]>;
    affected?: Nullable<number>;
}

export class UpdateResult {
    raw?: Nullable<Nullable<string>[]>;
    affected?: Nullable<number>;
}

export abstract class IQuery {
    abstract todos(userId: string): Nullable<Nullable<Todo>[]> | Promise<Nullable<Nullable<Todo>[]>>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export type DateTime = any;
type Nullable<T> = T | null;

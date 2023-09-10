import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { DeleteResult } from 'typeorm';
import { NotFoundException, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Resolver(() => Todo)
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Mutation(() => Todo)
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todoService.create(createTodoInput);
  }

  @Query(() => [Todo], { name: 'todos' })
  findAll(@Args('userId', { type: () => String }) userId: string) {
    return this.todoService.findAll(userId);
  }

  @Mutation(() => Todo)
  updateTodo(
    @Args('id', { type: () => String }) id: string,
    @Args('updateTodoInput') updateTodoInput: UpdateTodoInput,
  ) {
    const todo = this.todoService.findOne(id);

    if (!todo) throw new NotFoundException();

    return this.todoService.update(id, updateTodoInput);
  }

  @Mutation(() => DeleteResult)
  removeTodo(@Args('id', { type: () => String }) id: string) {
    return this.todoService.remove(id);
  }
}

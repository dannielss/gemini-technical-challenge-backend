import { Injectable } from '@nestjs/common';
import { CreateTodoInput } from './dto/create-todo.input';
import { UpdateTodoInput } from './dto/update-todo.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  create(createTodoInput: CreateTodoInput) {
    const todo = this.todoRepository.create({
      description: createTodoInput.description,
      checked: createTodoInput.checked,
      userId: createTodoInput.userId,
    });

    return this.todoRepository.save(todo);
  }

  findOne(id: string) {
    return this.todoRepository.findOneBy({ id });
  }

  async findAll(userId: string, page: number, checked: boolean) {
    const [result, total] = await this.todoRepository.findAndCount({
      where: { userId, checked },
      take: 8,
      skip: (page - 1) * 8,
    });

    const response = {
      list: result,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / 8),
      },
    };

    return response;
  }

  update(id: string, updateTodoInput: UpdateTodoInput) {
    return this.todoRepository.update(id, {
      description: updateTodoInput.description,
      checked: updateTodoInput.checked,
    });
  }

  remove(id: string) {
    return this.todoRepository.delete(id);
  }
}

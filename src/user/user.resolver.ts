import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import {
  ConflictException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver('User')
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation('createUser')
  async create(@Args('createUserInput') createUserInput: CreateUserInput) {
    const user = await this.userService.findOneByEmail(createUserInput.email);

    if (user) throw new ConflictException('User already exists');

    return this.userService.create(createUserInput);
  }

  @UseGuards(AuthGuard)
  @Query('user')
  findOne(@Args('id') id: string) {
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation('updateUser')
  update(
    @Args('id', { type: () => String }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    const user = this.userService.findOne(id);

    if (!user) throw new NotFoundException();

    return this.userService.update(id, updateUserInput);
  }
}

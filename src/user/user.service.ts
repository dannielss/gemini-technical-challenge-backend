import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput) {
    const user = this.userRepository.create({
      name: createUserInput.name,
      email: createUserInput.email,
      password: createUserInput.password,
    });

    return this.userRepository.save(user);
  }

  findOne(id: string) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
    });
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return this.userRepository.update(id, {
      email: updateUserInput.email,
      name: updateUserInput.name,
    });
  }
}

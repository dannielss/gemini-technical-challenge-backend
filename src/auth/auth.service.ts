import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/config/graphql';
import { compare } from 'src/utils/hash';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!compare(password, user.password)) {
      throw new NotFoundException('Email or password is incorrect');
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return {
      token: this.jwtService.signAsync(payload),
      user,
    };
  }
}

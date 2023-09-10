import { CreateUserInput } from './create-user.input';
import { OmitType } from '@nestjs/graphql';

export class UpdateUserInput extends OmitType(CreateUserInput, ['password']) {}

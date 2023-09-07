import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field()
  description: string;

  @Field()
  checked: boolean;
}

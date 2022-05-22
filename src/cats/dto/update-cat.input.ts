import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateCatInput } from 'src/cats/dto/create-cat.input';

@InputType()
export class UpdateCatInput extends PartialType(CreateCatInput) {
  @Field(() => ID)
  _id: string;
}

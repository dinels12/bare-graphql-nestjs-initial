import { InputType, Field, Int } from '@nestjs/graphql';
import { IsString, Min, Max } from 'class-validator';

@InputType()
export class CreateCatInput {
  @Field(() => String, { description: 'Cat Name' })
  @IsString()
  name: string;

  @Field(() => Int, { description: 'Cat Age' })
  @Min(1)
  @Max(20)
  age: number;
}

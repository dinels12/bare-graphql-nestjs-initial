import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { IsString, Min, Max } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export type CatDocument = Cat & Document;

@Schema({ timestamps: true })
@ObjectType()
export class Cat {
  @Field(() => ID, { description: 'Cat unique ID' })
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  @Field(() => String, { description: 'Cat Name' })
  @IsString()
  name: string;

  @Prop({ required: true })
  @Field(() => Int, { description: 'Cat Age' })
  @Min(1)
  @Max(20)
  age: number;
}

export const CatSchema = SchemaFactory.createForClass(Cat);

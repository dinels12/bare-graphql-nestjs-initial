import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  Subscription,
} from '@nestjs/graphql';
import { CatsService } from './cats.service';
import { Cat } from './entities/cat.entity';
import { CreateCatInput } from './dto/create-cat.input';
import { UpdateCatInput } from './dto/update-cat.input';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => Cat)
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Mutation(() => Cat)
  async createCat(
    @Args('createCatInput')
    createCatData: CreateCatInput,
  ) {
    const catCreated = await this.catsService.create(createCatData);

    pubSub.publish('catCreated', { catCreated });
    return catCreated;
  }

  @Query(() => [Cat], { name: 'cats' })
  async findAll() {
    return this.catsService.findAll();
  }

  @Query(() => Cat, { name: 'cat', nullable: true })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return this.catsService.findOne(id);
  }

  @Mutation(() => Cat)
  async updateCat(@Args('updateCatInput') updateCatInput: UpdateCatInput) {
    return this.catsService.update(updateCatInput._id, updateCatInput);
  }

  @Mutation(() => Cat)
  async removeCat(@Args('id', { type: () => ID }) id: string) {
    return this.catsService.remove(id);
  }

  @Subscription(() => Cat)
  async catCreated() {
    return pubSub.asyncIterator('catCreated');
  }
}

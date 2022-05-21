import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Query, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CatsGuard } from 'src/cats/cats.guard';
import { CatsService } from 'src/cats/cats.service';
import { CreateCatDto } from 'src/cats/dto/create-cat.dto';
import { Cat } from 'src/graphql.schema';

const pubSub = new PubSub();

@Resolver('Cat')
export class CatsResolver {
  constructor(private readonly catsService: CatsService) {}

  @Query('cats')
  @UseGuards(CatsGuard)
  async getCats() {
    return this.catsService.findAll();
  }
  @Query('cat')
  async findOneById(@Args('id', ParseIntPipe) id: number): Promise<Cat> {
    return this.catsService.findOneById(id);
  }

  @Mutation('createCat')
  async create(@Args('createCatInput') args: CreateCatDto): Promise<Cat> {
    const createdCat = await this.catsService.create(args);
    pubSub.publish('catCreated', { catCreated: createdCat });
    return createdCat;
  }

  @Subscription('catCreated')
  catCreated() {
    return pubSub.asyncIterator('catCreated');
  }
}

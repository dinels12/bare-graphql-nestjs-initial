import { Module } from '@nestjs/common';
import { GraphqlModule } from 'src/common/graphql.module';
import { MongoModule } from 'src/common/mongo.module';

@Module({
  imports: [GraphqlModule, MongoModule],
  exports: [GraphqlModule, MongoModule],
})
export class CommonModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config.module';

@Module({
  imports: [MongooseModule.forRoot(config.DB)],
})
export class MongoModule {}

import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsResolver } from './cats.resolver';
import { OwnersModule } from 'src/owners/owners.module';
import { CatOwnerResolver } from 'src/cats/cat-owner.resolver';

@Module({
  imports: [OwnersModule],
  providers: [CatsService, CatsResolver, CatOwnerResolver],
})
export class CatsModule {}

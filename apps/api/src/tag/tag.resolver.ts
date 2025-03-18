import { Resolver } from '@nestjs/graphql';
import { TagService } from './tag.service';
import { TagEntity } from './entities/tag.entity';

@Resolver(() => TagEntity)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}
}

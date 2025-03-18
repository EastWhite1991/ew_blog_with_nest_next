import { Resolver } from '@nestjs/graphql';
import { LikeService } from './like.service';
import { LikeEntity } from './entities/like.entity';

@Resolver(() => LikeEntity)
export class LikeResolver {
  constructor(private readonly likeService: LikeService) {}
}

import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { PostService } from './post.service';
import { PostEntity } from './entities/post.entity';

@Resolver(() => PostEntity)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [PostEntity], { name: 'posts' })
  findAll(
    @Context() context,
    @Args('skip', { nullable: true }) skip?: number,
    @Args('take', { nullable: true }) take?: number,
  ) {
    const user = context.req.user;
    console.log({ user });

    return this.postService.findAll({ skip, take });
  }
}

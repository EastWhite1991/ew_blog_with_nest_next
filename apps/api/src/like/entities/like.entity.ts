import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PostEntity } from 'src/post/entities/post.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@ObjectType()
export class LikeEntity {
  @Field(() => Int)
  id: number;

  @Field(() => UserEntity)
  user: UserEntity;

  @Field(() => PostEntity)
  post: PostEntity;

  @Field()
  createdAt: Date;
}

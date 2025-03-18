import { ObjectType, Field, Int } from '@nestjs/graphql';
import { PostEntity } from 'src/post/entities/post.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@ObjectType()
export class CommentEntity {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;

  @Field(() => PostEntity)
  post: PostEntity;

  @Field(() => UserEntity)
  author: UserEntity;

  @Field()
  createdAt: Date;
}

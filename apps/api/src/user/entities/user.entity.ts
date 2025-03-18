import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { PostEntity } from 'src/post/entities/post.entity';

@ObjectType()
export class UserEntity {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  avatar?: string;

  @Field(() => [PostEntity])
  posts?: PostEntity[];

  @Field(() => [CommentEntity])
  comments: CommentEntity[];
}

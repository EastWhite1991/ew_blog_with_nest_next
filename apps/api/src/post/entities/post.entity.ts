import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { TagEntity } from 'src/tag/entities/tag.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@ObjectType()
export class PostEntity {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  thumbnail?: string;

  @Field()
  content: string;

  @Field(() => Boolean)
  published: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => UserEntity)
  author: UserEntity;

  @Field(() => [TagEntity])
  tags: TagEntity[];

  @Field(() => [CommentEntity])
  comments: CommentEntity[];
}

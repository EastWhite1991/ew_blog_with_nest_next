import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @IsString()
  title: string;

  @Field()
  @IsString()
  content: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  thumbnail?: string;

  @IsString({ each: true })
  @Field(() => [String])
  tags: string[];

  @Field(() => Boolean)
  @IsBoolean()
  isPublished: boolean;
}

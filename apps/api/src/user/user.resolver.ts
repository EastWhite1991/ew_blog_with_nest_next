import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserEntity)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return await this.userService.create(createUserInput);
  }
}

import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthPayload } from './entities/auth-payload.entity';
import { SignInInput } from './dto/signin.input';

@Resolver()
export class AuthResolver {
  // 类的构造函数，使用依赖注入的方式注入了 AuthService 实例。private readonly 表示该属性是私有的且不可变，
  // AuthService 是一个自定义的服务类，用于处理身份验证的业务逻辑。
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthPayload)
  async signIn(@Args('signInInput') signInInput: SignInInput) {
    const user = await this.authService.validateLocalUser(signInInput);

    return await this.authService.login(user);
  }
}

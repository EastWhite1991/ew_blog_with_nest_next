import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInInput } from './dto/signin.input';
import { verify } from 'argon2';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async validateLocalUser({ email, password }: SignInInput) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new UnauthorizedException('User not found');

    const passwordMatched = await verify(user.password || '', password);

    if (!passwordMatched) throw new UnauthorizedException('Invalid password');

    return user;
  }

  async generateToken(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
    };
  }

  // 需要注意的是，这里的 User 类型声明是来自@prisma/client，而不是user.entity.ts
  // @prisma/client 是 Prisma 生成的客户端库，它会依据你定义的 Prisma 模式文件（一般是 schema.prisma）自动生成对应的类型定义。
  // User 类型精确地反映了数据库中 User 表的结构，包含了表中的所有字段和它们的数据类型。
  async login(user: User) {
    const { accessToken } = await this.generateToken(user.id);
    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      accessToken,
    };
  }

  async validateJwtUser(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) throw new UnauthorizedException('User not found');
    const currentUser = { id: user.id };
    return currentUser;
  }
}

/**
1. 类型一致性
    @prisma/client 是 Prisma 生成的客户端库，它会依据你定义的 Prisma 模式文件（一般是 schema.prisma）自动生成对应的类型定义。User 类型精确地反映了数据库中 User 表的结构，
    包含了表中的所有字段和它们的数据类型。在 login 方法里，需要操作 User 对象的属性，像 id、name、avatar 等。通过导入 @prisma/client 中的 User 类型，
    能够保证传递给 login 方法的 user 参数类型与数据库中的 User 表结构一致，避免因类型不匹配而引发的错误。
2. 数据完整性
    从 Prisma 客户端获取的 User 对象包含了数据库中 User 记录的完整信息。借助使用 @prisma/client 中的 User 类型，可以确保在 login 方法中访问到的 
    user 对象的属性是完整且准确的，避免因手动定义类型而可能出现的遗漏或错误。
3. 代码可维护性
    当数据库表结构发生改变时，Prisma 会自动更新 @prisma/client 中的类型定义。这意味着你无需手动修改 User 类型的定义，login 方法中的类型检查依然能够
    正常工作，从而提高了代码的可维护性。
 */

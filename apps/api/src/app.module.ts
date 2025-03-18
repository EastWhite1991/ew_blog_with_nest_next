import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { TagModule } from './tag/tag.module';
import { LikeModule } from './like/like.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

// @Module 是 NestJS 提供的一个装饰器，用于定义一个模块。它接受一个对象作为参数，该对象包含了模块的元数据，如导入的模块、控制器、提供者等。
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      // driver: ApolloDriver：指定使用 Apollo 作为 GraphQL 的驱动程序。
      driver: ApolloDriver,
      // 配置 GraphQL 自动生成的 model 文件的路径。process.cwd() 返回当前工作目录，最终生成的模式文件将保存在 src/graphql/schema.gql 中。
      autoSchemaFile: join(process.cwd(), 'src/graphql/schema.gql'),
    }),
    ConfigModule.forRoot({
      isGlobal: true, // 设置 ConfigModule 为全局模块，这样其他模块可以无需导入即可使用。
    }),
    // 导入 PrismaModule，该模块可能包含了与 Prisma 相关的服务和配置，用于与数据库进行交互。
    PrismaModule,
    PostModule,
    UserModule,
    CommentModule,
    TagModule,
    LikeModule,
    AuthModule,
  ],
  // 指定当前模块中包含的控制器。AppController 是应用程序的主控制器，负责处理 HTTP 请求。
  controllers: [AppController],
  // 指定当前模块中包含的提供者。AppService 是应用程序的主服务，负责处理业务逻辑。
  providers: [AppService],
})
export class AppModule {}

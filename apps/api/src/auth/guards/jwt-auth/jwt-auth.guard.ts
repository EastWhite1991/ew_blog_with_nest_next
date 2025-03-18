// ExecutionContext：NestJS 提供的上下文对象，用于获取当前执行的上下文信息，比如请求、响应等。
import { ExecutionContext, Injectable } from '@nestjs/common';
// GqlExecutionContext：用于处理 GraphQL 请求的上下文，能将普通的 ExecutionContext 转换为 GraphQL 专用的上下文。
import { GqlExecutionContext } from '@nestjs/graphql';
// AuthGuard：NestJS 中用于实现身份验证的守卫，@nestjs/passport 模块提供了基于 Passport 的身份验证策略。
import { AuthGuard } from '@nestjs/passport';

// 定义了一个名为 JwtAuthGuard 的守卫类，用于在 NestJS 项目中实现基于 JWT（JSON Web Token）的身份验证。
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // 重写 getRequest 方法来正确获取 GraphQL 请求对象，从而实现对 GraphQL 请求的身份验证。
  getRequest(context: ExecutionContext) {
    // 将普通的 ExecutionContext 转换为 GraphQL 专用的上下文对象 ctx。
    const ctx = GqlExecutionContext.create(context);
    // 从 GraphQL 上下文中获取请求对象并返回，这样 AuthGuard 就能使用该请求对象来验证 JWT。
    return ctx.getContext().req;
  }
}

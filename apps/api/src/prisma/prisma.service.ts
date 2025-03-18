import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Logger } from '@nestjs/common'; // 引入 NestJS 内置日志工具

/**
    - 定义了一个名为 PrismaService 的服务类，它集成了 Prisma 客户端的功能，并且遵循 NestJS 的模块初始化生命周期钩子。
    - @Injectable() 是 NestJS 中的一个装饰器，用于将一个类标记为可注入的服务。
    - 在 NestJS 中，服务是一种可以被其他模块、控制器或服务依赖注入的类，用于封装业务逻辑和数据访问逻辑。
    - export class PrismaService：定义了一个名为 PrismaService 的类，并将其导出，以便其他模块可以引入和使用。
    - extends PrismaClient：表示 PrismaService 类继承自 PrismaClient 类。PrismaClient 是 Prisma 提供的一个客户端类，用于与数据库进行交互，
    通过继承它，PrismaService 可以直接使用 PrismaClient 的所有方法和属性（如 findMany、create等）。
    - implements OnModuleInit：表示 PrismaService 类实现了 OnModuleInit 接口。OnModuleInit 是 NestJS 提供的一个生命周期钩子接口，
    实现该接口的类需要定义一个 onModuleInit 方法，该方法会在模块初始化完成后自动调用。

    完整工作流程
    a. 应用启动：Nest.js 初始化模块，创建 PrismaService 实例。
    b. 触发钩子：模块初始化完成后，自动调用 onModuleInit()。
    c. 建立连接：$connect() 向数据库发起认证并建立连接池。
    d. 服务就绪：其他服务通过依赖注入使用 PrismaService 执行查询。
 */

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name); // 初始化日志工具

  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'], // 开启日志查询
    }); // 调用父类构造函数
    this.logger.log('PrismaService 已初始化');
  }

  // 定义了一个异步方法 onModuleInit，该方法是 OnModuleInit 接口要求实现的方法。
  async onModuleInit() {
    // this.$connect() 是 PrismaClient 提供的一个方法，用于建立与数据库的连接。由于这是一个异步操作，所以使用了 await 关键字来等待连接建立完成。
    // await this.$connect();
    try {
      await this.$connect(); // 建立数据库连接
      this.logger.log('数据库连接成功');
    } catch (error) {
      this.logger.error('数据库连接失败', error); // 明确传递错误堆栈信息
      process.exit(1); // 连接失败时终止应用
    }
  }

  async onModuleDestroy() {
    await this.$disconnect(); // 清理连接池
  }

  // enableShutdownHooks 的异步方法，该方法的作用是为 Node.js 进程的 beforeExit 事件添加一个监听器，当进程即将退出时，该监听器会执行断开数据库连接的操作。
  async enableShutdownHooks() {
    await new Promise<void>((resolve) => {
      // 为 Node.js 进程的 beforeExit 事件添加一个监听器。beforeExit 事件在 Node.js 进程即将退出时触发，但在事件循环中没有更多的工作要处理时才会触发。
      process.on('beforeExit', () => {
        this.$disconnect()
          .then(() => {
            this.logger.log('数据库连接已断开');
            resolve();
          })
          .catch((error) => {
            this.logger.error('断开数据库连接时出错', error);
            resolve();
          });
      });
    });
  }
}

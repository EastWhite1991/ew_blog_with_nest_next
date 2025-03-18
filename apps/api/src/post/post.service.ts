import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DEFAULT_PAGE_SIZE } from 'src/constants';

@Injectable()
export class PostService {
  // PrismaService：这是一个自定义的服务类，用于与 Prisma 客户端进行交互，从而实现对数据库的操作。
  constructor(private prisma: PrismaService) {}

  async findAll({
    skip = 0,
    take = DEFAULT_PAGE_SIZE,
  }: {
    skip?: number;
    take?: number;
  }) {
    return this.prisma.post.findMany({
      skip,
      take,
    });
  }
}

import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';

const prisma = new PrismaClient();

// generateSlug：将输入的标题字符串转换为适合作为 URL 一部分的 slug 字符串，生成帖子的唯一标识，用于 SEO 优化或路由。
// [^\w-] 表示匹配除了单词字符（字母、数字、下划线）和连字符 - 之外的任何字符。
// + 表示匹配前面的字符一次或多次。
// g 表示全局匹配，即匹配所有符合条件的字符。
// 因此，这个正则表达式的作用是将字符串中所有的非单词字符（除了字母、数字、下划线和连字符）都删除掉。
function generateSlug(title: string): string {
  if (typeof title !== 'string') {
    throw new Error('Input must be a string');
  }

  return title
    .toLowerCase()
    .trim()
    .replace(/ /g, '-') // 替换字符串中所有的空格字符为连字符“-”。
    .replace(/[^\w-]+/g, ''); // Remove all non-word characters
}

// 主要功能是为数据库生成测试数据，也就是进行数据填充（seeding）操作。
async function main() {
  // 生成用户数据
  const defaultPassword = await hash('123');
  const users = Array.from({ length: 10 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    bio: faker.lorem.sentence(),
    avatar: faker.image.avatar(),
    password: defaultPassword,
  }));

  // 使用 Prisma 客户端的 createMany 方法批量创建用户。data 参数接受一个包含多个用户对象的数组。
  await prisma.user.createMany({
    data: users,
  });

  //   生成文章数据
  const posts = Array.from({ length: 400 }).map(() => ({
    title: faker.lorem.sentence(),
    slug: generateSlug(faker.lorem.sentence()),
    content: faker.lorem.paragraphs(3),
    thumbnail: faker.image.urlLoremFlickr({ height: 240, width: 320 }),
    authorId: faker.number.int({ min: 1, max: 10 }),
    published: true,
  }));

  //   Promise.all：用于并行处理多个异步操作，并等待所有操作完成。
  //   posts.map：对 posts 数组中的每个元素执行一个异步操作，即使用 Prisma 客户端的 create 方法创建一篇文章。
  //   对于每个文章，使用 createMany 方法创建多个评论。data 参数接受一个包含多个评论对象的数组。
  //   每个评论对象都包含一个 content 属性和一个 authorId 属性，分别表示评论内容和评论作者的 ID。
  //   每个评论的 authorId 属性都是通过 faker.number.int({ min: 1, max: 10 }) 方法生成的一个随机整数，范围在 1 到 10 之间。
  await Promise.all(
    posts.map(
      async (post) =>
        await prisma.post.create({
          data: {
            ...post,
            comments: {
              createMany: {
                data: Array.from({ length: 20 }).map(() => ({
                  content: faker.lorem.sentence(),
                  authorId: faker.number.int({ min: 1, max: 10 }),
                })),
              },
            },
          },
        }),
    ),
  );

  console.log('Seeding Completed!');
}

// main 函数是一个异步函数，使用 async 关键字声明。
// 在 main 函数中，我们使用 Prisma 客户端的 createMany 方法批量创建用户和文章。
// 为了方便测试，我们生成了 10 个用户和 400 篇文章，每篇文章包含 20 条评论。
// 为了生成随机数据，我们使用了 faker.js 库，它提供了一些用于生成随机数据的方法。
// 为了生成文章的 slug 字段，我们定义了一个 generateSlug 函数，用于将文章标题转换为 URL 友好的 slug 字符串。
// 最后，我们使用 Promise.all 方法并行处理多个异步操作，等待所有操作完成。
// 在 main 函数的最后，我们使用 console.log 方法输出一条消息，表示数据填充操作已经完成。
main()
  .then(async () => {
    await prisma.$disconnect();
    // process.exit(0)：使用 process.exit 方法退出 Node.js 进程，参数 0 表示正常退出。
    process.exit(0);
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    console.error(e);
    // process.exit(1)：使用 process.exit 方法退出 Node.js 进程，参数 1 表示异常退出。
    process.exit(1);
  });

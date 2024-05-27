import { Context } from '../context';

export async function feed(parent: unknown, args: unknown, context: Context) {
  return context.prisma.link.findMany();
}

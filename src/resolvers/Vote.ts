import { Context } from '../context';

export function link(
  parent: { id: number },
  args: undefined,
  context: Context
) {
  return context.prisma.vote
    .findUnique({
      where: { id: parent.id },
    })
    .link();
}

export function user(
  parent: { id: number },
  args: undefined,
  context: Context
) {
  return context.prisma.vote
    .findUnique({
      where: { id: parent.id },
    })
    .user();
}

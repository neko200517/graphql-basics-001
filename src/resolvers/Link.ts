import { Context } from '../context';

// Link.postedByリゾルバ
export function postedBy(
  parent: { id: number },
  args: undefined,
  context: Context
) {
  return context.prisma.link
    .findUnique({
      where: { id: parent.id },
    })
    .postedBy();
}

export function votes(
  parent: { id: number },
  args: undefined,
  context: Context
) {
  return context.prisma.link
    .findUnique({
      where: { id: parent.id },
    })
    .votes();
}

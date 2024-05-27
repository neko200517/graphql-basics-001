import { Context } from '../context';

// User.linksリゾルバ
export function links(
  parent: { id: number },
  args: undefined,
  context: Context
) {
  return context.prisma.user
    .findUnique({
      where: { id: parent.id },
    })
    .links();
}

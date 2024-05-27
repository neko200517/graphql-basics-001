import { Context } from '../context';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ユーザーの新規登録
export async function signup(
  parent: unknown,
  args: { email: string; password: string; name: string },
  context: Context
) {
  // パスワードの設定
  const password = await bcrypt.hash(args.password, 10);

  // ユーザーの新規作成
  const user = await context.prisma.user.create({
    data: {
      ...args,
      password,
    },
  });

  // トークンの生成
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  return { token, user };
}

// ユーザーログイン
export async function login(
  parent: unknown,
  args: { email: string; password: string },
  context: Context
) {
  const user = await context.prisma.user.findUnique({
    where: {
      email: args.email,
    },
  });
  if (!user) {
    throw new Error('ユーザーが存在しません');
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('パスワードの検証に失敗しました');
  }

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  return { token, user };
}

// ニュースを投稿する
export async function post(
  parent: unknown,
  args: { url: string; description: string },
  context: Context
) {
  const { userId } = context;

  const newLink = await context.prisma.link.create({
    data: {
      description: args.description,
      url: args.url,
      postedBy: { connect: { id: userId } },
    },
  });

  // 送信
  context.pubsub.publish('NEW_LINK', newLink);

  return newLink;
}

export async function vote(
  parent: unknown,
  args: { linkId: string | number },
  context: Context
) {
  const { userId } = context;

  // 既存の投票を検索する
  const vote = await context.prisma.vote.findUnique({
    where: {
      linkId_userId: {
        linkId: Number(args.linkId),
        userId: userId,
      },
    },
  });

  if (vote) {
    throw new Error(`すでにその投稿は投票されています: ${args.linkId}`);
  }

  // 投票する
  const newVote = await context.prisma.vote.create({
    data: {
      user: { connect: { id: userId } },
      link: { connect: { id: Number(args.linkId) } },
    },
  });

  // 送信する
  context.pubsub.publish('NEW_VOTE', newVote);

  return newVote;
}

import { IncomingMessage } from 'http';
import jwt from 'jsonwebtoken';

// トークンを複合する
function getTokenPayload(token: string) {
  return jwt.verify(token, process.env.APP_SECRET);
}

// ユーザーIDを取得
export function getUserId(req: IncomingMessage, authToken?: string) {
  if (req) {
    // Headerがある場合
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.replace('Bearer', '');
      if (!token) {
        throw new Error('トークンが存在しません');
      }

      const { userId } = <{ userId: number }>getTokenPayload(token);
      return userId;
    }
  } else if (authToken) {
    // authTokenがある場合
    const { userId } = <{ userId: number }>getTokenPayload(authToken);
    return userId;
  }

  throw new Error('認証権限がありません');
}

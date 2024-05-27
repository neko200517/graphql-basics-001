import { feed } from './resolvers/Query';
import { signup, login, post, vote } from './resolvers/Mutation';
import { postedBy } from './resolvers/Link';
import { links } from './resolvers/User';
import { newLink, newVote } from './resolvers/Subscription';
import { link, user } from './resolvers/Vote';

export const resolvers = {
  Query: { feed },
  Mutation: { signup, login, post, vote },
  Subscription: { newLink, newVote },
  Link: { postedBy },
  User: { links },
  Vote: { link, user },
};

import { Link, Vote } from '../types';
import { Context } from '../context';

function newLinkSubscribe(parent: unknown, args: unknown, context: Context) {
  return context.pubsub.asyncIterator('NEW_LINK');
}

export const newLink = {
  subscribe: newLinkSubscribe,
  resolve: (payload: Link) => payload,
};

function newVoteSubscribe(parent: unknown, args: unknown, context: Context) {
  return context.pubsub.asyncIterator('NEW_VOTE');
}

export const newVote = {
  subscribe: newVoteSubscribe,
  resolve: (payload: Vote) => payload,
};

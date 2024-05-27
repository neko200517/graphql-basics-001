export type Link = {
  id: number;
  description: string;
  url: string;
  postedBy: User;
};

export type User = {
  id: number;
  name: string;
  email: string;
  links: Link[];
};

export type Vote = {
  id: number;
  link: Link;
  user: User;
};

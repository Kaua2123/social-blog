import { PostProtocol } from '../interfaces/post-protocol';

export const addDotsOnLongTitle = (post: PostProtocol) => {
  const slicedTitle = post.title ? post.title.slice(0, 25) : '';

  if (slicedTitle.length < 25) return post.title;

  const splitedTitle = slicedTitle.split(' ');

  const lastWord = splitedTitle[splitedTitle.length - 1];

  const replaced = slicedTitle.replace(lastWord, '...');

  return replaced;
};

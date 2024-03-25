import { PostProtocol } from '../interfaces/post-protocol';

export const addDotsOnLongContent = (post: PostProtocol) => {
  const slicedContent = post.content ? post.content.slice(0, 27) : '';

  if (slicedContent.length < 25) return post.content;

  const splitedContent = slicedContent.split(' ');

  const lastWord = splitedContent[splitedContent.length - 1];

  const replaced = slicedContent.replace(lastWord, '...');

  return replaced;
};

import { PostProtocol } from '../interfaces/post-protocol';

export const filterPosts = (
  query: string,
  posts: PostProtocol[],
  setFilteredPosts: React.Dispatch<React.SetStateAction<PostProtocol[]>>,
) => {
  const filteredPosts = posts.filter((post) => {
    if (post.title.includes(query)) return post;
  });

  setFilteredPosts(filteredPosts);
};

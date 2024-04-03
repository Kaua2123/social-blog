import { PostProtocol } from '../interfaces/post-protocol';

export const filterPosts = (
  query: string,
  posts: PostProtocol[],
  setFilteredPosts: React.Dispatch<React.SetStateAction<PostProtocol[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setIsLoading(true);
  const filteredPosts = posts.filter((post) => {
    if (post.title.includes(query)) return post;
  });

  setTimeout(() => {
    setFilteredPosts(filteredPosts);
    setIsLoading(false);
  }, 500);
};

import toast from 'react-hot-toast';
import { PostProtocol } from '../interfaces/post-protocol';

export const filterPosts = (
  query: string,
  posts: PostProtocol[],
  setFilteredPosts: React.Dispatch<React.SetStateAction<PostProtocol[]>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setIsLoading(true);

  if (query.length === 0) {
    setIsLoading(false);
    return toast.error('Digite algo para buscar');
  }

  const filteredPosts = posts.filter((post) => {
    if (post.title.includes(query)) return post;
  });

  setTimeout(() => {
    setFilteredPosts(filteredPosts);
    setIsLoading(false);
  }, 500);
};

export type PostProtocol = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  image: string;
  image_url?: string;
  likes: number;
  tags: string;
  User: {
    name: string;
    username: string;
    image: string;
    image_url: string;
  };
};

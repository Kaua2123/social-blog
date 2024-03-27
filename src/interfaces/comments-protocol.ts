export type CommentsProtocol = {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  User: {
    name: string;
    username: string;
    image: string;
    image_url: string;
  };
};

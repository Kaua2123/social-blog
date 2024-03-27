import { CommentsProtocol } from './comments-protocol';
import { UserProtocol } from './user-protocol';

export type PostProtocol = {
  id: number;
  user_id: number;
  title: string;
  content: string;
  image: string;
  image_url?: string;
  likes: number;
  tags: string;
  created_at: Date;
  updated_at: Date;
  User: UserProtocol;
  Comments: CommentsProtocol[];
};

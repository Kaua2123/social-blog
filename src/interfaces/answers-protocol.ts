import { UserProtocol } from './user-protocol';

export interface AnswersProtocol {
  id: number;
  user_id: number;
  comment_id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  User: UserProtocol;
}

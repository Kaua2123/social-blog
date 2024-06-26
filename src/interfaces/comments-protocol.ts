import { AnswersProtocol } from './answers-protocol';
import { UserProtocol } from './user-protocol';

export type CommentsProtocol = {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  User: UserProtocol;
  Answers: AnswersProtocol[];
};

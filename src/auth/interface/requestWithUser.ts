import { User } from '../../user/schema/user.schema';

export interface RequestWithUser extends Request {
  user: User;
}

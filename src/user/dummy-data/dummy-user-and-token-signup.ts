import { ReturnedUserAndTokenSignupDto } from '../dto/returned-user-and-token-signup.dto';
import { returnedUserSignupDto } from './dummy-user-signup';

export const returnedUserAndTokenSignupDto: ReturnedUserAndTokenSignupDto = {
  status: 'success',
  token: 'e54544e5',
  user: returnedUserSignupDto,
};

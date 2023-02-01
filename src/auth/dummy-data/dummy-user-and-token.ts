import { ReturnedUserAndTokenDto } from '../dto/returned-user-and-token.dto';
import { returnedUserDto } from './dummy-user';

export const returnedUserAndTokenDto: ReturnedUserAndTokenDto = {
  status: 'success',
  token: 'e54544e5',
  user: returnedUserDto,
};

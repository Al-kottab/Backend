import { ReturnedUserDto } from './returned-user.dto';

export type ReturnedUserSignupDto = Omit<ReturnedUserDto, 'photo'>;

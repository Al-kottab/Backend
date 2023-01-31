import { AuthDto } from './auth.dto';

export type ForgetPasswordDto = Omit<AuthDto, 'password'>;

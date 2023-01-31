import { Injectable } from '@nestjs/common';
import { AuthSignupDto } from './dto/auth-signup.dto';
import { AuthDto } from './dto/auth.dto';
import { ReturnedUserAndTokenSignupDto } from './dto/returned-user-and-token-signup.dto';
import { ReturnedUserAndTokenDto } from './dto/returned-user-and-token.dto';
import { returnedUserAndTokenDto } from './dummy-data/dummy-user-and-token';
import { returnedUserAndTokenSignupDto } from './dummy-data/dummy-user-and-token-signup';

@Injectable()
export class AuthService {
  login(authDto: AuthDto): ReturnedUserAndTokenDto {
    return returnedUserAndTokenDto;
  }
  signup(authSignupDto: AuthSignupDto): ReturnedUserAndTokenSignupDto {
    return returnedUserAndTokenSignupDto;
  }
}

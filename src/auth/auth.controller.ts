import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiTags,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthSignupDto } from './dto/auth-signup.dto';
import { AuthDto } from './dto/auth.dto';
import { ReturnedUserAndTokenSignupDto } from './dto/returned-user-and-token-signup.dto';
import { ReturnedUserAndTokenDto } from './dto/returned-user-and-token.dto';

@ApiTags('Auth')
@Controller('accounts')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    description:
      'Logs the user in, sends JSON Web Token, and sends user information.',
  })
  @ApiOkResponse({
    description: 'User is logged in succesfully.',
    type: ReturnedUserAndTokenDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request.' })
  @Post('login')
  login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }

  @ApiOperation({
    description:
      'Signs the user up, sends JSON Web Token, and sends user information.',
  })
  @ApiCreatedResponse({
    description: 'User is signed up succesfully.',
    type: ReturnedUserAndTokenSignupDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request.' })
  @Post('signup')
  signup(@Body() authSignupDto: AuthSignupDto) {
    return this.authService.signup(authSignupDto);
  }
}

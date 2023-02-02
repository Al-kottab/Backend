import { Controller, Post, Body, Param, Patch } from '@nestjs/common';
import {
  ApiOperation,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiTags,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthSignupDto } from './dto/auth-signup.dto';
import { AuthDto } from './dto/auth.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { ResetForgottenPasswordDto } from './dto/reset-forgotten-password.dto';
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

  @ApiOperation({
    description:
      "Sends a form link to user's email (Frontend team shall implement this form) that has a token in the end of it, this token must be sent in the end of /api/v1/accounts/reset-forgotten-password/:reset_token api to reset the password with the new one, token is valid for 10 minutes only.",
  })
  @ApiOkResponse({
    description: "Link is sent to user's email succesfully.",
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'success',
        },
        message: {
          type: 'string',
          example: '.تم إرسال الرابط إلى بريدك الإلكتروني بنجاح',
        },
      },
    },
  })
  @ApiNotFoundResponse({ description: 'User is not found (wrong email).' })
  @Post('forget-password')
  forgetPassword(@Body() forgetPasswordDto: ForgetPasswordDto) {
    return this.authService.forgetPassword(forgetPasswordDto);
  }

  @ApiOperation({
    description:
      'Changes the user password if the token that was received in the end of the form link from /api/v1/accounts/forget-password api is correct and logs him in.',
  })
  @ApiOkResponse({
    description: 'Password is updated succesfully.',
    type: ReturnedUserAndTokenDto,
  })
  @ApiBadRequestResponse({ description: 'Token is invalid or expired.' })
  @Patch('reset-forgotten-password/:reset_token')
  resetforgottenPassword(
    @Param('reset_token') resetToken: string,
    @Body() resetForgottenPasswordDto: ResetForgottenPasswordDto,
  ) {
    return this.authService.resetForgottenPassword(
      resetToken,
      resetForgottenPasswordDto,
    );
  }

  @ApiOperation({
    description:
      'Changes the user password if the current token and old password are correct.',
  })
  @ApiOkResponse({
    description: 'Password is updated succesfully.',
    type: ReturnedUserAndTokenDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized Request.' })
  @ApiBadRequestResponse({ description: 'Password is incorrect.' })
  @ApiBearerAuth('token')
  @Patch('password')
  changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }
}

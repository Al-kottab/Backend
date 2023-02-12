import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthSignupDto } from './dto/auth-signup.dto';
import { AuthDto } from './dto/auth.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { ResetForgottenPasswordDto } from './dto/reset-forgotten-password.dto';
import { ReturnedUserAndTokenSignupDto } from '../user/dto/returned-user-and-token-signup.dto';
import { returnedUserAndTokenSignupDto } from '../user/dummy-data/dummy-user-and-token-signup';
import { ReturnedUserAndTokenDto } from '../user/dto/returned-user-and-token.dto';
import { returnedUserAndTokenDto } from '../user/dummy-data/dummy-user-and-token';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async login(authDto: AuthDto): Promise<ReturnedUserAndTokenDto> {
    // find the user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: authDto.email,
      },
    });
    // if user does not exist throw exception
    if (!user) throw new UnauthorizedException('Credentials incorrect');

    // compare password
    const pwMatches = await argon.verify(user.passwordHash, authDto.password);
    // if password incorrect throw exception
    if (!pwMatches) throw new UnauthorizedException('Credentials incorrect');
    let token;
    const teacher = this.prisma.teacher.findUnique({
      where: {
        id: user.id,
      },
    });
    if (teacher != null) {
      token = await this.signToken(user.id, user.email, 'teacher');
    } else {
      token = await this.signToken(user.id, user.email, 'student');
    }
    delete user.passwordHash;
    return {
      status: 'success',
      token: token.access_token,
      user,
    };
  }

  async signup(
    authSignupDto: AuthSignupDto,
  ): Promise<ReturnedUserAndTokenSignupDto> {
    // generate the password hash
    const hash = await argon.hash(authSignupDto.password);
    // save the new user in the db
    try {
      const user = await this.prisma.user.create({
        data: {
          email: authSignupDto.email,
          passwordHash: hash,
          name: authSignupDto.name,
          username: authSignupDto.username,
          phone: authSignupDto.phoneNumber,
        },
      });
      switch (authSignupDto.type) {
        case 'teacher':
          await this.prisma.teacher.create({
            data: {
              id: user.id,
            },
          });
          break;
        case 'student':
          await this.prisma.student.create({
            data: {
              id: user.id,
            },
          });
        default:
          break;
      }

      const token = await this.signToken(
        user.id,
        user.email,
        authSignupDto.type,
      );
      delete user.passwordHash;
      return {
        status: 'success',
        token: token.access_token,
        user,
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async signToken(
    userId: number,
    email: string,
    type: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
      type,
    };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '12h',
      secret: secret,
    });

    return {
      access_token: token,
    };
  }

  forgetPassword(forgetPasswordDto: ForgetPasswordDto): {
    status: string;
    message: string;
  } {
    return {
      status: 'success',
      message: '.تم إرسال الرابط إلى بريدك الإلكتروني بنجاح',
    };
  }

  resetForgottenPassword(
    resetToken: string,
    resetForgottenPasswordDto: ResetForgottenPasswordDto,
  ): ReturnedUserAndTokenDto {
    return returnedUserAndTokenDto;
  }

  changePassword(
    changePasswordDto: ChangePasswordDto,
  ): ReturnedUserAndTokenDto {
    return returnedUserAndTokenDto;
  }
}

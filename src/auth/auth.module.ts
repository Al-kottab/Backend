import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtTeacherStrategy } from './strategy/teacher.strategy';
import { UserService } from '../user/user.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtService, JwtTeacherStrategy, UserService],
  imports: [],
})
export class AuthModule { }

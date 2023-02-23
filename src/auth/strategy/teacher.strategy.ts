import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import { PrismaService } from '../../prisma/prisma.service';
import { TokenDataDto } from '../dto/token-data.dto';

@Injectable()
export class JwtTeacherStrategy extends PassportStrategy(Strategy, 'jwt-teacher') {
    constructor(config: ConfigService, private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        });
    }

    async validate(tokenDataDto: TokenDataDto): Promise<TokenDataDto> {
        await this.userService.validateIfTeacher(tokenDataDto.id, tokenDataDto.email);
        return tokenDataDto;
    }
}


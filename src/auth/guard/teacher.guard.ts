import { AuthGuard } from '@nestjs/passport';

export class JwtTeacherGuard extends AuthGuard('jwt-teacher') {
  // name of jwt strategy at jwt.strategy.ts
  constructor() {
    super();
  }
}


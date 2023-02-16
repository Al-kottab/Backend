import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('jwt') {
  // name of jwt strategy at jwt.strategy.ts
  constructor() {
    super();
  }
}

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    if (data) {
      switch (data) {
        case 'teacher':
          return request.user['type'] === 'teacher' ? request.user['id'] : null;
        case 'student':
          return request.user['type'] === 'student' ? request.user['id'] : null;
        default:
          break;
      }
    }
    return request.user['id'];
  },
);

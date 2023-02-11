import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    // data is optional, if it is not provided, the whole user will be returned
    const req: Express.Request = ctx.switchToHttp().getRequest();
    if (data) return req.user[data]; // if you want certain field in this decorator
    return req.user;
  },
);

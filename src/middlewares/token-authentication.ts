import { NextFunction, Request, Response } from 'express';
import { UnauthorizedException } from '../exceptions/unauthorized-exception';
import { UsersService } from '../domains/users/users.service';

async function tokenAuthentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    throw new UnauthorizedException('Auth token is missing in request header');
  }

  // token matches format <id>.<token>
  const usersService = new UsersService();
  const [id, userToken] = token.split('.');
  const user = await usersService.findBy({
    id: Number(id) ?? '',
    token: userToken,
  });

  if (!user) {
    throw new UnauthorizedException('Invalid auth token');
  }

  next();
}

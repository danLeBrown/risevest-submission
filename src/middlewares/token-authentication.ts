import { NextFunction, Request, Response } from 'express';
import { UsersService } from '../domains/users/users.service';
import { compareHash } from '../utils/auth';

export async function TokenAuthentication(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      message: 'Bearer token is missing in request header',
    });
  }

  // token matches format <id>.<token>
  const usersService = new UsersService();
  const [id, userToken] = token.split('.');
  const user = await usersService.findOneBy({
    id: Number(id) ?? '',
  });

  if (!user) {
    return res.status(401).json({
      message: 'Invalid auth token',
    });
  }

  const result = await compareHash(userToken, user.hash);

  if (!result) {
    return res.status(401).json({
      message: 'Invalid auth token',
    });
  }

  next();
}

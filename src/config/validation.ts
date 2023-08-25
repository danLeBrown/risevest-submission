import { ValidationError, validate } from 'class-validator';
import { NextFunction } from 'express';
import { OutgoingMessage } from 'http';

export function validator(DataTransferObject: any) {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<OutgoingMessage> {
    const errors: ValidationError[] = await validate(
      Object.assign(new DataTransferObject(), req.body),
    );
    const errorMessage = errors.map((val: ValidationError) => {
      return Object.values(val.constraints)[0];
    });

    if (errorMessage.length) {
      return res.json();
    }
    next();
  };
}

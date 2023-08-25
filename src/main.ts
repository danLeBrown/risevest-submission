import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
  json,
  Express,
  Request,
  Response,
  urlencoded,
} from 'express';
import dotenv from 'dotenv';
import { RegisterRoutes } from './routes/routes';
import { AppDataSource } from './config/typeorm.config';
import { ValidateError } from 'tsoa';

async function bootstrap() {
  dotenv.config();

  const app: Express = express();
  const port = process.env.APP_PORT ?? 4300;

  app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
  });

  app.use(
    urlencoded({
      extended: true,
    }),
  );
  app.use(json());

  RegisterRoutes(app);

  if (AppDataSource.isInitialized === false) {
    await AppDataSource.initialize();
  }

  app.use(function errorHandler(
    err: unknown,
    req: ExRequest,
    res: ExResponse,
    next: NextFunction,
  ): ExResponse | void {
    if (err instanceof ValidateError) {
      // console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
      return res.status(422).json({
        message: 'Validation Failed',
        details: err?.fields,
      });
    }
    if (err instanceof Error) {
      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }

    next();
  });

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}

void bootstrap();

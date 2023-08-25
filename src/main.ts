import express, { json, Express, urlencoded } from 'express';
import dotenv from 'dotenv';
import { RegisterRoutes } from './routes/routes';
import { AppDataSource } from './config/typeorm.config';
import { exceptionHandler } from './exceptions/handler';

async function bootstrap() {
  dotenv.config();

  const app: Express = express();
  const port = process.env.APP_PORT ?? 4300;

  // app.get('/', (req: Request, res: Response) => {
  //   res.send('Express + TypeScript Server');
  // });

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

  app.use(exceptionHandler);

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}

void bootstrap();

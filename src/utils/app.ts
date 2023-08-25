import express, { json, Express, urlencoded } from 'express';
import { RegisterRoutes } from '../routes/routes';
import { exceptionHandler, notFoundHandler } from '../exceptions/handler';
import { getDataSource } from './data-source-manager';

async function createApplication() {
  const app: Express = express();

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

  app.use(notFoundHandler);
  app.use(exceptionHandler);

  const DataSource = getDataSource();
  if (DataSource.isInitialized === false) {
    await DataSource.initialize();
  }

  return app;
}

export default createApplication;

import dotenv from 'dotenv';
import createApplication from './utils/app';

async function bootstrap() {
  dotenv.config();

  const port = process.env.PORT ?? 3000;
  const app = await createApplication();

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });

  return app;
}

void bootstrap();

export default bootstrap;

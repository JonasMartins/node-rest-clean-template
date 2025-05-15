import compression from 'compression';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import { ErrorMiddleware, NotFoundMiddleware } from '@/infra/middlewares/error.middleware';
import { AppRouter } from '@/infra/presentation/routes/app/app.router';
// import { config, buildBaseRoute } from '@/main/config';
import { config } from '@/main/config';

export class Server {
  private app: Application;
  private baseRoute: string;

  constructor() {
    this.app = express();
    // this.baseRoute = buildBaseRoute();
    this.baseRoute = '/';
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddleware(): void {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private setupErrorHandling(): void {
    this.app.use(NotFoundMiddleware.handle);
    this.app.use(ErrorMiddleware.handle);
  }

  private setupRoutes(): void {
    this.app.use(this.baseRoute, AppRouter.setup());
  }

  public start(): void {
    this.app.listen(config.PORT, () => {
      console.log(`http server running on port ${config.PORT}`);
    });
  }
}

export const Run = async (): Promise<void> => {
  try {
    const server = new Server();
    server.start();
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

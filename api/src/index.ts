import 'module-alias/register';
import 'reflect-metadata';
import cors from '@koa/cors';
import Router from '@koa/router';
import { AuthMiddleware } from './application/middlewares/auth-middleware';
import getRouter from './application/routers/bu-router';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { createConnection } from 'typeorm';

import typeOrmConfig from './infrastructure/config/typeorm.config';
import { RabitMqService } from './infrastructure/services/message-broker/rabitmq.service';
import getCmsRouter from './application/routers/cms-router';

const app = new Koa();
const router = new Router({
  prefix: '/api/',
});

createConnection(typeOrmConfig)
  .then(async (connDb) => {
    app.use(
      cors({
        allowHeaders: ['Content-Type'],
        credentials: true,
        origin: '*',
      }),
    );

    // app.use(AuthMiddleware.verifyAuth);

    app.use(bodyParser());
    app.use(router.routes()).use(router.allowedMethods());
    const buRouters  = getRouter(connDb.manager);
    const cmsRouters = getCmsRouter(connDb.manager);

    const allRouters = [...buRouters, ...cmsRouters]
    allRouters.map(({ name: name, path: path, ctrl: ctrl, method: method }) => {
      switch (method) {
        case 'get':
          router.get(name, path, ctrl);
          break;
        case 'post':
          router.post(name, path, ctrl);
          break;
        case 'put':
          router.put(name, path, ctrl);
          break;
        case 'delete':
          router.delete(name, path, ctrl);
          break;
      }
    });

    app.listen(process.env.API_PORT, () => {
      console.log('Server dev test started on port ' + process.env.API_PORT);
      // try {
      //   const workerService = new RabitMqService(connDb.manager);
      //   workerService.consumeQueue();
      // } catch (error) {
      //   console.log('RabitMQ connection error:', error);
      // }
    });
  })
  .catch((error: any) => console.log('TypeORM connection error:', error));
